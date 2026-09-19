# Changelog

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
