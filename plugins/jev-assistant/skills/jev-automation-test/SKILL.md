---
name: jev-automation-test
description: Design and run reproducible automation tests with explicit expected results, browser or API evidence, and pass/fail/not-covered reporting. Use for regression, smoke, integration and exploratory testing; optionally use the independent jev-computer-use skill for browser actions.
license: MIT
---

# Jev Automation Test

Start from the behavior being tested, its environment, data and expected result.
Use existing test tooling in the project. Read [case format](references/cases.md)
when a durable test plan/report is needed. Use synthetic fixtures or designated test
accounts where the task allows them; do not replace requested production observations
with a demo without explaining the change.

For browser-heavy tasks, load the installed **jev-computer-use** skill. It is external:
https://github.com/kangshifu1/jev-computer-use. If it or its runtime is absent, report
that dependency and continue independent API/unit checks. A named skill is not proof
that a browser is reachable.

Use Jev to choose among already-permitted navigation actions or to classify ambiguous
text. Assert totals, response codes, persisted values and exact state with deterministic
checks where possible. Model confidence and `needs_verification` are not test oracles.
If a semantic judgment is unavoidable, retain source evidence and label its uncertainty.

Record **pass** only when an expectation was evaluated successfully; **fail** when
evidence contradicts it; **not-covered** when it was not evaluated. A missing environment
is blocked coverage, not a product defect. An absent control can be either: distinguish
unavailable observation support from a confirmed missing UI element.

After a write, inspect persistence or the authoritative response before reporting success.
Retry only if the preceding action's effect is known or the operation is idempotent.
For failures capture the minimal reproducible steps, expected/actual result, environment
and relevant evidence. Keep secrets and private customer data out of public reports.
