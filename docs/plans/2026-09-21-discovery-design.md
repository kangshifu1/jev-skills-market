# External project discovery

The daily task registers independently maintained Jev projects with more than 100
GitHub stars. Registration needs source evidence and an immutable revision; it does
not install or run the project.

Use the existing machine-readable catalog, adding `kind: tool` for applications,
SDKs, MCP servers and plugin bundles. Unlike a standalone `skill`, a `tool` or
`catalog` returns `install: null` and points to pinned upstream usage instructions.
Wrapping every project as a Skill would invent compatibility; a separate list alone
would make projects invisible to the existing list/show commands.

New daily discoveries carry API metadata, license status and pinned integration
evidence. They remain `routable: false` and `source-reviewed-not-run`. Source review
alone does not justify expanding the already evaluated model router. Existing
user-selected entries retain their status and routing behavior.

Validate repository deduplication, the strict star threshold, unarchived status,
source timestamps and pinned evidence. Test that ordinary tools never get a Skill
installer and that live routing options remain unchanged. Publish the catalog,
README and discovery audit together on main; existing release tags stay immutable.
