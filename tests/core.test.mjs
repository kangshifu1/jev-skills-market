import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog,validateCatalog,installCommand} from '../plugins/jev-assistant/skills/jev-assistant/scripts/catalog.mjs';
import {buildRequest,readDecision,routeTask} from '../plugins/jev-assistant/skills/jev-assistant/scripts/router.mjs';
import {summarizeEquity} from '../plugins/jev-assistant/skills/jev-finance-research/scripts/metrics.mjs';
import {VoiceSession} from '../plugins/jev-assistant/skills/jev-voice-assistant/scripts/session.mjs';

const catalog=await loadCatalog();
function answer(request,choice,confidence=0.9) {
  return {model:'jev-test',answers:{skill:{type:'choice',choice,confidence,probabilities:Object.fromEntries(Object.keys(request.questions.skill.criteria).map(k=>[k,k===choice?1:0]))}}};
}
test('first imported catalog skill installs from its independent pinned repository',()=>{
  validateCatalog(catalog);
  const first=catalog.skills[0];
  assert.equal(first.id,'jev-computer-use');
  assert.equal(first.distribution,'external');
  assert.match(first.revision,/^[0-9a-f]{40}$/);
  assert.ok(installCommand(first).includes(`kangshifu1/jev-computer-use/tree/${first.revision}`));
  assert.throws(()=>validateCatalog({...catalog,skills:[first,first]}));
});
test('routing includes no-match and never executes a recommendation',()=>{
  const request=buildRequest('What is the Sun?',catalog);
  assert.equal(readDecision(answer(request,'NONE'),request).status,'no-match');
  assert.equal(readDecision(answer(request,'jev-computer-use',0.5),request).status,'needs-review');
  assert.equal(readDecision(answer(request,'jev-computer-use'),request).executed,false);
  const invalid=answer(request,'jev-computer-use');invalid.answers.skill.probabilities.EXTRA=1;
  assert.throws(()=>readDecision(invalid,request));
  assert.throws(()=>buildRequest('',catalog));
});
test('provider request sends no key in body and rejects transport/provider errors without raw bodies',async()=>{
  const result=await routeTask('Test browser',catalog,{apiKey:'fake-unit-test-secret',fetchImpl:async(url,opts)=>{
    assert.equal(url,'https://api.typesafe.ai/v1/systemone');
    assert.equal(opts.redirect,'error');
    assert.equal(opts.body.includes('fake-unit-test-secret'),false);
    const request=JSON.parse(opts.body);return new Response(JSON.stringify(answer(request,'jev-automation-test')));
  }});
  assert.equal(result.skill,'jev-automation-test');
  await assert.rejects(()=>routeTask('task',catalog,{apiKey:'secret',fetchImpl:async()=>new Response('sensitive response',{status:401})}),/^Error: TypeSafe HTTP 401$/);
  await assert.rejects(()=>routeTask('task',catalog,{}),/required/);
});
test('equity calculation handles peaks and rejects invalid chronology',()=>{
  const result=summarizeEquity([{date:'2026-01-01',equity:100},{date:'2026-01-02',equity:120},{date:'2026-01-03',equity:90},{date:'2026-01-04',equity:110}]);
  assert.ok(Math.abs(result.totalReturn-0.1)<1e-12);assert.equal(result.maxDrawdown,0.25);
  assert.throws(()=>summarizeEquity([{date:'2026-01-01',equity:100},{date:'2026-01-01',equity:120}]));
  assert.throws(()=>summarizeEquity([{date:'2026-01-01',equity:100},{date:'2026-01-02',equity:-1}]));
});
test('voice: confirmation is bound to turn/action; actions cannot execute twice',()=>{
  const s=new VoiceSession();const {turnId}=s.begin('Send the report');
  s.propose(turnId,{id:'send-1',summary:'Send this report',effect:'external-write'});
  assert.equal(s.takeAction(turnId),null);assert.equal(s.confirm(turnId,'other'),false);
  assert.equal(s.confirm(turnId,'send-1'),true);assert.ok(s.takeAction(turnId));
  assert.equal(s.takeAction(turnId),null);assert.equal(s.complete(turnId,{verified:false}),true);
  assert.equal(s.state,'needs-review');
});
test('voice: interruption aborts providers and discards late results and confirmations',()=>{
  const s=new VoiceSession();const old=s.begin('Open reports');
  s.propose(old.turnId,{id:'open',summary:'Open reports',effect:'read'});const job=s.takeAction(old.turnId);
  s.interrupt();assert.equal(job.signal.aborted,true);assert.equal(s.complete(old.turnId,{verified:true}),false);
  const current=s.begin('Just chat');assert.equal(s.confirm(old.turnId,'open'),false);
  assert.equal(s.propose(old.turnId,{id:'old',summary:'old',effect:'read'}).accepted,false);
  assert.equal(s.reply(current.turnId),true);assert.equal(s.finishSpeaking(current.turnId),true);
  assert.equal(s.state,'idle');
});
test('voice: live orders are explicitly unsupported',()=>{
  const s=new VoiceSession();const {turnId}=s.begin('Buy stock');
  assert.equal(s.propose(turnId,{id:'trade',summary:'Buy stock',effect:'financial-execute'}).reason,'live-trading-not-implemented');
  assert.equal(s.takeAction(turnId),null);
});
