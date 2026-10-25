// Screenshot review regression: all audio/API writes and native print dialogs are mocked.
import { load } from './test-loader.mjs';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { mkdir } from 'node:fs/promises';
const { LESSONS } = await load('lib/lessons.js');
const { T } = await load('lib/i18n.js');
const { SAFE_LESSONS, SAFE_UI } = await load('lib/safeLessons.js');
const { getVoiceRate, setVoiceRate } = await load('lib/voiceSpeed.js');
const values = new Map();globalThis.window={localStorage:{getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)}};
assert.equal(getVoiceRate(),.8);setVoiceRate(.6);assert.equal(getVoiceRate(),.6);setVoiceRate(99);assert.equal(getVoiceRate(),.8);delete globalThis.window;
assert.equal(T.en.practiceSafetySub,'This call is pretend.');
assert.ok(!Object.values(LESSONS).some(l=>l.steps.at(-1).id==='done'));
assert.equal(LESSONS['video-call'].steps.find(s=>s.id==='ringing').autoAdvanceMs,5000);
assert.equal(LESSONS['gd-uber-cancel'].steps.find(s=>s.id==='s2').p.reasonIndex,5);
assert.ok(LESSONS['gd-ride-driver-check'].steps.find(s=>s.id==='careful').say.en.includes('contact the booked driver'));
const {chromium,devices}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const base=process.env.TEST_URL||'http://127.0.0.1:3140';
const output=process.env.LAYOUT_SCREENSHOTS;
if(output)await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE});
async function setup(lang='en',width=390,height=844,voice=false,iphone=false,server=false){
  const context=await browser.newContext({...iphone?devices['iPhone 13']:{viewport:{width,height}}});
  await context.addInitScript(({lang,voice})=>{
    localStorage.setItem('folks_lang',lang);localStorage.setItem('folks_mute_v2',voice?'0':'1');localStorage.setItem('folks_onboarded','1');
    window.__spoken=[];window.__audioRates=[];window.__hold=false;window.__ringStarts=0;window.__ringStops=0;window.__prints=[];
    window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
    speechSynthesis.getVoices=()=>[];speechSynthesis.resume=()=>{};speechSynthesis.cancel=()=>{};
    speechSynthesis.speak=u=>{if(u.text.trim()){window.__spoken.push({text:u.text,rate:u.rate});window.__utterance=u;}if(!window.__hold)setTimeout(()=>u.onend?.(),0);};
    window.Audio=class{paused=true;playbackRate=1;load(){}play(){this.paused=false;if(this.src?.startsWith('/api/tts')){window.__audioRates.push(this.playbackRate);setTimeout(()=>this.onended?.(),0);}return Promise.resolve();}pause(){this.paused=true;}addEventListener(){}removeEventListener(){}};
    window.AudioContext=class{state='running';currentTime=0;destination={};resume(){return Promise.resolve();}createOscillator(){return{frequency:{},connect(){},start(){window.__ringStarts++;},stop(){window.__ringStops++;},disconnect(){}};}createGain(){return{gain:{setValueAtTime(){},linearRampToValueAtTime(){}},connect(){},disconnect(){}};}};
    window.SpeechRecognition=class{};
    let click=false;document.addEventListener('click',()=>{click=true;setTimeout(()=>click=false,0);},true);
    window.print=()=>window.__prints.push({gesture:click,active:document.querySelectorAll('.print-root[data-print-active]').length,text:document.querySelector('.print-root[data-print-active]')?.textContent});
  },{lang,voice});
  await context.route('**/api/**',r=>r.fulfill({json:{enabled:server&&r.request().url().includes('/api/tts?probe'),ok:true,stored:true}}));
  return context;
}
async function resume(page,id,stepId){
  const idx=LESSONS[id].steps.findIndex(s=>s.id===stepId);
  await page.goto(base);await page.evaluate(({id,idx})=>localStorage.setItem('folks_resume',JSON.stringify({id,idx,at:Date.now()})),{id,idx});
  await page.goto(`${base}/lesson/${id}?resume=1`);await page.locator('.coach').waitFor();
}
try{
  if (!process.env.REVIEW_TAIL_ONLY) {
  for(const lang of ['en','hi','ml'])for(const [width,height] of [[320,700],[390,844],[844,390],[1366,900]]){
    const c=await setup(lang,width,height),p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
    await resume(p,'video-call','video-icon');
    const circles=await p.locator('.wa-rs').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return Math.abs(r.width-r.height)<1;}));assert.ok(circles.every(Boolean),'Rupee icons must be circular');
    for(const [id,key] of [['qr-pay','check-name'],['qr-pay','scam-quiz'],['send-money','mistake-scam'],['video-call','digital-arrest'],['yono-balance','mpin-call']]){
      await resume(p,id,key);await p.evaluate(()=>document.fonts.ready);
      const s=LESSONS[id].steps.find(s=>s.id===key);
      if(s.safety){assert.equal(await p.locator('.safety-heading p').textContent(),s.safety.sub?.[lang]||T[lang].practiceSafetySub);assert.ok(!(await p.locator('.player').innerText()).includes(T[lang].scamTileSub));assert.equal(await p.locator('.practice-tag').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(43, 127, 114)');}
      assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      assert.ok(await p.locator('.options').evaluate(e=>parseFloat(getComputedStyle(e).gap)>=12));
      const buttons=await p.locator('.opt').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.height>=56&&parseFloat(s.paddingTop)>=12&&parseFloat(s.paddingLeft)>=16;}));assert.ok(buttons.every(Boolean));
      assert.ok(await p.evaluate(()=>document.querySelector('.screen').getBoundingClientRect().bottom<=document.querySelector('.coach').getBoundingClientRect().top+1),'Phone must not cover question');
      if(output&&[320,1366].includes(width))await p.screenshot({path:`${output}/${lang}-${width}-${id}-${key}.png`,fullPage:true});
    }
    await p.getByRole('button',{name:LESSONS['yono-balance'].steps.at(-1).options.find(o=>o.correct).text[lang],exact:true}).click();await p.locator('.options .btn.primary').click();
    await p.locator('.completed-lesson').waitFor();assert.equal(await p.locator('.completed-lesson b').textContent(),LESSONS['yono-balance'].title[lang]);
    assert.equal(await p.locator('.done-title').count(),1);assert.equal(await p.locator('.end-tips li').count(),3);
    assert.equal(await p.locator('.completion-tips, .completion-feedback, .acts').count(),0);
    if(output)await p.screenshot({path:`${output}/${lang}-${width}-completed.png`,fullPage:true});
    await p.goto(`${base}/send?app=yono&lang=${lang}`);await p.locator('.send-back').waitFor();assert.equal(await p.locator('.send-back').getAttribute('href'),'/app/yono');
    await p.locator('.bottomnav a[href="/"]').click();await p.locator('.learn-home').waitFor();
    assert.deepEqual(errors,[]);console.log(`PASS tutorial layout ${lang} ${width}x${height}`);await c.close();
  }
  // Scene sentences are highlighted in every retained tutorial, and narration remains interruptible.
  for(const lang of ['en','hi','ml']){
    const c=await setup(lang,390,844,true),p=await c.newPage();await c.addInitScript(()=>{window.__hold=true;});
    for(const l of Object.values(LESSONS)){
      await p.goto(`${base}/lesson/${l.id}`);await p.locator('.scene-copy .say-now').waitFor();
      assert.equal(await p.locator('.scene-copy .say-now').count(),1);
      await p.evaluate(()=>window.__utterance.onend?.());
      await p.waitForFunction(()=>[...document.querySelectorAll('.scene-copy span')].findIndex(e=>e.classList.contains('say-now'))===1);
      await p.locator('.scene-body .btn.primary').click();await p.locator('.mode-card').first().waitFor();
    }
    console.log(`PASS scene sentence highlighting ${lang}: all 15 lessons`);await c.close();
  }
  // Real five-second timer, with no manual "picked up" action. Audio is a fake AudioContext.
  for(const voice of [false,true]){
    const c=await setup('en',390,844,voice),p=await c.newPage();await resume(p,'video-call','ringing');
    const start=Date.now();assert.equal(await p.locator('.coach > .btn.primary').count(),0);
    await p.waitForTimeout(4300);assert.equal(await p.locator('.wa-call:not(.live)').count(),1);
    await p.waitForFunction(()=>document.querySelector('.coach-text')?.textContent.includes('Rahul is on the call'));
    assert.ok(Date.now()-start>=4800);assert.ok(Date.now()-start<9000);
    assert.equal(await p.evaluate(()=>window.__ringStarts),voice?6:0);
    await resume(p,'video-call','ringing');await p.locator('.coach-actions button').nth(1).click();await p.waitForTimeout(5300);
    assert.ok((await p.locator('.coach-text').textContent()).includes('video camera'),'Previous step must cancel ringing timer');
    console.log(`PASS five-second transition, sound ${voice?'on':'off'}, cancellation`);await c.close();
  }
  }
  // Settings changes persist and affect subsequent phone utterances.
  const c=await setup('en',390,844,true),p=await c.newPage();await p.goto(base);await p.getByRole('button',{name:'Settings',exact:true}).click();
  await p.locator('.voice-speed select').selectOption('0.6');await p.locator('.settings > .btn.primary').click();
  await p.goto(`${base}/lesson/qr-pay`);await p.waitForFunction(()=>window.__spoken.some(s=>s.rate===.6));assert.equal(await p.evaluate(()=>localStorage.getItem('folks_voice_rate')),'0.6');
  await p.goto(`${base}/scams/learn/${SAFE_LESSONS[0].id}`);await p.getByRole('button',{name:SAFE_UI.en.next,exact:true}).waitFor();
  await p.getByRole('button',{name:SAFE_UI.en.next,exact:true}).click();await p.waitForTimeout(800);
  assert.ok(!(await p.evaluate(()=>window.__spoken.map(s=>s.text).join(' '))).includes('Page 2 of 3'));
  await p.getByRole('button',{name:SAFE_UI.en.next,exact:true}).click();await p.waitForTimeout(800);
  assert.ok(!(await p.evaluate(()=>window.__spoken.map(s=>s.text).join(' '))).includes('Page 3 of 3'));await c.close();
  const server=await setup('en',390,844,true,false,true),sp=await server.newPage();await server.addInitScript(()=>localStorage.setItem('folks_voice_rate','0.6'));
  await sp.goto(`${base}/lesson/qr-pay`);await sp.waitForFunction(()=>window.__audioRates.some(rate=>Math.abs(rate-.75)<.001));await server.close();console.log('PASS voice rate for browser and server audio, Stay safe narration excludes page counts');
  // iPhone-shaped emulation verifies synchronous print invocation and actual print CSS, not the physical iOS dialog.
  for(const lang of ['en','hi','ml']){
    const c=await setup(lang,390,844,false,true),p=await c.newPage();await p.goto(`${base}/app/gpay`);await p.locator('.print-open').click();
    let job=await p.evaluate(()=>window.__prints.at(-1));assert.ok(job.gesture&&job.active===1&&job.text.includes('Nook'),JSON.stringify(job));
    await p.emulateMedia({media:'print'});assert.ok(await p.locator('.print-root[data-print-active]').isVisible());await p.emulateMedia({media:'screen'});
    await p.goto(`${base}/lesson/qr-pay?mode=practice`);await p.locator('.scene-body .btn.primary').click();await p.locator('.ptop-btn').first().click();
    job=await p.evaluate(()=>window.__prints.at(-1));assert.ok(job.gesture&&job.active===1&&job.text.length>200);
    await p.emulateMedia({media:'print'});assert.ok(await p.locator('.print-root[data-print-active] .print-step').count()>0);
    if(output)await p.pdf({path:`${output}/${lang}-lesson-handout.pdf`,format:'A4',printBackground:true});
    await p.emulateMedia({media:'screen'});assert.equal(await p.locator('.print-root').isVisible(),false);
    await p.goto(`${base}/a-page-that-does-not-exist`);await p.getByRole('link',{name:T[lang].home,exact:true}).click();await p.locator('.learn-home').waitFor();
    await c.close();console.log(`PASS print user gesture, handout media and exit navigation ${lang}`);
  }
}finally{await browser.close();}




