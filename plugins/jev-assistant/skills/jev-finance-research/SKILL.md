---
name: jev-finance-research
description: Research financial instruments and evaluate historical or simulated strategies with traceable data, explicit assumptions and reproducible metrics. Use for financial research, event classification and paper-trading analysis; this skill has no real-money trading adapter.
license: MIT
---

# Jev Finance Research

Identify the requested market, instrument, period, currency and deliverable. Use current
primary sources for current prices, filings, product rules or market facts, recording
source and as-of time. Separate retrieval time from the observation's time and disclose
delayed data. If browsing/data access is unavailable, state the limitation and work only
with dated supplied data. Do not infer current holdings, risk tolerance or trading authority.

Jev can classify an event, rank candidate evidence, or check whether a filing supports a
claim. Read current TypeSafe question guidance for such integration work. Preserve raw
source evidence; neither classification probability nor Choice confidence predicts price
returns or establishes that a trade is suitable. Calculate numeric results in ordinary code.

For strategy evaluation, read [research protocol](references/research.md). Distinguish
research, historical simulation, paper execution and live trading. This version supplies
research instructions and a deterministic equity-summary helper, not a broker connector
or a complete backtesting engine. A request for real execution needs a separate approved
adapter and explicit order parameters; do not improvise clicks in a broker UI.

`scripts/metrics.mjs` exports `summarizeEquity(rows)` for positive equity observations
with strictly increasing dates. It computes total return and peak-to-trough drawdown.
Fees/slippage must already be reflected, and external cash flows are unsupported.
Do not apply these metrics to a deposit/withdrawal series or present demo data as a strategy.

Deliver an answer with its evidence, assumptions, costs and limitations. Clearly label
forecasts or scenarios and avoid guarantees. Keep account identifiers and portfolio data
out of model requests unless transmission is within the user's authorized scope.
