// Findings, in the shapes the code host reads. One normalised finding
// record feeds every renderer: the terminal, a Markdown comment for a pull
// request, GitHub workflow annotations on the changed lines, SARIF for
// code scanning, and JSON. A finding from the file lane carries a file and
// a span; one from the browser lane carries a URL and a selector; each
// renderer says what it can with what it has.
import { toSc } from './lib.mjs';

// The terminal palette the command already uses: heat on the top two
// severities, neutrals below, review in blue (--sev-*-vivid in
// src/ui/styles/tokens.css). Truecolor terminals get the exact values.
export function makePaint(enabled) {
  const color = (code, text) => (enabled ? `\u001b[${code}m${text}\u001b[0m` : text);
  const truecolor = /truecolor|24bit/i.test(process.env.COLORTERM ?? '');
  const rgb = (r, g, b, fallback) => (truecolor ? `38;2;${r};${g};${b}` : fallback);
  const IMPACT_PAINT = {
    critical: (t) => color(`1;${rgb(255, 82, 51, 91)}`, t),
    serious: (t) => color(rgb(245, 197, 24, 33), t),
    moderate: (t) => t,
    minor: (t) => color(rgb(138, 143, 152, 90), t),
  };
  const dim = (t) => color(2, t);
  return {
    color,
    bold: (t) => color(1, t),
    dim,
    paintImpact: (id, text = id) => (IMPACT_PAINT[id] ?? dim)(text),
    reviewMark: (t) => color(rgb(96, 165, 250, 94), t),
  };
}

const IMPACT_RANK = { critical: 0, serious: 1, moderate: 2, minor: 3, review: 4 };
export const byPlace = (a, b) => (a.file ?? '').localeCompare(b.file ?? '') || (a.line ?? 0) - (b.line ?? 0) || (a.col ?? 0) - (b.col ?? 0);
export const bySeverity = (a, b) => (IMPACT_RANK[a.impact] ?? 9) - (IMPACT_RANK[b.impact] ?? 9) || a.rule.localeCompare(b.rule) || byPlace(a, b);

/** The browser lane's results as finding records: URL and selector, no file. */
export function findingsFromResults(results, url) {
  const list = [];
  const add = (rules, kind) => {
    for (const rule of rules) {
      for (const node of rule.nodes) {
        list.push({
          kind,
          rule: rule.id,
          name: rule.name ?? rule.id,
          impact: kind === 'violation' ? rule.impact : 'review',
          help: rule.help,
          helpUrl: rule.helpUrl,
          sc: [...new Set((rule.tags ?? []).map(toSc).filter(Boolean))],
          message: String(node.failureSummary ?? rule.help).split('\n')[0],
          fix: null,
          url,
          target: node.target.join(' >>> '),
          html: String(node.html ?? '').replace(/\s+/g, ' ').trim(),
        });
      }
    }
  };
  add(results.violations ?? [], 'violation');
  add(results.incomplete ?? [], 'review');
  return list;
}

export function tally(findings) {
  const counts = { critical: 0, serious: 0, moderate: 0, minor: 0, review: 0 };
  for (const f of findings) counts[f.impact] = (counts[f.impact] ?? 0) + 1;
  return counts;
}

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const where = (f) => (f.file ? `${f.file}:${f.line}:${f.col}` : f.target);

// ---------------------------------------------------------------- Markdown
/** A pull-request comment: totals, a table per rule, and the elements
 *  under a disclosure so a long report stays scannable. */
export function markdownReport(findings, { title, meta = [], maxNodes = 5, abstained = 0 } = {}) {
  const counts = tally(findings);
  const totals = ['critical', 'serious', 'moderate', 'minor'].filter((k) => counts[k]).map((k) => `**${counts[k]} ${k}**`).join(' · ')
    || '**clean**';
  const extra = (counts.review ? ` · ${counts.review} to review` : '') + (abstained ? ` · ${abstained} not judged` : '');
  const lines = [`### pour · ${title}`, '', [...meta, totals + extra].join(' · '), ''];
  if (!findings.length) return `${lines.join('\n')}No violations found.\n`;
  const groups = new Map();
  for (const f of [...findings].sort(bySeverity)) groups.set(f.rule, [...(groups.get(f.rule) ?? []), f]);
  lines.push('| Severity | Rule | Elements | WCAG |', '|---|---|---|---|');
  for (const group of groups.values()) {
    const head = group[0];
    lines.push(`| ${head.impact} | [${head.name}](${head.helpUrl}) \`${head.rule}\` | ${group.length} | ${head.sc.join(', ')} |`);
  }
  lines.push('');
  for (const group of groups.values()) {
    const head = group[0];
    lines.push(`<details><summary><code>${head.rule}</code> · ${plural(group.length, 'element')}</summary>`, '', head.help, '');
    for (const f of group.slice(0, maxNodes)) {
      lines.push(`- \`${where(f)}\`${f.html ? ` \`${f.html.replace(/`/g, "'").slice(0, 120)}\`` : ''}`);
      if (f.message && f.message !== head.help) lines.push(`  ${f.message}`);
      if (f.fix) lines.push(`  Fix: ${f.fix}`);
    }
    if (group.length > maxNodes) lines.push(`- … ${group.length - maxNodes} more`);
    lines.push('', '</details>', '');
  }
  return `${lines.join('\n')}\n`;
}

// ------------------------------------------------------ GitHub annotations
// Workflow commands: printed to stdout inside a job, each becomes an
// annotation on that line of the pull request's changed files. GitHub keeps
// ten per level per step, so this suits a diff, not a whole site; SARIF
// carries the rest.
const escapeData = (s) => String(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
const escapeProp = (s) => escapeData(s).replace(/:/g, '%3A').replace(/,/g, '%2C');
const annotationLevel = (f) => (f.kind === 'review' ? 'notice' : ['critical', 'serious'].includes(f.impact) ? 'error' : 'warning');

export function githubAnnotations(findings) {
  return [...findings].sort(byPlace).map((f) => {
    const props = { file: f.file, line: f.line, col: f.col, endLine: f.endLine ?? f.line, endColumn: f.endCol ?? f.col, title: `pour · ${f.rule}` };
    const text = `${f.message}${f.fix ? ` Fix: ${f.fix}` : ''}`;
    const propText = Object.entries(props).filter(([, v]) => v != null).map(([k, v]) => `${k}=${escapeProp(v)}`).join(',');
    return `::${annotationLevel(f)} ${propText}::${escapeData(text)}`;
  });
}

// -------------------------------------------------------------------- SARIF
// Static Analysis Results Interchange Format 2.1.0, the file GitHub code
// scanning ingests: alerts on the changed lines of a pull request, tracked
// across commits by fingerprint, closed when the finding goes.
const sarifLevel = (f) => (f.kind === 'review' ? 'note' : ['critical', 'serious'].includes(f.impact) ? 'error' : 'warning');
function hash(text) {
  let h = 5381;
  for (let i = 0; i < text.length; i += 1) h = ((h * 33) ^ text.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(8, '0');
}

export function sarifReport(findings, { version = 'dev', rulesMeta = new Map() } = {}) {
  const ruleIds = [...new Set(findings.map((f) => f.rule))].sort();
  const rules = ruleIds.map((id) => {
    const meta = rulesMeta.get(id) ?? findings.find((f) => f.rule === id);
    const sc = (meta.tags ?? []).map(toSc).filter(Boolean);
    return {
      id,
      name: meta.name ?? id,
      shortDescription: { text: meta.help ?? id },
      fullDescription: { text: meta.help ?? id },
      helpUri: meta.helpUrl,
      help: { text: `${meta.help ?? id}\n${meta.helpUrl ?? ''}`, markdown: `${meta.help ?? id}\n\n[Understanding](${meta.helpUrl ?? ''})` },
      defaultConfiguration: { level: ['critical', 'serious'].includes(meta.impact) ? 'error' : 'warning' },
      properties: {
        tags: ['accessibility', ...sc.map((s) => `WCAG ${s}`), ...(meta.tags ?? []).filter((t) => /^wcag2|best-practice/.test(t))],
        impact: meta.impact,
      },
    };
  });
  const ruleIndex = new Map(ruleIds.map((id, i) => [id, i]));
  const results = [...findings].sort(byPlace).map((f) => ({
    ruleId: f.rule,
    ruleIndex: ruleIndex.get(f.rule),
    level: sarifLevel(f),
    message: { text: `${f.message}${f.fix ? `\n\nFix: ${f.fix}` : ''}` },
    locations: [{
      physicalLocation: f.file
        ? {
          artifactLocation: { uri: f.file, uriBaseId: '%SRCROOT%' },
          region: {
            startLine: f.line, startColumn: f.col, endLine: f.endLine ?? f.line, endColumn: f.endCol ?? f.col,
            ...(f.html ? { snippet: { text: f.html } } : {}),
          },
        }
        : { artifactLocation: { uri: f.url }, ...(f.html ? { region: { snippet: { text: f.html } } } : {}) },
      ...(f.target ? { logicalLocations: [{ name: f.target, kind: 'element' }] } : {}),
    }],
    partialFingerprints: { 'pour/finding/v1': hash(`${f.rule}|${f.file ?? f.url}|${f.html}`) },
    properties: { impact: f.impact, status: f.kind, wcag: f.sc },
  }));
  return {
    $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
    version: '2.1.0',
    runs: [{
      tool: { driver: { name: 'pour', version, informationUri: 'https://pour.dev/', rules } },
      results,
      columnKind: 'utf16CodeUnits',
    }],
  };
}
