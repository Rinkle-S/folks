// End-to-end regression checks for the scene rollout. All external calls and audio are mocked.
import { load } from './test-loader.mjs';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const { LESSONS } = await load('lib/lessons.js');
const { T } = await load('lib/i18n.js');
const { buildCards } = await load('lib/followCards.js');
const { REMOVED_LESSONS } = await load('lib/hidden.js');
const { personalise } = await load('lib/persona.js');
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const base = process.env.TEST_URL || 'http://127.0.0.1:3110';
const output = process.env.LAYOUT_SCREENSHOTS;
if (output) await mkdir(output, { recursive: true });
assert.equal(Object.keys(LESSONS).length, 15);
for (const id of REMOVED_LESSONS) assert.ok(!LESSONS[id]);
for (const l of Object.values(LESSONS)) for (const lang of ['en','hi','ml']) {
  assert.equal(l.scene.say[lang].split('\n\n').length, 3, l.id);
  assert.ok(l.closing[lang]);
}
assert.ok(LESSONS['send-money'].steps.find(s => s.id === 'share-send'));
assert.ok(!LESSONS['send-money'].steps.find(s => s.id === 'scam-quiz'));
assert.equal(LESSONS['recharge'].steps.find(s => s.id === 'sms-scam').screen, 'practice-sms');
assert.ok(LESSONS['gd-gpay-balance'].steps.find(s => s.kind === 'input' && s.anyDigits));
assert.ok(!buildCards(LESSONS['gd-gpay-balance'],'en').some(c => c.text.includes('any 4')));
const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE });
try {
  // Watch must finish unaided, including input and quiz steps. Speed up pacing, not application logic.
  for (const lang of (process.env.SKIP_AUTOPLAY ? [] : ['en','hi','ml'])) {
    globalThis.localStorage = { getItem: k => k === 'folks_lang' ? lang : null };
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await context.addInitScript(lang => {
      localStorage.setItem('folks_lang',lang); localStorage.setItem('folks_mute_v2','1');
      const timer = window.setTimeout;
      window.setTimeout = (fn, ms, ...args) => timer(fn, [900,1400,1800,1500].includes(ms) ? 25 : ms, ...args);
      window.speechSynthesis.speak = () => { throw Error('Audio must remain mocked'); };
    }, lang);
    await context.route('**/api/**', r => r.fulfill({ json: { ok:true, stored:true, enabled:false } }));
    const page = await context.newPage(); const errors=[]; page.on('pageerror', e => errors.push(e.message));
    for (const l of Object.values(LESSONS)) {
      await page.goto(`${base}/lesson/${l.id}?mode=watch`);
      await page.evaluate(() => {
        window.__seen = [];
        const record = () => { const text = document.querySelector('.coach-text')?.textContent.trim(); if (text) window.__seen.push(text); };
        record(); new MutationObserver(record).observe(document.body,{ childList:true,subtree:true,characterData:true });
      });
      await page.locator('.scene-body .btn.primary').click();
      await page.locator('.done-title').waitFor({ timeout: 20000 });
      const seen = await page.evaluate(() => window.__seen);
      for (const step of l.steps.slice(1)) assert.ok(seen.includes(personalise(step.watchSay[lang])), `Watch missed ${lang} ${l.id} ${step.id}`);
      console.log(`PASS automatic Watch ${lang} ${l.id}`);
    }
    assert.deepEqual(errors,[]); await context.close();
  }
  for (const width of [320,390,1366]) {
    const context = await browser.newContext({ viewport: { width, height: width < 720 ? 700 : 900 } });
    await context.addInitScript(() => {
      localStorage.setItem('folks_lang','en');localStorage.setItem('folks_mute_v2','1');localStorage.setItem('folks_onboarded','1');
      window.__spoken=[]; window.__hold=false;
      window.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};
      speechSynthesis.getVoices=()=>[];speechSynthesis.cancel=()=>{};speechSynthesis.resume=()=>{};
      speechSynthesis.speak=u=>{if(u.text.trim())window.__spoken.push(u.text);setTimeout(()=>u.onend?.(),0);};
    });
    await context.route('**/api/**',r=>r.fulfill({json:{ok:true,stored:true,enabled:false}}));
    const page=await context.newPage();
    // Every scene must fit the viewport width, and lead to the independent three-choice screen.
    for (const l of Object.values(LESSONS)) {
      await page.goto(`${base}/lesson/${l.id}`);await page.locator('.scene-copy').waitFor();
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`scene overflow ${l.id} ${width}`);
      assert.ok(await page.locator('.scene-art').evaluate(e=>getComputedStyle(e).backgroundImage.includes('scene-atlas')));
      await page.locator('.scene-body .btn.primary').click();await page.locator('.mode-card').first().waitFor();
      assert.equal(await page.locator('.mode-card').count(),3);assert.equal(await page.locator('.screen').count(),0);
      if(output && l.id==='send-money')await page.screenshot({path:`${output}/mode-choice-${width}.png`,fullPage:true});
    }
    // A removed deep link should offer a safe route home and discard only its stale resume.
    for(const id of REMOVED_LESSONS){
      await page.goto(`${base}/lesson/${id}`);await page.getByRole('link',{name:T.en.home,exact:true}).waitFor();
      await page.evaluate(id=>{localStorage.setItem('folks_resume',JSON.stringify({id,idx:3,at:Date.now()}));localStorage.setItem('folks_done',JSON.stringify(['qr-pay',id]));},id);
      await page.goto(base);await page.waitForTimeout(150);
      assert.ok(!(await page.evaluate(()=>localStorage.getItem('folks_resume'))));
      assert.ok((await page.evaluate(()=>localStorage.getItem('folks_done'))).includes('qr-pay'));
    }
    // Inspect the new and revised screens at their actual lesson positions.
    for(const [id,stepId] of [['send-money','share-recipient'],['send-money','share-send'],['send-money','mistake-scam'],['recharge','pick-plan'],['recharge','pin'],['recharge','sms-scam'],['gd-gpay-balance','s2-0'],['gd-gpay-balance','s2-1'],['gd-gpay-balance','careful']]){
      const lesson=LESSONS[id],idx=lesson.steps.findIndex(s=>s.id===stepId);
      await page.evaluate(({id,idx})=>localStorage.setItem('folks_resume',JSON.stringify({id,idx,at:Date.now()})),{id,idx});
      await page.goto(`${base}/lesson/${id}?resume=1`);await page.locator('.coach').waitFor();
      await page.waitForTimeout(250);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${id} ${stepId} ${width} overflow`);
      assert.ok(await page.evaluate(()=>document.querySelector('.screen').getBoundingClientRect().bottom<=document.querySelector('.coach').getBoundingClientRect().top+1),`${id} ${stepId} overlaps instructions at ${width}`);
      assert.ok(await page.locator('.coach').evaluate(e=>e.scrollHeight<=e.clientHeight+1),`${id} ${stepId} traps its instructions in a scroll sliver at ${width}`);
      if(stepId==='pin'||stepId==='s2-0'){
        assert.equal(await page.locator('.pin-warn').count(),1);
        assert.equal(await page.locator('.tap-bubble').count(),0);
        assert.ok(await page.locator('.pin-key-hint').evaluate(e=>{const r=e.getBoundingClientRect(),w=document.querySelector('.pin-warn').getBoundingClientRect(),k=document.querySelector('.keypad').getBoundingClientRect();return r.top>=w.bottom&&r.bottom<=k.top+1;}));
        assert.ok(await page.locator('.keypad').evaluate(e=>{const k=e.getBoundingClientRect(),a=e.closest('.app').getBoundingClientRect();return k.bottom<=a.bottom+1;}),`PIN keypad clipped ${width}`);
      }
      if(stepId==='share-send')assert.ok((await page.locator('.receipt-preview').textContent()).includes('₹500'));
      if(stepId==='share-recipient')assert.ok((await page.locator('.extras-recipient').textContent()).includes(lesson.payee.sub));
      if(output) await page.screenshot({path:`${output}/${id}-${stepId}-${width}.png`,fullPage:true});
    }
    // Help respects mute; replay restores original copy. No additional control is required.
    await page.evaluate(()=>{localStorage.setItem('folks_resume',JSON.stringify({id:'recharge',idx:4,at:Date.now()}));});
    await page.goto(`${base}/lesson/recharge?resume=1`);await page.locator('.coach').waitFor();
    const original=await page.locator('.coach-text').textContent();
    await page.locator('.coach-actions button').last().click();
    assert.equal(await page.locator('.coach-text').textContent(),LESSONS.recharge.steps[4].hint.en);
    assert.equal(await page.evaluate(()=>window.__spoken.length),0);
    await page.locator('.coach-actions button').first().click();
    assert.equal(await page.locator('.coach-text').textContent(),original);
    await page.evaluate(()=>localStorage.setItem('folks_mute_v2','0'));
    await page.locator('.coach-actions button').last().click();
    await page.waitForFunction(()=>window.__spoken.join(' ').includes('Real plans and prices'));
    await context.close(); console.log(`PASS scene, removal, Help and screen checks ${width}`);
  }
}finally{await browser.close();}
