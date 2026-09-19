import { loadCatalog } from '../plugins/jev-assistant/skills/jev-assistant/scripts/catalog.mjs';
import { buildRequest, readDecision } from '../plugins/jev-assistant/skills/jev-assistant/scripts/router.mjs';
import { summarizeEquity } from '../plugins/jev-assistant/skills/jev-finance-research/scripts/metrics.mjs';
import { VoiceSession } from '../plugins/jev-assistant/skills/jev-voice-assistant/scripts/session.mjs';
const request=buildRequest('Test the reporting page',await loadCatalog());
const simulated={model:'jev-demo',answers:{skill:{type:'choice',choice:'jev-automation-test',confidence:0.9,probabilities:Object.fromEntries(Object.keys(request.questions.skill.criteria).map(k=>[k,k==='jev-automation-test'?1:0]))}}};
const voice=new VoiceSession();const first=voice.begin('Open report');voice.propose(first.turnId,{id:'report',summary:'Open report',effect:'read'});voice.takeAction(first.turnId);voice.interrupt();
console.log(JSON.stringify({mode:'offline-simulation; no model, browser, audio or trading calls',routing:readDecision(simulated,request),finance:summarizeEquity([{date:'2026-01-01',equity:100},{date:'2026-01-02',equity:120},{date:'2026-01-03',equity:90},{date:'2026-01-04',equity:110}]),voice:{state:voice.state,oldSignalAborted:first.signal.aborted,lateCompletionAccepted:voice.complete(first.turnId,{verified:true})}},null,2));
