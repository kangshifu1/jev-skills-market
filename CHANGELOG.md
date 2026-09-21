# Changelog

## Unreleased — 2026-09-21 — external discovery on main

- Add 71 independent projects from 109 GitHub candidates with current API metadata
  and pinned Jev integration evidence; record 38 exclusions or existing sources.
- Distinguish ordinary tools, SDKs and runtime-dependent plugins from installable
  Skills. Tools and resource collections return no fabricated Skill installer.
- Validate automated discovery metadata and repository deduplication. Keep new entries
  out of model routing until separately evaluated; no upstream code was executed.
- Existing v0.1.2 release remains unchanged; the new catalog is available on main.

## v0.1.2 — 2026-09-19 — QuantSkills discovery

- Register QuantSkills as an external resource directory in Jev routing.
- Distinguish catalogs from installable Skills; no fabricated installation command.
- Pin the inspected source revision and explain per-project dependencies and licensing.
- Add discovery-versus-metrics routing coverage and daily discovery criteria.
- Existing v0.1.1 screenshots remain historical evidence; no upstream execution is claimed.

## v0.1.1 — 2026-09-19 — live smoke verification

- Add an opt-in live routing test and sanitized evidence.
- Real `jev-1.13.0` passed 3/3 synthetic cases: browser operation, automation-test planning and no skill for general chat.
- Update the independent Computer Use catalog entry to its v0.1.1 release and exact source commit.
- Exclude local YAML credential filenames; keep all actual keys out of repository files.
- Audio services and live trading remain outside the implemented scope.

## v0.1.0 — 2026-09-19 — developer preview

- Create a repository-based skill catalog and Codex assistant plugin.
- Register independent `kangshifu1/jev-computer-use` as the first external entry.
- Bundle assistant, automation-test, finance-research, voice-assistant and original TypeSafe skills.
- Add preview/live TypeSafe skill routing with no-match handling and no automatic execution.
- Add deterministic historical equity metrics and a cancellable voice turn state machine.
- Add provenance, CI, contributor instructions, offline demo and architecture documentation.

Release validation: 7 unit/contract tests passed. Catalog, source hashes, Skill frontmatter,
plugin manifest and local Skill discovery passed. The offline demo makes no provider calls.
Audio services, conversational model adapters and UI are architecture targets, not connected
features. Finance workflows do not include a broker connector or complete backtest engine.
