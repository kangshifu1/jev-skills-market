# Reproducible financial research

Record instrument identifiers and exchange, dates/time zone, price adjustments,
data vendor/source, missing observations, currency and the benchmark.

Before a backtest, write when a signal is observable, when an order could execute,
position sizing, exit logic, fees, spread/slippage and liquidity assumptions.
Use data available at each simulated decision time. Split development and holdout
periods chronologically and report how many variants were tried. Include delisted
instruments when relevant and handle corporate actions consistently.

Compare against the same-period benchmark after costs. Report drawdown, turnover,
exposure and trade counts alongside returns where the data supports them. Missing
data or an unknown fee model is a limitation, not a reason to fill in favorable values.
Paper fills are simulated evidence, not proof of achievable live execution.
