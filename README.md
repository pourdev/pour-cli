# pour-cli

Audit any URL against WCAG 2.2 from your terminal, powered by the
[pour engine](https://github.com/pourdev/pour-engine): a clean-room WCAG
engine written from the W3C specifications, the same engine behind
[pour.dev](https://pour.dev).

```sh
npm install -g pour-cli
pour example.com
```

The page is loaded in headless Chrome, the engine runs against the live DOM,
and the findings land on stdout: rule, severity, WCAG success criterion, the
exact failing elements as CSS paths, and what to fix. Findings the engine
cannot judge conclusively are reported as "needs review" rather than guessed
at, and the exit code makes it a CI gate out of the box.

## Requirements

Node 18+, and an installed Chrome (or Chromium, or Edge). The CLI drives the
browser you already have via puppeteer-core, so installing it never
downloads one. Point `--browser` (or `PUPPETEER_EXECUTABLE_PATH`) at a
binary to use something else.

## Usage

```
pour <url> [options]
pour check <files, folders or globs> [options]
pour report <url | list.csv> [options]
pour mcp

  --json               print the full engine results as JSON
  --format <what>      terminal (default) | json | markdown (a pull-request
                       comment); pour check adds github (annotations on the
                       changed lines of a pull request) and sarif (GitHub
                       code scanning, and any SARIF viewer)
  --viewport WxH       viewport (default 1440x900); a bare width implies x900
  --scroll             scroll through the page before auditing (lazy content)
  --wait <ms>          extra settle delay after load (default 0)
  --timeout <ms>       navigation timeout (default 30000)
  --bp                 include best-practice rules alongside WCAG A+AA
  --exclude <sel>      CSS selector excluded from every rule
  --fail-on <what>     violations (default) | incomplete | none
  --max-nodes <n>      element details shown per rule (default 5, 0 = all)
  --level <detail>     quiet (the totals line only) | rules (one line per
                       rule, no elements) | max (default: everything)
  --filter <name>      screenshot the page through a vision/sensory simulation
                       instead of auditing (--filter list shows them all)
  --shot [file]        screenshot mode: save a PNG (default name derived from
                       the URL and filter), no audit runs
  --full               capture the full page height, not just the viewport
  --insecure           ignore TLS certificate errors
  --browser <path>     Chrome/Chromium binary to drive
  --headful            run the browser with a visible window

pour check <paths>     the editor's static lane from the terminal, no
                       browser (see below)
pour report <target>   every page of a site, with a progress screen and a
                       standalone HTML report (see below)
pour mcp               serve pour's browser tools to an AI agent (see below)
```

Exit codes: 0 clean, 1 findings (per `--fail-on`), 2 error.

A scheme-less URL is tried over https first and falls back to http when the
TLS handshake fails, the same way a browser address bar behaves.

## Vision simulations

`--filter` renders the page as someone with a particular vision or sensory
condition experiences it and saves the result as a PNG:

```sh
pour example.com --filter deuteranopia
pour example.com --filter glaucoma --shot tunnel.png
pour --filter list
```

Color-vision filters use the Brettel/Vienot/Mollon and Machado matrices (via
[DaltonLens](https://daltonlens.org/cvd-simulation-svg-filters/)), the same
simulations the pour extension ships. Filters and audits are exclusive modes:
some simulations restyle the page, so auditing through one would audit the
simulation rather than the site.

## The numbers depend on the page state

Responsive pages serve different content per breakpoint, and the engine
measures what is actually rendered, so the viewport is part of the result:
the report header echoes it, and comparing two runs only makes sense at the
same width. `--scroll` walks the page first so lazy-loaded content is in
the DOM; that changes the numbers too, by design.

## Checking files

`pour check` reads HTML, JSX, TSX, Vue, Svelte, Angular, Liquid and Nunjucks
files and runs the engine's markup rules over them with no browser, the same
lane the pour extension for VS Code runs as you type. Every finding comes
with its file, line and column.

```sh
pour check src/                      # every file the lane can read, under src
pour check "src/**/*.html" --level rules
pour check src --format sarif > pour.sarif
```

Values that come from code (`alt={name}`), script-built markup and anything
a template tag leaves unknowable are left unjudged and counted rather than
guessed. Colour contrast, target size, focus and motion need the page in a
browser, so those stay with `pour <url>`. `--bp`, `--fail-on`, `--level`,
`--max-nodes` and `--format` apply; `--no-css` skips reading the local
stylesheets a page links.

## Reports over many pages

`pour report` crawls a site breadth first from the address given (or audits
the home page of every domain in a list file), with a live progress screen
in the browser and one standalone HTML report at the end. Ctrl+C stops
cleanly; the same command resumes.

```sh
pour report yoursite.com --max 200 --report reports/yoursite.html
```

`--max <n>` caps the pages, `--workers <n>` the parallel pages (4 for a
site, 8 for a list), `--pause <ms>` the gap between pages per worker;
`--depth <n>`, `--same-host`, `--viewport WxH`, `--load <ms>` and
`--timeout <ms>` shape the crawl. `--report <file.html>` says where the
finished report goes; `--out <dir>` where the run itself lives (default
`pour-reports` in the working directory). `--no-open`, `--port <n>`,
`--fresh`, `--recheck` and `--render` behave as their names say.

## CI

```yaml
- run: npx pour-cli https://staging.example.com --fail-on violations --level quiet
```

`--level quiet` keeps the log to the one totals line; the exit code still
carries the verdict. Drop it (or use `--level rules`) when you want the
findings in the CI log too.

Findings can land in the pull request itself. Annotations on the changed
lines work on any repository:

```yaml
- run: npx pour-cli check src --format github
```

SARIF goes to GitHub code scanning, which tracks each alert across commits
and closes it when the finding goes:

```yaml
- run: npx pour-cli check src --format sarif > pour.sarif
- uses: github/codeql-action/upload-sarif@v3
  with: { sarif_file: pour.sarif }
```

And `--format markdown`, on `pour <url>` or `pour check`, writes a comment
for `gh pr comment --body-file`.

## AI agents

`pour mcp` serves the same audit, the sequential focus order and the
simulation screenshots to an AI agent as tools, over the Model Context
Protocol on stdio. Any MCP client can use it; the command is `pour` with
the argument `mcp`:

```sh
claude mcp add pour -- pour mcp
```

```json
{ "mcpServers": { "pour": { "command": "pour", "args": ["mcp"] } } }
```

In VS Code the pour extension registers the server by itself once pour-cli
is installed. The tools:

- `pour_audit`: audit a URL. Totals, then each failing rule with its
  severity, success criteria and up to five elements with the fix (`detail`
  and `maxNodes` change how much comes back), then the rules the engine
  would not judge without a human.
- `pour_focus_order`: the keyboard focus order as Tab visits it, each stop
  with its accessible name and CSS path, positive tabindex flagged, and the
  native controls a tabindex of -1 has taken out of reach.
- `pour_screenshot`: a PNG of the page, plain or through any of the
  vision, sensory, motor and structure simulations.

Every tool takes a `viewport`, a `scroll` switch and a settle delay, because
the numbers depend on the page state.

## License

MIT
