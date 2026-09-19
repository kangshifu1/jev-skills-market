# Register a skill

1. Publish a standalone skill folder with `SKILL.md`, license, source repository and
   immutable release. Keep it usable without this market.
2. Add an external entry to `plugins/jev-assistant/skills/jev-assistant/references/catalog.json`:
   unique id, narrow description, category, distribution, repository, version, license,
   path, runtime requirements and truthful implementation status.
3. Include source attribution, what data leaves the user's machine, required credentials,
   and actual test evidence. Do not advertise a provider capability as already integrated.
4. Run `npm test` and `npm run validate`; submit the entry and documentation as a PR.

Bundled skills live under `plugins/jev-assistant/skills/`. Keep their instructions
self-contained and use relative references inside each installed folder. External
runtime dependencies must use documented APIs, never adjacent-checkout paths.

Model/provider tests should use injected mock responses by default. Mark live tests
explicitly and never commit account data, secrets or authenticated browser profiles.
