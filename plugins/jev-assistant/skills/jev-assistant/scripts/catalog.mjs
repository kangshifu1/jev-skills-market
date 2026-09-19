import { readFile } from 'node:fs/promises';
export async function loadCatalog() {
  return JSON.parse(await readFile(new URL('../references/catalog.json', import.meta.url), 'utf8'));
}
export function validateCatalog(catalog) {
  if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.skills) || !catalog.skills.length) throw new Error('Invalid catalog');
  const ids = new Set();
  for (const skill of catalog.skills) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.id) || ids.has(skill.id)) throw new Error('Invalid or duplicate skill ID');
    ids.add(skill.id);
    if (typeof skill.description !== 'string' || !skill.description || !['external', 'bundled'].includes(skill.distribution)) throw new Error('Invalid skill metadata');
    if (!/^[\w.-]+\/[\w.-]+$/.test(skill.repository) || !skill.version || !Array.isArray(skill.requires)) throw new Error('Missing install metadata');
    if (skill.kind !== undefined && !['skill', 'catalog'].includes(skill.kind)) throw new Error('Invalid entry kind');
    if (skill.kind === 'catalog' && (skill.distribution !== 'external' || !/^[0-9a-f]{40}$/.test(skill.revision ?? '') || skill.url !== `https://github.com/${skill.repository}`)) throw new Error('Invalid external catalog source');
  }
  return catalog;
}
export function installCommand(skill) {
  // Identifiers are checked rather than interpolating user-supplied shell text.
  validateCatalog({ schemaVersion: 1, skills: [skill] });
  // Resource catalogs have no installable SKILL.md of their own.
  if (skill.kind === 'catalog') return null;
  const ref = skill.revision ?? skill.version;
  if (!/^(?:v\d+\.\d+\.\d+|[0-9a-f]{40})$/.test(ref)) throw new Error('Invalid release reference');
  return `npx skills add https://github.com/${skill.repository}/tree/${ref} --skill ${skill.id} -g -a codex`;
}
