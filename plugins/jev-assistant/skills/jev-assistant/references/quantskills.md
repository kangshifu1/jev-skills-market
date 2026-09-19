# QuantSkills handoff

Source: https://github.com/quantskills/quantskills

Inspected commit: `9bb4b122a43a94835a419f922a7be1628d3ddf41` (2026-09-19).
The inspected directory contains 214 entries. This count describes that snapshot,
not installed or tested capabilities. It links to separate projects for quant data,
factor research, market analysis, risk, backtesting and research validation.

## What Jev does here

Our existing Choice router can select `quantskills` when the user wants to find or
choose a specialized quant tool. The host then follows the directory to an individual
project. Jev is not running all directory entries, generating investment analysis,
or placing trades. The inspected upstream README and published catalog did not
contain a Jev/TypeSafe integration; the integration is in this market's router.

1. Open the directory and choose a project that matches the needed input and output.
2. Inspect that project's actual `SKILL.md`, source revision, license, dependencies,
   data-provider requirements and execution interface before installation or use.
3. Preserve the user's task and authorization. Directory recommendations alone do
   not enable trading or authorize credentials, external writes or code execution.
4. Report discovery, installation, execution and verification separately. Missing
   provider access or an unpublished endpoint means the workflow is not yet tested.

The directory itself contains no `SKILL.md`, so do not generate a `skills add
--skill quantskills` command. No root license was found at the inspected revision;
we register the public link and our own description, without copying upstream code,
skill text, screenshots or catalog data. Individual repositories require their own
license checks.

Use `jev-finance-research` directly for sourced financial research or computing
returns/drawdown from an existing equity series. Use QuantSkills for finding the
specialized external research toolchain.
