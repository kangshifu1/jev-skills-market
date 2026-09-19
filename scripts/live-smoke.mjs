// Opt-in TypeSafe routing smoke test; uses only these public synthetic requests.
import {loadCatalog} from '../plugins/jev-assistant/skills/jev-assistant/scripts/catalog.mjs';
import {routeTask} from '../plugins/jev-assistant/skills/jev-assistant/scripts/router.mjs';
const cases=[
  {task:'Open the browser Reports page, click the Daily tab, and scroll through the report.',expected:'jev-computer-use'},
  {task:'Design regression and API integration test cases for a reporting feature with explicit assertions and pass/fail evidence.',expected:'jev-automation-test'},
  {task:'寻找 QuantSkills 中用于因子挖掘、IC 评价和前视偏差审计的工具，先给我项目入口。',expected:'quantskills'},
  {task:'Find QuantSkills tools for a factor research and backtesting workflow; show where to discover the individual projects.',expected:'quantskills'},
  {task:'Calculate total return and maximum drawdown from my existing dated equity series.',expected:'jev-finance-research'},
  {task:'What is the Sun?',expected:null}
];
try {
  const catalog=await loadCatalog();const results=[];
  for(const entry of cases){
    const start=performance.now();
    const actual=await routeTask(entry.task,catalog,{apiKey:process.env.TYPESAFE_API_KEY,model:process.env.TYPESAFE_MODEL||'jev-latest'});
    const pass=actual.skill===entry.expected && actual.status===(entry.expected?'recommended':'no-match');
    results.push({...entry,actual,pass,elapsedMs:Math.round(performance.now()-start)});
  }
  console.log(JSON.stringify({kind:'live-typesafe-router',catalogVersion:catalog.version,observedAt:new Date().toISOString(),passed:results.filter(r=>r.pass).length,total:results.length,cases:results,limitations:'A small set of synthetic requests, not a general accuracy benchmark. No skills were executed.'},null,2));
  if(results.some(r=>!r.pass))process.exitCode=1;
}catch(error){console.error(error.message);process.exitCode=1;}
