# Test case and evidence

Each case records: `id`, goal, environment/version, preconditions, input fixture,
actions, expected results, actual results, evidence references and status.
Use the project's established representation rather than creating a second system.

Example: open the local Reports page, click Daily, assert the date range label and
the exact fixture row count; assert no error banner. The independent assertions must
use expected fixture values, not values copied from the model's answer.

For API retry tests, verify at most one committed effect for the same idempotency key.
For async interfaces, distinguish accepted, processing, completed and failed states.
For browser tests, record engine/browser version and whether decisions were mocked.
Report the denominator: evaluated cases / planned cases. Never divide passes only by
the subset that happened to finish without describing omitted coverage.
