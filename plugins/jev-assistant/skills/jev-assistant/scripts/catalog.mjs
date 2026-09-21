import { readFile } from 'node:fs/promises';
export async function loadCatalog() {
  return JSON.parse(await readFile(new URL('../references/catalog.json', import.meta.url), 'utf8'));
}
export function validateCatalog(catalog) {
  if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.skills) || !catalog.skills.length) throw new Error('Invalid catalog');
  const ids = new Set();
  const externalRepositories = new Set();
  for (const skill of catalog.skills) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.id) || ids.has(skill.id)) throw new Error('Invalid or duplicate skill ID');
    ids.add(skill.id);
    if (typeof skill.description !== 'string' || !skill.description || !['external', 'bundled'].includes(skill.distribution)) throw new Error('Invalid skill metadata');
    if (!/^[\w.-]+\/[\w.-]+$/.test(skill.repository) || !skill.version || !Array.isArray(skill.requires)) throw new Error('Missing install metadata');
    if (skill.kind !== undefined && !['skill', 'catalog', 'tool'].includes(skill.kind)) throw new Error('Invalid entry kind');
    if (skill.distribution === 'external') {
      const repository = skill.repository.toLowerCase();
      if (externalRepositories.has(repository)) throw new Error('Duplicate external repository');
      externalRepositories.add(repository);
    }
    if (['catalog', 'tool'].includes(skill.kind) && (skill.distribution !== 'external' || !/^[0-9a-f]{40}$/.test(skill.revision ?? '') || skill.url !== `https://github.com/${skill.repository}`)) throw new Error('Invalid external source');
    if (skill.selection === 'daily-github-discovery') {
      const source = skill.github;
      if (skill.distribution !== 'external' || !/^[0-9a-f]{40}$/.test(skill.revision ?? '') || skill.version !== skill.revision || skill.url !== `https://github.com/${skill.repository}`) throw new Error('Invalid discovered source');
      if (!source || !Number.isInteger(source.stars) || source.stars <= 100 || source.archived !== false || source.owner !== skill.repository.split('/')[0] || typeof source.defaultBranch !== 'string' || !source.defaultBranch.trim()) throw new Error('Ineligible discovery metadata');
      if (['checkedAt', 'pushedAt', 'updatedAt'].some(key => typeof source[key] !== 'string' || !Number.isFinite(Date.parse(source[key])))) throw new Error('Missing discovery timestamps');
      const prefix = `${skill.url}/blob/${skill.revision}/`;
      if (!Array.isArray(skill.evidence) || !skill.evidence.length || skill.evidence.some(e => typeof e.url !== 'string' || !e.url.startsWith(prefix) || typeof e.summary !== 'string' || !e.summary.trim())) throw new Error('Missing pinned integration evidence');
      if (skill.routable !== false || skill.status !== 'source-reviewed-not-run') throw new Error('Discovery is not runtime verification');
      if (typeof skill.licenseStatus !== 'string' || !skill.licenseStatus.trim()) throw new Error('Missing license review status');
    }
  }
  return catalog;
}
export function installCommand(skill) {
  // Identifiers are checked rather than interpolating user-supplied shell text.
  validateCatalog({ schemaVersion: 1, skills: [skill] });
  // Apps, SDKs, plugin bundles and resource catalogs are not standalone Skills.
  if (['catalog', 'tool'].includes(skill.kind)) return null;
  const ref = skill.revision ?? skill.version;
  if (!/^(?:v\d+\.\d+\.\d+|[0-9a-f]{40})$/.test(ref)) throw new Error('Invalid release reference');
  return `npx skills add https://github.com/${skill.repository}/tree/${ref} --skill ${skill.id} -g -a codex`;
}
