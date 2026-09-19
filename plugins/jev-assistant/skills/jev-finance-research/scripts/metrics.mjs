// Input is an equity curve after fees/slippage, with no external cash flows.
// No quote retrieval, trading, forecasting or model inference occurs here.
export function summarizeEquity(rows) {
  if (!Array.isArray(rows) || rows.length < 2) throw new Error('At least two equity observations are required');
  let previous = -Infinity;
  for (const r of rows) {
    const time = typeof r.date === 'string' ? Date.parse(r.date) : NaN;
    if (!Number.isFinite(time) || time <= previous || !Number.isFinite(r.equity) || r.equity <= 0) throw new Error('Need strictly increasing dates and positive finite equity');
    previous = time;
  }
  let peak = rows[0].equity;
  let maxDrawdown = 0;
  for (const r of rows) { peak = Math.max(peak, r.equity); maxDrawdown = Math.max(maxDrawdown, 1 - r.equity / peak); }
  return { start: rows[0].date, end: rows.at(-1).date, observations: rows.length,
    totalReturn: rows.at(-1).equity / rows[0].equity - 1, maxDrawdown,
    assumptions: 'Positive equity, no external cash flows, fees/slippage already reflected. No annualization or predictive interpretation.' };
}
