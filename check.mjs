// `pour check <files>`: the editor's static lane from the terminal. Reads
// HTML, JSX, Vue, Svelte, Angular, Liquid and Nunjucks files, runs the
// engine's markup rules over each with jsdom, and reports every finding
// with its file, line and column, which is what a code host can put on the
// changed lines of a pull request. No browser, so it runs anywhere.
//
// Values that come from code (alt={name}), script-built DOM and anything a
// template tag leaves unknowable are left unjudged and counted, never
// guessed: the same honesty the editor keeps.
import { existsSync, globSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { toSc } from './lib.mjs';
import { makePaint, markdownReport, githubAnnotations, sarifReport, tally, byPlace } from './report.mjs';

const LANGUAGE_BY_EXT = {
  '.html': 'html', '.htm': 'html', '.jsx': 'javascriptreact', '.tsx': 'typescriptreact',
  '.vue': 'vue', '.svelte': 'svelte', '.liquid': 'liquid', '.njk': 'nunjucks', '.nunjucks': 'nunjucks',
};
export const CHECKED_EXTENSIONS = Object.keys(LANGUAGE_BY_EXT);
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

const skipDir = (name) => name === 'node_modules' || name.startsWith('.');
function walk(dir, out) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) { if (!skipDir(entry.name)) walk(path.join(dir, entry.name), out); continue; }
    if (LANGUAGE_BY_EXT[path.extname(entry.name).toLowerCase()]) out.add(path.join(dir, entry.name));
  }
}

/** Files, directories and globs, resolved to the files the lane can read. */
export function collectFiles(inputs) {
  const files = new Set();
  for (const input of inputs) {
    const matches = /[*?[{]/.test(input) ? globSync(input, { exclude: (p) => skipDir(path.basename(p)) }) : [input];
    if (!matches.length) throw new Error(`nothing matches ${input}`);
    for (const match of matches) {
      if (!existsSync(match)) throw new Error(`no file at ${match}`);
      if (statSync(match).isDirectory()) walk(match, files);
      else files.add(match);
    }
  }
  return [...files].filter((f) => LANGUAGE_BY_EXT[path.extname(f).toLowerCase()]).sort();
}

/** Offsets to lines and columns, one-based, from the file's own newlines. */
function positions(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i += 1) if (text.charCodeAt(i) === 10) starts.push(i + 1);
  return (offset) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= offset) lo = mid; else hi = mid - 1;
    }
    return { line: lo + 1, col: offset - starts[lo] + 1 };
  };
}

/** The lane: one prebuilt bundle beside the command in the published
 *  package, the editor's sources in the monorepo. */
async function loadLane(scriptDir) {
  const bundled = path.join(scriptDir, 'check-lane.mjs');
  if (existsSync(bundled)) {
    const { auditSource, WCAG_TAGS, laneFor, rules } = await import(pathToFileURL(bundled).href);
    return { auditSource, WCAG_TAGS, laneFor, rulesMeta: new Map(rules.map((r) => [r.id, r])) };
  }
  const src = (...parts) => pathToFileURL(path.join(scriptDir, '..', '..', 'src', ...parts)).href;
  if (!existsSync(path.join(scriptDir, '..', '..', 'src', 'vscode', 'audit.js'))) {
    throw new Error('pour check needs the static lane, which this build does not carry');
  }
  const [{ auditSource, WCAG_TAGS }, { laneFor }, { default: rules }] = await Promise.all([
    import(src('vscode', 'audit.js')),
    import(src('vscode', 'lanes.js')),
    import(src('engine', 'rules', 'index.js')),
  ]);
  return { auditSource, WCAG_TAGS, laneFor, rulesMeta: new Map(rules.map((r) => [r.id, r])) };
}

/**
 * The static lane over a list of files: the shared middle of `pour check`
 * and the MCP server's file audits. Every finding carries the file, the
 * line and the column, which is what the browser lane cannot give, since a
 * parsed DOM no longer knows where in the source it came from.
 */
export async function checkFiles({ scriptDir, files, bestPractices = false, loadStylesheets = true }) {
  const { auditSource, WCAG_TAGS, laneFor, rulesMeta } = await loadLane(scriptDir);
  const tags = bestPractices ? [...WCAG_TAGS, 'best-practice'] : WCAG_TAGS;
  const findings = [];
  const perFile = [];
  let abstained = 0;
  const started = Date.now();
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    const lane = laneFor(LANGUAGE_BY_EXT[path.extname(file).toLowerCase()], file, text);
    const rel = path.relative(process.cwd(), file).split(path.sep).join('/');
    const result = await auditSource(text, { lane, url: pathToFileURL(path.resolve(file)).href, tags, loadStylesheets });
    const at = positions(text);
    const own = result.findings.map((f) => {
      const start = at(f.start);
      const end = at(Math.max(f.start, f.end - 1));
      const meta = rulesMeta.get(f.rule);
      return {
        kind: f.status === 'fail' ? 'violation' : 'review',
        rule: f.rule,
        name: f.name,
        impact: f.status === 'fail' ? f.impact : 'review',
        help: f.help,
        helpUrl: f.helpUrl,
        sc: [...new Set((meta?.tags ?? []).map(toSc).filter(Boolean))],
        message: f.message,
        fix: f.fix,
        file: rel,
        line: start.line,
        col: start.col,
        endLine: end.line,
        endCol: end.col + 1,
        target: f.target,
        html: String(f.html ?? '').replace(/\s+/g, ' ').trim(),
      };
    }).sort(byPlace);
    findings.push(...own);
    abstained += result.abstained ?? 0;
    perFile.push({ file: rel, lane, findings: own, abstained: result.abstained ?? 0, rules: result.rules.map((r) => r.id) });
  }
  return { files: perFile, findings, abstained, durationMs: Date.now() - started, rulesMeta };
}

export async function runCheck({ scriptDir, inputs, flags, version, out = console.log }) {
  const format = String(flags.get('format') ?? (flags.has('json') ? 'json' : 'terminal'));
  if (!['terminal', 'json', 'markdown', 'github', 'sarif'].includes(format)) throw new Error(`--format expects terminal | json | markdown | github | sarif, got "${format}"`);
  const failOn = String(flags.get('fail-on') ?? 'violations');
  if (!['violations', 'incomplete', 'none'].includes(failOn)) throw new Error(`--fail-on expects violations | incomplete | none, got "${failOn}"`);
  const level = String(flags.get('level') ?? 'max');
  const maxNodes = Number(flags.get('max-nodes') ?? 5);
  const files = collectFiles(inputs);
  if (!files.length) throw new Error(`no files to check (pour check reads ${CHECKED_EXTENSIONS.join(', ')})`);

  const scopeLabel = flags.has('bp') ? 'WCAG 2.2 A+AA + best practices' : 'WCAG 2.2 A+AA';
  const { files: perFile, findings, abstained, durationMs, rulesMeta } = await checkFiles({
    scriptDir, files, bestPractices: flags.has('bp'), loadStylesheets: !flags.has('no-css'),
  });
  const counts = tally(findings);
  const rulesRan = new Set(perFile.flatMap((p) => p.rules));

  if (format === 'json') {
    out(JSON.stringify({ tool: { name: 'pour', version }, files: perFile, findings, abstained, durationMs }, null, 2));
  } else if (format === 'sarif') {
    out(JSON.stringify(sarifReport(findings, { version, rulesMeta }), null, 2));
  } else if (format === 'github') {
    for (const line of githubAnnotations(findings)) out(line);
  } else if (format === 'markdown') {
    out(markdownReport(findings, {
      title: files.length === 1 ? files[0] : `${plural(files.length, 'file')} checked`,
      meta: [`engine ${version}`, scopeLabel],
      maxNodes,
      abstained,
    }));
  } else {
    const { bold, dim, color, paintImpact, reviewMark } = makePaint(process.stdout.isTTY);
    if (level !== 'quiet') {
      out(`\n${bold('pour check')} ${dim('·')} ${plural(files.length, 'file')} ${dim(`· ${scopeLabel} · ${(durationMs / 1000).toFixed(1)}s`)}`);
      for (const entry of perFile) {
        if (!entry.findings.length && level !== 'max') continue;
        out(`\n${bold(entry.file)} ${dim(`· ${entry.lane}${entry.abstained ? ` · ${entry.abstained} not judged` : ''}`)}`);
        if (!entry.findings.length) { out(`  ${color(32, '✓')} ${dim('nothing found')}`); continue; }
        const posWidth = Math.max(...entry.findings.map((f) => `${f.line}:${f.col}`.length));
        const ruleWidth = Math.max(...entry.findings.map((f) => f.rule.length));
        for (const f of entry.findings) {
          const mark = f.kind === 'review' ? reviewMark('◐') : paintImpact(f.impact, '●');
          const label = f.kind === 'review' ? 'review' : f.impact;
          out(`  ${dim(`${f.line}:${f.col}`.padEnd(posWidth))}  ${mark} ${paintImpact(f.impact, label.padEnd(8))}  ${bold(f.rule.padEnd(ruleWidth))}  ${f.message}`);
          if (level === 'max' && f.fix) out(`  ${' '.repeat(posWidth)}  ${dim(`  fix: ${f.fix}`)}`);
        }
      }
    }
    const summary = ['critical', 'serious', 'moderate', 'minor'].filter((k) => counts[k]).map((k) => paintImpact(k, `${counts[k]} ${k}`)).join(dim(' · '));
    const totals = `${summary || color(32, 'clean')}${counts.review ? dim(` · ${counts.review} to review`) : ''}${abstained ? dim(` · ${abstained} not judged`) : ''} ${dim(`· ${plural(files.length, 'file')}, ${plural(rulesRan.size, 'rule')}`)}`;
    out(level === 'quiet' ? totals : `\n${totals}\n`);
  }

  const violations = findings.filter((f) => f.kind === 'violation').length;
  const reviews = findings.length - violations;
  return (failOn === 'violations' && violations > 0) || (failOn === 'incomplete' && (violations > 0 || reviews > 0)) ? 1 : 0;
}
