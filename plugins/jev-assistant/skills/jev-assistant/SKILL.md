---
name: jev-assistant
description: Coordinate Jev skills for browser automation, software testing, finance research and voice-assistant design. Use to discover a suitable skill or combine those workflows while keeping evidence and execution status clear.
license: MIT
---

# Jev Assistant

An independent community assistant; Jev supplies typed judgments and the host owns
conversation, planning and execution. Read [the catalog](references/catalog.json) to
choose the smallest capability that serves the user's goal. Ordinary questions can
be answered directly; do not require Jev or a skill for every turn.

## Skills

- **jev-computer-use** is the first imported catalog entry and an **independent external
  repository**. Read its installed `SKILL.md` when available. If absent, show its pinned
  install command with `show`; install only within the user's requested setup scope.
  Do not assume a bundled copy, a browser connection or API credentials.
- **jev-automation-test** records reproducible cases, independent assertions and observed
  failures. Choose it when the deliverable is test evidence, not just clicks.
- **jev-finance-research** handles sourced financial research, historical analysis and
  simulation. Choose it for those outputs even if browser navigation is also needed.
- **jev-voice-assistant** designs conversation/audio adapters and cancellable execution.
  It does not supply a microphone or a speech provider.
- **typesafe-ai** contains the original TypeSafe integration guidance. Use current docs
  when designing questions or changing API integration.

Bundled skills are siblings of this folder in the plugin. With standalone selective
installs they may be absent; do not treat the catalog as proof of installation. Load
only the skill needed for the current step and preserve the host's available tools.

## Optional model routing

From the installed skill directory run `node scripts/run.mjs list` or
`node scripts/run.mjs show jev-computer-use`. To inspect the exact routing request:

```sh
node scripts/run.mjs route "Test the reporting page in the browser"
```

Add `--live` to call TypeSafe using `TYPESAFE_API_KEY` from the process environment.
This sends the task text and public skill descriptions to TypeSafe. It returns a
recommendation, a no-match result or a review request; it never executes a skill.
The routing threshold is a configurable heuristic, not a success probability.

## Coordinate a workflow

Translate the user's intent into an expected result and stopping point. For multi-step
tasks, identify which tool produces each piece of evidence. Use independent judgments
in the same TypeSafe call when they share state, and keep deterministic checks in code.
Keep authorization from the user's request separate from model suggestions.

Report what was installed, configured, executed and verified separately. Surface a
missing runtime, key or source as a specific dependency rather than pretending a
simulation completed the real task. Resume authorized work when dependencies are ready.
