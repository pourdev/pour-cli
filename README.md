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
pour <url | file.html> [options]        one page
pour report <url | list.csv> [options]  a site, or a list of domains (see below)
pour check <files, folders or globs>    files on disk, no browser (see below)
pour mcp                                browser tools for an AI agent (see below)

One page
  --viewport WxH       viewport (default 1440x900); a bare width implies x900
  --scroll             scroll through the page before auditing (lazy content)
  --wait <ms>          extra settle delay after load (default 0)
  --timeout <ms>       navigation timeout (default 30000)
  --exclude <sel>      CSS selector excluded from every rule
  --bp                 include best-practice rules alongside WCAG A+AA
  --root <dir>         with a local .html file: the folder served as the site
                       root, for assets addressed from there (/css/site.css);
                       default the file's own folder

Output
  --format <what>      terminal (default) | json | markdown (a pull-request
                       comment); pour check adds github (annotations on the
                       changed lines) and sarif (GitHub code scanning)
  --level <detail>     quiet (the totals line) | rules (one line per rule) |
                       max (default: everything)
  --max-nodes <n>      element details shown per rule (default 5, 0 = all)
  --json               the full engine results as JSON
  --fail-on <what>     violations (default) | incomplete | none

Screenshots
  --filter <name>      screenshot the page through a vision/sensory simulation
                       instead of auditing (--filter list shows them all)
  --shot [file]        save a PNG (default name from the URL and filter);
                       no audit runs
  --full               the full page height, not just the viewport

Signed-in sites (pour and pour report)
  --login              a browser window opens at the address; sign in there,
                       press Enter here, and the run continues signed in.
                       The session lives in memory for this run only:
                       nothing is written to disk
  --basic user:pass    HTTP authentication, for staging sites behind it
  --header "N: v"      a request header on every request (repeatable)
  --cookie name=value  a cookie for the address audited (repeatable)

Browser
  --browser <path>     Chrome/Chromium binary to drive
  --headful            run the browser with a visible window
  --insecure           ignore TLS certificate errors
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

## A page on disk

A target that names an `.html` file is audited as the page it is, in the
browser, with every rule that needs layout and paint:

```sh
pour index.html
pour build/about.html --root build   # assets addressed from the site root
```

The file is served from a loopback port for the length of the audit, so its
relative and root-relative assets load the way they will in production.
Opening it as a `file://` URL instead would leave a stylesheet at
`/css/site.css` unfetched, and the audit would report an unstyled page as if
it were the real one, usually as a clean result. `--root` says which folder
is the site root when the page addresses its assets from there rather than
from its own folder.

`file://` URLs still work if you type one, and carry that caveat with them.

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
pour report https://yoursite.com/help        # /help and the pages under it, nothing above
```

An address with a path keeps the crawl under that path; `--whole-site`
follows links above it too.

```
  --max <n>            pages (default 100)
  --depth <n>          links deep from the start
  --same-host          this host only, not its subdomains
  --whole-site         follow links above the path given too
  --workers <n>        parallel pages (4 for a site, 8 for a list)
  --pause <ms>         gap between pages per worker
  --load <ms>          time to let a page load (default 10000)
  --timeout <ms>       for the whole page (default 20000)
  --viewport WxH       as above
  --report <file.html> where the finished report goes
  --out <dir>          where the run itself lives (default pour-reports)
  --port <n>           the progress screen's port
  --no-open            do not open the screen, nor the finished report
  --fresh              start over instead of resuming
  --recheck            retry the pages the site refused last time
  --render             write the report from what is on disk, no crawling
```

`--login`, `--basic`, `--header`, `--cookie` and `--browser` apply as above.

## Signed-in sites

Pages behind a login are audited with the session you sign in with:

```sh
pour https://app.example.com/dashboard --login   # a browser opens; sign in, press Enter
pour report https://app.example.com/ --login     # the same, then the crawl runs signed in
```

The window is the Chrome you have installed, opened as an ordinary browser,
so sign-in providers that refuse automated browsers (Google's "This browser
or app may not be secure") accept it; the audit itself keeps using the
testing build. The session is read from that window into memory and used
for this run only: the site's own cookies and storage, not the sign-in
provider's. Nothing is written to disk, so there is no session file to
leak; the next run signs in again.

For sites behind HTTP authentication or a token, `--basic user:pass`,
`--header "Authorization: Bearer …"` (repeatable) and `--cookie name=value`
(repeatable) set the request without a browser window. A header and HTTP
credentials go only to the site being audited: the fonts, scripts, images
and frames a page pulls from other hosts get neither, and another host's
own authentication challenge is declined.

A page that answers with a sign-in form instead of the address asked for is
reported as exactly that, never audited as if it were the site. `pour mcp`
has no one to sign in for it, so pages behind a login are audited from the
terminal.

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

Each tool takes either a `url` or a `path` to a file on disk. A path is
served over a loopback port, the same way `pour index.html` is, so relative
assets load; `root` names the site root when they are addressed from there.
A path to a template or a component (`.jsx`, `.vue`, `.liquid` and the rest)
is read as source by the static lane instead, and answers with the line and
column of every finding, saying plainly that it was not rendered.

A path reaches only inside the directory the server was started in, which
`POUR_MCP_ROOT` can point elsewhere. Started at the filesystem root, with no
project to stay inside, the server refuses paths altogether.

The server loads `http` and `https` and nothing else. `file://` is refused
there, though the command still takes it: an agent chooses the addresses it
asks for, often from a page it has just read, and the disk is not a web
page.

## License

MIT
