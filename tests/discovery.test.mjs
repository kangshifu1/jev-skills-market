import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog, validateCatalog, installCommand} from '../plugins/jev-assistant/skills/jev-assistant/scripts/catalog.mjs';
import {buildRequest} from '../plugins/jev-assistant/skills/jev-assistant/scripts/router.mjs';

const revision = 'a'.repeat(40);
const entry = {
  id: 'example-tool', kind: 'tool', description: 'Optional Jev decisions in an external app.',
  distribution: 'external', repository: 'example/tool', url: 'https://github.com/example/tool',
  version: revision, revision, requires: ['Upstream runtime'], license: null,
  licenseStatus: 'No license identified; link-only registration.',
  selection: 'daily-github-discovery', status: 'source-reviewed-not-run', routable: false,
  github: {owner: 'example', stars: 101, archived: false, defaultBranch: 'main',
    checkedAt: '2026-09-21T00:00:00Z', pushedAt: '2026-09-20T00:00:00Z', updatedAt: '2026-09-20T00:00:00Z'},
  evidence: [{url: `https://github.com/example/tool/blob/${revision}/README.md#L10`, summary: 'Describes its Jev integration.'}]
};
const catalogOf = (...skills) => ({schemaVersion: 1, skills});

test('external tools expose provenance without a fabricated skills installer', () => {
  assert.equal(installCommand(entry), null);
  for (const change of [{kind: 'installer'}, {revision: 'main'}, {url: 'https://unrelated.example/tool'}, {distribution: 'bundled'}]) {
    assert.throws(() => validateCatalog(catalogOf({...entry, ...change})));
  }
});

test('automatic discovery enforces threshold, source evidence, dates and untested status', () => {
  validateCatalog(catalogOf(entry));
  for (const change of [{stars: 100}, {stars: 101.5}, {archived: true}, {owner: 'other'}, {defaultBranch: ''}, {checkedAt: 'unknown'}, {pushedAt: null}]) {
    assert.throws(() => validateCatalog(catalogOf({...entry, github: {...entry.github, ...change}})));
  }
  for (const change of [{evidence: []}, {evidence: [{url: `${entry.url}/blob/main/README.md`, summary: 'Unpinned'}]}, {routable: true}, {status: 'tested'}, {licenseStatus: ''}]) {
    assert.throws(() => validateCatalog(catalogOf({...entry, ...change})));
  }
});

test('repository deduplication is case insensitive, while bundled siblings remain valid', async () => {
  const duplicate = {...entry, id: 'alias', selection: 'user-requested', repository: 'Example/Tool', url: 'https://github.com/Example/Tool'};
  assert.throws(() => validateCatalog(catalogOf(entry, duplicate)), /Duplicate external repository/);
  validateCatalog(await loadCatalog());
});

test('newly discovered projects do not expand live routing until separately evaluated', async () => {
  const catalog = await loadCatalog();
  const baseline = {...catalog, skills: catalog.skills.filter(s => s.selection !== 'daily-github-discovery')};
  assert.deepEqual(buildRequest('Test a report page', catalog), buildRequest('Test a report page', baseline));
  assert.equal(buildRequest('Test a report page', catalogOf(entry)).questions.skill.criteria['example-tool'], undefined);
});
