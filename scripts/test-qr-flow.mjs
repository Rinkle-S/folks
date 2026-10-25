// Targeted QR behavioural checks. Native speech/audio and API writes are mocked throughout.
import { load } from './test-loader.mjs';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const { LESSONS } = await load('lib/lessons.js');
const { T } = await load('lib/i18n.js');
const { handPosition } = await load('lib/handPosition.js');
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const qr = LESSONS['qr-pay'];
assert.equal(qr.steps.length - 1, 12);
assert.ok(qr.steps.find((s) => s.id === 'pin').anyDigits);
assert.notEqual(qr.steps.find((s) => s.id === 'scam-quiz'), LESSONS['send-money'].steps.find((s) => s.id === 'scam-quiz'));
assert.ok(Object.values(LESSONS).every(l => l.scene));
for (const l of Object.values(LESSONS).filter((l) => l.app === 'gpay')) assert.equal(l.steps.find((s) => s.id === 'open-app').say.en, qr.steps[1].say.en);
for (const box of [{ left:10,right:90,top:50,bottom:140 }, { left:260,right:310,top:50,bottom:100 }, { left:10,right:310,top:440,bottom:500 }]) {
  const hand=handPosition(box,320,520); assert.ok(hand);
  const r={left:hand.x-hand.size/2,right:hand.x+hand.size/2,top:hand.y-hand.size/2,bottom:hand.y+hand.size/2};
  assert.ok(r.left>=0&&r.right<=320&&r.top>=0&&r.bottom<=520);
  assert.ok(r.right<=box.left||r.left>=box.right||r.bottom<=box.top||r.top>=box.bottom);
}
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
const base=process.env.TEST_URL||'http://127.0.0.1:3110';
const output=process.env.LAYOUT_SCREENSHOTS;
if(output) await mkdir(output,{recursive:true});
const setup=async(lang,width,voice=false)=>{
  const context=await browser.newContext({viewport:{width,height:width<720?700:900}});
  await context.addInitScript(({lang,voice})=>{
    localStorage.setItem('folks_lang',lang);localStorage.setItem('folks_mute_v2',voice?'0':'1');
    window.__spoken=[];window.__cancelled=0;window.__holdSpeech=voice;
    window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
    if(window.speechSynthesis){speechSynthesis.getVoices=()=>[];speechSynthesis.resume=()=>{};speechSynthesis.cancel=()=>{window.__cancelled++;};speechSynthesis.speak=(u)=>{if(u.text.trim())window.__spoken.push(u.text);if(!window.__holdSpeech)setTimeout(()=>u.onend?.(),0);};}
    window.Audio=class{play(){return Promise.resolve();}pause(){}addEventListener(){}removeEventListener(){}};
    const timer=window.setTimeout;window.setTimeout=(fn,ms,...args)=>timer(fn,ms===450?1:ms,...args);
  },{lang,voice});
  await context.route('**/api/**',r=>r.fulfill({json:{enabled:false,ok:true,stored:true}}));
  return context;
};
try {
  for(const lang of ['en','hi','ml']) for(const width of [360,1366]) {
    const context=await setup(lang,width);const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/lesson/qr-pay');await page.locator('.scene-body').waitFor();
    assert.equal(await page.locator('.scene-copy p').count(),3);
    assert.equal(await page.locator('.progress small').count(),0);
    if(output)await page.screenshot({path:`${output}/${lang}-${width}-scene.png`,fullPage:true});
    await page.getByRole('button',{name:T[lang].sceneReady,exact:true}).click();await page.locator('.modes').waitFor();
    await page.locator('.mode-card').first().click();
    await page.getByText(T[lang].step(1,12),{exact:true}).waitFor();
    for(let i=1;i<qr.steps.length;i++){
      const step=qr.steps[i];
      await page.waitForFunction(text=>document.querySelector('.coach-text')?.textContent.trim()===text,step.say[lang]);
      assert.equal(await page.locator('.shop-board').count(),step.id==='check-name'?1:0);
      if(step.id==='check-name') {
        await page.locator('.g2-paying.ev-mark').waitFor();
        assert.ok(await page.locator('.g2-paying').evaluate(e=>{const r=e.getBoundingClientRect(),a=e.closest('.app').getBoundingClientRect();return r.top>=a.top&&r.bottom<=a.bottom;}), 'Shop name must remain visible for comparison');
      }
      if(['scam-quiz','decline'].includes(step.id)){
        assert.equal(await page.locator('.practice-tag').textContent(),T[lang].practiceSafetyBanner);
        assert.equal(await page.locator('.practice-tag').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(43, 127, 114)');
        assert.equal(await page.locator('.safety-heading').count(),step.id==='scam-quiz'?1:0);
        assert.equal(await page.locator('.g2-warn-t').evaluate(e=>getComputedStyle(e).color),'rgb(107, 67, 0)');
        assert.ok(!(await page.locator('.player').innerText()).toLowerCase().includes('scam'));
      }
      if(step.kind==='tap'){
        if(['open-app','arrow','decline'].includes(step.id)){
          await page.waitForTimeout(300);
          const ok=await page.evaluate(()=>{const h=document.querySelector('.target-hand'),t=document.querySelector('.hl'),s=document.querySelector('.screen');if(!h)return false;const a=h.getBoundingClientRect(),b=t.getBoundingClientRect(),r=s.getBoundingClientRect();return a.left>=r.left&&a.right<=r.right&&a.top>=r.top&&a.bottom<=r.bottom&&(a.right<=b.left||a.left>=b.right||a.bottom<=b.top||a.top>=b.bottom);});
          assert.ok(ok,`${lang} ${width} ${step.id}: hand overlaps/clips`);
        }
        await page.locator(`.screen [data-t="${step.target}"]`).first().click();
      } else if(step.kind==='input'){
        for(const key of step.anyDigits?'8642':step.expected)await page.locator(`.screen [data-key="${key}"]`).first().click();
      } else if(step.kind==='quiz'){
        await page.getByRole('button',{name:step.options.find(o=>!o.correct).text[lang],exact:true}).click();
        assert.equal(await page.locator('.opt.wrong').count(),1);assert.equal(await page.locator('.opt.right').count(),1);
        assert.ok((await page.locator('.opt.wrong').textContent()).includes('✕'));
        assert.ok((await page.locator('.opt.right').textContent()).includes('✓'));
        assert.equal(await page.locator('.options .why').textContent(),step.options.find(o=>!o.correct).why[lang]);
        if(output)await page.screenshot({path:`${output}/${lang}-${width}-${step.id}.png`,fullPage:true});
        await page.locator('.options .btn.primary').click();
      }
    }
    await page.locator('.done-title').waitFor();assert.equal(await page.locator('.done-sub').textContent(),T[lang].endTried);
    // Default modes still pass through the scene; Read links/defaults bypass it; resume stays direct.
    for(const mode of ['practice','watch','follow']){
      await page.evaluate(m=>localStorage.setItem('folks_mode',m),mode);await page.goto(base+'/lesson/qr-pay');
      await page.locator('.scene-body').waitFor();assert.equal(await page.locator('.coach').count(),0);
      await page.locator('.scene-body .btn.primary').click();await page.locator(mode==='follow'?'.read-list':mode==='watch'?'.screen.watching':'.screen').waitFor();
    }
    await page.goto(base+'/lesson/qr-pay?mode=follow');await page.locator('.scene-body .btn.primary').click();await page.locator('.read-list').waitFor();
    await page.evaluate(()=>localStorage.setItem('folks_resume',JSON.stringify({id:'qr-pay',idx:6,at:Date.now()})));await page.goto(base+'/lesson/qr-pay?resume=1');await page.locator('[data-t="next"]').first().waitFor();assert.equal(await page.locator('.scene-body').count(),0);
    await page.goto(base+'/lesson/send-money?mode=practice');await page.locator('.scene-body').waitFor();await page.locator('.scene-body .btn.primary').click();await page.locator('.coach').waitFor();
    assert.equal(errors.length,0,errors.join('\n'));console.log(`PASS QR ${lang} ${width}: scene/modes, wrong quizzes, safety, PIN, closing and hands`);await context.close();
  }
  // Record speech calls without producing audio. Hold scene narration to test immediate interruption.
  const c=await setup('en',390,true);const p=await c.newPage();await p.goto(base+'/lesson/qr-pay');await p.locator('.scene-body').waitFor();
  await p.waitForFunction(()=>window.__spoken.some(t=>t.includes("Let's pretend")));
  assert.equal(await p.locator('.coach').count(),0);
  const before=await p.evaluate(()=>window.__cancelled);
  await p.locator('.scene-body .btn.primary').click();await p.locator('.modes').waitFor();assert.ok(await p.evaluate(n=>window.__cancelled>n,before));
  await p.evaluate(()=>{window.__holdSpeech=false;});await p.locator('.mode-card').first().click();
  await p.locator('.coach-actions button').last().click();assert.equal(await p.locator('.coach-text').textContent(),qr.steps[1].hint.en);
  await p.locator('.coach-actions button').first().click();assert.equal(await p.locator('.coach-text').textContent(),qr.steps[1].say.en);
  await p.waitForFunction(()=>window.__spoken.some(t=>t.includes('Find Google Pay')));
  await c.addInitScript(()=>{window.__holdSpeech=false;});
  const safetyIndex=qr.steps.findIndex(s=>s.id==='scam-quiz');await p.evaluate(idx=>localStorage.setItem('folks_resume',JSON.stringify({id:'qr-pay',idx,at:Date.now()})),safetyIndex);
  await p.goto(base+'/lesson/qr-pay?resume=1');await p.locator('.safety-heading').waitFor();await p.waitForFunction(()=>window.__spoken.some(t=>t.includes('One more thing')));
  const calls=await p.evaluate(()=>window.__spoken.join(' '));assert.ok(calls.indexOf(T.en.safetyHeading)<calls.indexOf('One more thing'));assert.ok(calls.indexOf(T.en.practiceSafetySub)<calls.indexOf('One more thing'));
  console.log('PASS mocked speech sequencing: Ready interrupts scene, Help restores original, safety preface precedes question');await c.close();
} finally {await browser.close();}
