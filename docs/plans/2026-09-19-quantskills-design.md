# QuantSkills catalog integration

Register the public directory as an external `kind: catalog` entry and include its
description in the existing Jev Choice router. A plain README link would not make
it discoverable by the router; importing the entire upstream ecosystem would
incorrectly imply shared installation, licensing and verification. This change
uses the existing recommendation flow and keeps each upstream project independent.

`list` identifies entry kinds. `show quantskills` exposes the source and pinned
inspection revision, with `install: null`, because the directory has no SKILL.md.
The host selects an individual project and checks its contract before use. Local
metrics remain routed to jev-finance-research. No execution adapter or upstream
native Jev support is implied.

Validate catalog source metadata and absence of a fabricated installation command.
Exercise real Jev routing for Chinese and English discovery requests alongside
existing browser, test-planning, finance and no-match cases. Keep previous v0.1.1
screenshots as historical evidence and publish new routing evidence separately.
