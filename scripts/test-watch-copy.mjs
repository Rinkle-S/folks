// Watch wording, rendering and voice sequencing. No real audio or external writes.
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {load} from './test-loader.mjs';
const {LESSONS}=await load('lib/lessons.js'),{T}=await load('lib/i18n.js');
const {applyWatchCopy}=await load('lib/watchCopy.js'),{speechTexts}=await load('lib/speechText.js'),{textId}=await load('lib/hash.js');
const {personalise}=await load('lib/persona.js'),{sentences}=await load('lib/sentences.js');
const strip=(key,value)=>['watchSay','watchWhy','watchClosing'].includes(key)?undefined:value;
const clone=JSON.parse(JSON.stringify(LESSONS)),original=JSON.stringify(clone,strip);applyWatchCopy(clone);assert.equal(JSON.stringify(clone,strip),original,'Watch data must not alter Practice/Read fields');
let count=0;for(const l of Object.values(LESSONS))for(const s of l.steps.slice(1)){
  count++;for(const lang of ['en','hi','ml']){
    assert.ok(s.watchSay?.[lang],`${l.id}/${s.id}/${lang}`);assert.ok(speechTexts().has(textId(s.watchSay[lang])));
    assert.ok(!/^(?:now\s+)?(?:tap|press|click|type|enter|swipe|choose|open)\b/i.test(s.watchSay.en),`${l.id}/${s.id}: imperative opening`);
    assert.ok(!/\b(?:tap next|now tap|press [0-9]|for practice, tap)\b/i.test(s.watchSay.en));
    if(s.kind==='quiz'){assert.ok(s.watchWhy?.[lang]);assert.ok(speechTexts().has(textId(s.watchWhy[lang])));assert.ok(!/^(?:well done|right!|exactly right|good\.)/i.test(s.watchWhy.en));}
  }
}assert.equal(count,129);console.log('PASS data: 129 Watch scripts x 3 languages, neutral quiz reasons, known speech and unchanged Practice/Read fields');
if(process.env.DATA_ONLY)process.exit(0);
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const base=process.env.TEST_URL||'http://127.0.0.1:3160',out=process.env.LAYOUT_SCREENSHOTS;if(out)await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE});
async function context(lang,width,voice=false){
  const c=await browser.newContext({viewport:{width,height:width<720?844:900}});
  await c.addInitScript(({lang,voice})=>{
    localStorage.setItem('folks_lang',lang);localStorage.setItem('folks_mute_v2',voice?'0':'1');localStorage.setItem('folks_onboarded','1');
    window.__spoken=[];window.__hold='';window.__utterance=null;
    window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};speechSynthesis.getVoices=()=>['en-IN','hi-IN','ml-IN'].map(lang=>({lang,name:lang+' test voice',localService:true}));speechSynthesis.cancel=()=>{};speechSynthesis.resume=()=>{};
    speechSynthesis.speak=u=>{if(u.text.trim()){window.__spoken.push(u.text);window.__utterance=u;}if(!window.__hold||!u.text.startsWith(window.__hold))setTimeout(()=>u.onend?.(),0);};
    window.Audio=class{play(){return Promise.resolve()}pause(){}load(){}addEventListener(){}removeEventListener(){}};
    const timer=setTimeout;window.setTimeout=(fn,ms,...args)=>timer(fn,ms===450?1:ms,...args);
  },{lang,voice});await c.route('**/api/**',r=>r.fulfill({json:{ok:true,stored:true,enabled:false}}));return c;
}
try{
  if(!process.env.VOICE_ONLY)for(const lang of (process.env.TEST_LANG?[process.env.TEST_LANG]:['en','hi','ml']))for(const width of (process.env.TEST_WIDTH?[Number(process.env.TEST_WIDTH)]:[320,1366])){
    globalThis.localStorage={getItem:k=>k==='folks_lang'?lang:null};const c=await context(lang,width),p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
    for(const l of Object.values(LESSONS)){
      await p.goto(`${base}/lesson/${l.id}?mode=watch`);await p.locator('.scene-body > .primary').click();await p.locator('.coach-actions button.big').click();
      for(const s of l.steps.slice(1)){
        await p.waitForFunction(text=>document.querySelector('.coach-text')?.textContent.trim()===text,personalise(s.watchSay[lang]));
        await p.evaluate(()=>document.fonts.ready);
        assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${lang} ${l.id}/${s.id} overflow`);
        assert.ok(await p.locator('.progress small').evaluate(e=>e.scrollWidth<=e.clientWidth+1),`${lang}: Watch status overlaps controls`);
        assert.ok(await p.locator('.screen').evaluate(e=>e.getBoundingClientRect().height>=100),`${l.id}: collapsed screen`);
        const hint=p.locator('.pin-key-hint');if(await hint.count())assert.ok((await hint.textContent()).includes(T[lang].watchDigits(4)));
        const bubble=p.locator('.tap-bubble');if(await bubble.count())assert.ok(await bubble.evaluate(e=>{const r=e.getBoundingClientRect(),s=e.closest('.screen').getBoundingClientRect();return r.left>=s.left&&r.right<=s.right;}),`${lang} ${l.id}/${s.id}: clipped Watch counter`);
        if(out&&((['amount','pin','scam-quiz','careful'].includes(s.id)&&['qr-pay','gd-ride-driver-check'].includes(l.id))||(l.id==='yono-balance'&&s.id==='mpin')))await p.screenshot({path:`${out}/${lang}-${width}-${l.id}-${s.id}.png`,fullPage:true});
        await p.locator('.coach-actions').getByRole('button',{name:T[lang].next,exact:true}).click();
      }
      await p.locator('.done-sub').waitFor();assert.equal(await p.locator('.done-sub').textContent(),T[lang].endWatched);
      // Try mode and Read mode retain their existing wording, hints and source cards.
      await p.goto(`${base}/lesson/${l.id}?mode=practice`);await p.locator('.scene-body > .primary').click();assert.equal(await p.locator('.coach-text').textContent(),personalise(l.steps[1].say[lang]));
    }
    // Switching from Watch to Practice restores imperative copy immediately, without a new button.
    await p.goto(`${base}/lesson/qr-pay?mode=watch`);await p.locator('.scene-body > .primary').click();await p.locator('.coach-actions button.big').click();await p.getByRole('button',{name:T[lang].tryMyself,exact:true}).click();assert.equal(await p.locator('.coach-text').textContent(),personalise(LESSONS['qr-pay'].steps[1].say[lang]));
    assert.deepEqual(errors,[]);console.log(`PASS ${lang} ${width}: all 129 Watch screens and Practice fallback`);await c.close();
  }
  const c=await context('en',390,true),p=await c.newPage(),step=LESSONS['qr-pay'].steps.find(s=>s.id==='check-name');
  await p.goto(`${base}/lesson/qr-pay?mode=watch`);await p.locator('.scene-body > .primary').click();await p.locator('.coach-actions button.big').click();
  for(let i=1;i<4;i++)await p.locator('.coach-actions').getByRole('button',{name:T.en.next,exact:true}).click();
  await p.evaluate(first=>{window.__spoken=[];window.__hold=first;},sentences(step.watchSay.en)[0]);await p.locator('.coach-actions button.big').click();
  await p.locator('.coach-text .say-now').waitFor();assert.equal(await p.locator('.coach-text .say-now').textContent(),sentences(step.watchSay.en)[0]+' ');
  const spoken=await p.evaluate(()=>window.__spoken.join(' '));assert.ok(!spoken.startsWith(T.en.safetyHeading)); // name check has no safety preface
  await p.evaluate(()=>{window.__hold='';window.__utterance.onend?.();});await p.locator('.why').waitFor();assert.equal(await p.locator('.why').textContent(),step.watchWhy.en);
  await p.locator('.coach-actions button.big').click();for(let i=4;i<11;i++)await p.locator('.coach-actions').getByRole('button',{name:T.en.next,exact:true}).click();
  const safety=LESSONS['qr-pay'].steps.find(s=>s.id==='scam-quiz');await p.evaluate(first=>{window.__spoken=[];window.__hold=first;},sentences(safety.watchSay.en)[0]);await p.locator('.coach-actions button.big').click();await p.locator('.coach-text .say-now').waitFor();
  assert.equal(await p.locator('.coach-text .say-now').textContent(),sentences(safety.watchSay.en)[0]+' ');assert.ok((await p.evaluate(()=>window.__spoken.join(' '))).startsWith(`${T.en.safetyHeading} ${T.en.practiceSafetySub}`));
  await p.evaluate(()=>{window.__hold='';window.__utterance.onend?.();});await p.locator('.why').waitFor();assert.equal(await p.locator('.why').textContent(),safety.watchWhy.en);
  await p.locator('.coach-actions button.big').click();for(let i=11;i<13;i++)await p.locator('.coach-actions').getByRole('button',{name:T.en.next,exact:true}).click();await p.locator('.done-sub').waitFor();await p.waitForFunction(()=>window.__spoken.join(' ').includes('You watched the whole demonstration.'));
  assert.ok(!(await p.evaluate(()=>window.__spoken.join(' '))).includes(LESSONS['qr-pay'].closing.en));
  await c.close();console.log('PASS mocked Watch speech, safety preface, sentence highlighting, neutral quiz explanations and watched closing');
}finally{await browser.close();}
