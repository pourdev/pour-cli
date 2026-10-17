# pour

Accessibility checks for coding agents. pour audits web pages and UI source
against WCAG 2.2 Level A and AA with its own engine, written from the W3C
specifications. This plugin gives an agent both halves of the job: the tools
that check a page, and the workflow for fixing what they find.

## What it adds

- **The pour skill.** When to audit, how to read the results and how to fix
  a finding without hiding it: check the changed source files first and the
  rendered page after, note the viewport and scroll state with every figure,
  fix in the source and audit again in the same state, keep the findings that
  need a person's review apart from the violations, and never call a page
  compliant because a run came back clean.
- **The pour MCP server**, with three tools:
  - `pour_audit` audits a URL, a running dev server or a file on disk, and
    returns each failing rule with its severity, its success criteria and
    the failing elements with their fix.
  - `pour_focus_order` lists the order the Tab key visits a page's controls,
    with each control's accessible name.
  - `pour_screenshot` captures the page as it is, or through one of pour's
    vision, sensory, motor and structure simulations.

## What it runs, fetches and sends

- The MCP server is the [pour-cli](https://www.npmjs.com/package/pour-cli)
  package, at the exact version pinned in `.mcp.json`, started with `npx`.
  The first start downloads that version from the npm registry.
- It drives the Chrome, Chromium or Edge already installed on the computer,
  headless. It never downloads a browser.
- It loads only the addresses the agent passes to a tool, over http or
  https, and files inside the folder the server was started in (or the
  folder `POUR_MCP_ROOT` names). `file:` addresses are refused. Loading a
  page means the browser fetches that page and its assets, as any visit
  would.
- Results go back to the agent and nowhere else. pour sends no telemetry,
  and has no account, key or server of its own.

## Requirements

Node 18 or later, and an installed Chrome, Chromium or Edge.

## Source and license

MIT. The command and this plugin:
[pourdev/pour-cli](https://github.com/pourdev/pour-cli). The engine:
[pourdev/pour-engine](https://github.com/pourdev/pour-engine). More at
[pour.dev](https://pour.dev).
