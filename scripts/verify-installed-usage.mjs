// Opt-in usage checks for a skill set installed from GitHub in an isolated directory.
import {readFile,writeFile} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const exec=promisify(execFile);
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const skills=resolve(process.env.JEV_SKILLS_DIR||join(root,'plugins/jev-assistant/skills'));
const cli=join(skills,'jev-assistant/scripts/run.mjs');
const {loadCatalog}=await import(pathToFileURL(join(skills,'jev-assistant/scripts/catalog.mjs')).href);
const installedCatalog=await loadCatalog();
const results=[];
try{
  const command=async args=>JSON.parse((await exec(process.execPath,[cli,...args],{timeout:30000})).stdout);
  const catalog=await command(['list']);results.push({name:'Installed catalog listing',pass:catalog.length===installedCatalog.skills.length&&catalog[0].id==='jev-computer-use',observed:catalog.length+' registered entries'});
  const entry=await command(['show','jev-computer-use']);results.push({name:'External skill lookup',pass:entry.repository==='kangshifu1/jev-computer-use'&&entry.distribution==='external',observed:entry.repository});
  const preview=await command(['route','Test the report filter']);results.push({name:'Request preview without execution',pass:preview.mode==='preview'&&preview.executed===false,observed:preview.mode});
  const doctor=await command(['doctor']);results.push({name:'Capability diagnostics',pass:doctor.catalog==='valid'&&doctor.audio==='not-connected',observed:'catalog valid; audio not connected; browser not probed'});
  const cases=[
    {task:'Open the browser Reports page, click the Daily tab and scroll through the report.',expected:'jev-computer-use'},
    {task:'Design regression tests with explicit assertions and pass/fail evidence for the reporting API.',expected:'jev-automation-test'},
    {task:'Evaluate historical portfolio returns and drawdown from dated equity data with no trading.',expected:'jev-finance-research'},
    {task:'Design an interruptible voice and chat assistant with speech transcription and text-to-speech adapters.',expected:'jev-voice-assistant'},
    {task:'What is the Sun?',expected:null}
  ];
  const routing=[];
  for(const item of cases){const start=performance.now();const actual=await command(['route',item.task,'--live']);routing.push({...item,actual,elapsedMs:Math.round(performance.now()-start),pass:actual.skill===item.expected&&actual.status===(item.expected?'recommended':'no-match')});}
  const {summarizeEquity}=await import(pathToFileURL(join(skills,'jev-finance-research/scripts/metrics.mjs')).href);
  const metrics=summarizeEquity([{date:'2026-01-01',equity:100},{date:'2026-01-02',equity:120},{date:'2026-01-03',equity:90},{date:'2026-01-04',equity:110}]);
  results.push({name:'Installed finance helper / synthetic equity',pass:Math.abs(metrics.totalReturn-0.1)<1e-10&&metrics.maxDrawdown===0.25,observed:'Return 10%; maximum drawdown 25%; synthetic, no external cash flows'});
  const {VoiceSession}=await import(pathToFileURL(join(skills,'jev-voice-assistant/scripts/session.mjs')).href);
  const session=new VoiceSession();const turn=session.begin('Open reports');session.propose(turn.turnId,{id:'reports',summary:'Open reports',effect:'read'});const job=session.takeAction(turn.turnId);session.interrupt();
  results.push({name:'Installed voice control logic / no audio',pass:job.signal.aborted&&!session.complete(turn.turnId,{verified:true}),observed:'Interrupted action signal aborted; late completion rejected'});
  const report={kind:'github-installed-skills-usage',observedAt:new Date().toISOString(),distribution:'v'+installedCatalog.version,installedViaSkillsCli:!!process.env.JEV_SKILLS_DIR,localChecks:results,routing:{passed:routing.filter(r=>r.pass).length,total:routing.length,cases:routing},notTested:['Native Codex browser attachment','Microphone/STT/dialogue-model/TTS integration','Live broker execution','Complex authenticated website compatibility'],screenshotDisclosure:'The screenshot is a report rendered from this JSON, not a live marketplace application.'};
  await writeFile(join(root,'docs/usage-verification-2026-09-19.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
  if(results.some(r=>!r.pass)||routing.some(r=>!r.pass))process.exitCode=1;
}catch(error){console.error('Installed usage check failed. Raw child-process errors are withheld.');process.exitCode=1;}
