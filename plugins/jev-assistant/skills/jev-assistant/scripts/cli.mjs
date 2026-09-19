import { parseArgs } from 'node:util';
import { loadCatalog, validateCatalog, installCommand } from './catalog.mjs';
import { buildRequest, routeTask } from './router.mjs';

export async function main(args = process.argv.slice(2)) {
  try {
    const { values, positionals } = parseArgs({ args, allowPositionals: true, options: { live: { type: 'boolean' }, help: { type: 'boolean' } } });
    const catalog = validateCatalog(await loadCatalog());
    const [command, ...rest] = positionals;
    const output = value => console.log(JSON.stringify(value, null, 2));
    if (values.help || !command) console.log('Jev Skills Market\n  list\n  show <skill-id>\n  route "task" [--live]\n  doctor\nRoute previews the exact request by default. --live uses TYPESAFE_API_KEY. No command executes a recommended skill.');
    else if (command === 'list') output(catalog.skills.map(s => ({ id: s.id, distribution: s.distribution, category: s.category, status: s.status })));
    else if (command === 'show') {
      const skill = catalog.skills.find(s => s.id === rest[0]);
      if (!skill) throw new Error('Unknown skill');
      output({ ...skill, install: installCommand(skill) });
    } else if (command === 'route') {
      const task = rest.join(' ');
      output(values.live ? await routeTask(task, catalog, { apiKey: process.env.TYPESAFE_API_KEY, model: process.env.TYPESAFE_MODEL || 'jev-latest' }) : { mode: 'preview', executed: false, request: buildRequest(task, catalog) });
    } else if (command === 'doctor') output({ node: process.version, catalog: 'valid', typeSafeKeyPresent: !!process.env.TYPESAFE_API_KEY, browser: 'not-probed', audio: 'not-connected', computerUse: 'external skill; inspect host runtime before use' });
    else throw new Error('Unknown command');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
