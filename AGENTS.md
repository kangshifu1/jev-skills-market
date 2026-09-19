# Jev Skills Market

Use `plugins/jev-assistant/skills/typesafe-ai/SKILL.md` for Jev design and integration work.
Consult https://docs.typesafe.ai/llms.txt and the relevant current API and cookbook.

This is an independent community project. Preserve imported licenses and source commit
records in `upstream.lock.json`. Never imply official TypeSafe or OpenAI endorsement.

The first catalog entry is the independent repository kangshifu1/jev-computer-use.
Never vendor its runtime here or require the market from that repository.

Run `npm test` and `npm run validate` for relevant runtime changes.
Tests use synthetic data and mocked model decisions; distinguish them from live Jev tests.
Never commit API keys, authenticated browser profiles, page captures, or private finance data.
Voice integration must discard stale turn results after interruption. Model choice and
confidence never grant execution authority. This release has no real-money order adapter.
