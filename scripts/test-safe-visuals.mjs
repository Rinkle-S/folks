// Three visual decisions: real browser UI, mocked audio and API writes; no real permissions or downloads.
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {mkdir} from 'node:fs/promises';
import {load} from './test-loader.mjs';
const {VISUAL_CASES,visualUi}=await load('lib/safeVisuals.js'),{T}=await load('lib/i18n.js');
const {speechTexts}=await load('lib/speechText.js'),{textId}=await load('lib/hash.js');
for(const c of VISUAL_CASES)for(const lang of ['en','hi','ml'])for(const str of [c.context[lang],c.tip[lang],...c.choices.map(a=>a.why[lang])])assert.ok(speechTexts().has(textId(str)));
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const base=process.env.TEST_URL||'http://127.0.0.1:3170',out=process.env.LAYOUT_SCREENSHOTS;
if(out)await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE});
async function setup(lang,width=393,height=852,voice=false){
 const c=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});await c.addInitScript(({lang,voice})=>{
 localStorage.setItem('folks_lang',lang);localStorage.setItem('folks_onboarded','1');localStorage.setItem('folks_mute_v2',voice?'0':'1');
 window.__spoken=[];window.__events=[];window.__permissionRequests=0;
 const orig=window.fetch;window.fetch=(url,opt)=>{if(String(url).includes('/api/event')&&opt?.body)window.__events.push(JSON.parse(opt.body));return orig(url,opt);};
 window.Audio=class{play(){return Promise.resolve()}pause(){}};window.print=()=>{};
 window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
 speechSynthesis.getVoices=()=>['en-IN','hi-IN','ml-IN'].map(lang=>({lang,name:lang+' test'}));speechSynthesis.cancel=()=>{};speechSynthesis.resume=()=>{};speechSynthesis.speak=u=>{if(u.text.trim())window.__spoken.push({text:u.text,lang:u.lang});setTimeout(()=>u.onend?.(),15);};
 navigator.geolocation.getCurrentPosition=()=>window.__permissionRequests++;
 },{lang,voice});await c.route('**/api/**',r=>r.fulfill({json:{ok:true,stored:true,enabled:false}}));const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));return{c,p,errors};
}
async function audit(p){await p.locator('.sv-shell').waitFor();await p.evaluate(()=>document.fonts.ready);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal page overflow');assert.deepEqual(await p.evaluate(()=>{const bad=[],shell=document.querySelector('.sv-shell').getBoundingClientRect(),nav=document.querySelector('.bottomnav').getBoundingClientRect(),qr=document.querySelector('.phone-app');if(shell.width>480.5)bad.push('Activity must use the standard 480px shell');if(innerWidth>=720&&(Math.abs(nav.left-shell.left)>1||Math.abs(nav.width-shell.width)>1))bad.push('Bottom nav must align with the activity shell');if(qr&&getComputedStyle(qr).display!=='none'&&qr.getBoundingClientRect().left-shell.right<32)bad.push('Desktop QR must stay outside the activity with a clear gap');return bad;}),[]);assert.deepEqual(await p.locator('.sv-main').evaluate(root=>{const bad=[];for(const e of root.querySelectorAll('button,a')){const r=e.getBoundingClientRect();if(!r.width||!r.height)continue;if(r.height<55.5)bad.push('small target '+e.textContent);if(e.scrollWidth>e.clientWidth+1)bad.push('clipped control '+e.textContent);}return bad;}),[]);assert.equal(await p.locator('.sv-phone a, .sv-phone input, .sv-phone iframe').count(),0);}
try{
for(const lang of ['en','hi','ml'])for(const [width,height]of [[320,568],[360,800],[393,852],[844,390],[1366,900]]){
 const {c,p,errors}=await setup(lang,width,height);const u=visualUi(lang);await p.goto(base+'/scams');await p.locator('.sv-entry').click();await audit(p);await p.locator('.sv-intro .primary').click();
 for(const [at,id]of ['deny','update','link'].entries()){
 await p.locator('.sv-phone').waitFor();await audit(p);assert.equal(await p.locator('.sv-position [role=progressbar]').getAttribute('aria-valuenow'),String(at+1));
 if(at===0){await p.locator('.sv-accuracy button').last().click();assert.equal(await p.locator('.sv-accuracy button').last().getAttribute('aria-pressed'),'true');}
 if(out&&[320,393,1366].includes(width))await p.screenshot({path:`${out}/${lang}-${width}-${VISUAL_CASES[at].id}.png`,fullPage:true});
 await p.locator(`[data-choice="${id}"]`).click();await p.locator('.sv-feedback').waitFor();assert.equal(await p.locator('.sv-feedback').evaluate(e=>e===document.activeElement),true);assert.equal(await p.locator('.sv-feedback.neutral').count(),at===0?1:0);assert.equal(await p.locator('.sv-feedback.wrong').count(),at>0?1:0);assert.ok((await p.locator('.sv-phone button').evaluateAll(es=>es.every(e=>e.disabled))));await audit(p);
 if(at===2){await p.locator('.sv-check-tracking').click();assert.equal(await p.locator('.sv-tracking-note').textContent(),u.checkNote+' ');}
 if(out&&width===393)await p.screenshot({path:`${out}/${lang}-${VISUAL_CASES[at].id}-feedback.png`,fullPage:true});await p.locator('.sv-feedback .primary').click();
 }
 await p.locator('.sv-complete').waitFor();assert.equal(await p.locator('.sv-complete li').count(),3);assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('folks_safe_visual'))),VISUAL_CASES.map(c=>c.id));assert.equal(await p.evaluate(()=>window.__permissionRequests),0);assert.deepEqual(errors,[]);
 const events=await p.evaluate(()=>window.__events);assert.equal(events.filter(e=>e.type==='safe_visual_answer').length,3);assert.equal(events.filter(e=>e.type==='safe_visual_done').length,1);
 await p.locator('.sv-complete a.primary').click();await p.locator('.sv-entry').waitFor();assert.ok((await p.locator('.sv-entry').textContent()).includes(u.completed));assert.equal(await p.locator('.ss-home > .ss-bars').getAttribute('aria-valuenow'),'0','Reading progress stays separate');
 console.log(`PASS visual flow ${lang} ${width}x${height}: layout, neutral/wrong feedback, completion, navigation, no device action`);await c.close();
}
for(const lang of ['en','hi','ml']){
 const {c,p}=await setup(lang);await p.goto(base+'/scams/practice');
 for(const [at,scenario]of VISUAL_CASES.entries())for(const choice of scenario.choices){
 await p.evaluate(done=>localStorage.setItem('folks_safe_visual',JSON.stringify(done)),VISUAL_CASES.slice(0,at).map(c=>c.id));await p.reload();await p.locator('.sv-intro .primary').click();await p.locator(`[data-choice="${choice.id}"]`).click();await p.locator('.sv-feedback').waitFor();assert.equal(await p.locator('.sv-feedback').getAttribute('class'),`sv-feedback ${choice.kind}`);assert.ok((await p.locator('.sv-feedback').textContent()).includes(choice.why[lang]));}
 await c.close();console.log(`PASS every screen choice and resume ${lang}`);
 const voice=await setup(lang,393,852,true);await voice.p.goto(base+'/scams/practice');await voice.p.waitForFunction(()=>window.__spoken.length>2);assert.ok(await voice.p.locator('.say-now').count()<=1);await voice.p.locator('.sv-intro .primary').click();await voice.p.waitForFunction(text=>window.__spoken.map(s=>s.text).join(' ').includes(text),VISUAL_CASES[0].context[lang]);await voice.p.locator('[data-choice="once"]').click();await voice.p.waitForFunction(text=>window.__spoken.map(s=>s.text).join(' ').includes(text),VISUAL_CASES[0].choices[1].why[lang]);assert.ok((await voice.p.evaluate(()=>window.__spoken)).every(s=>s.lang===lang+'-IN'));await voice.c.close();console.log(`PASS narration and feedback language ${lang} (mocked voices)`);
}
const missing=await setup('ml',320,700,true);await missing.c.addInitScript(()=>{speechSynthesis.getVoices=()=>[{lang:'en-IN',name:'English only'}];});await missing.p.goto(base+'/scams/practice');await missing.p.locator('.voice-notice').waitFor();assert.equal(await missing.p.evaluate(()=>window.__spoken.length),0);await missing.p.locator('.sv-intro .primary').click();await missing.p.locator('[data-choice="deny"]').click();await missing.p.locator('.sv-feedback.neutral').waitFor();await missing.c.close();console.log('PASS missing Malayalam voice notice, no English fallback and working manual choices');
const crawl=await browser.newContext();const r=await crawl.request.get(base+'/scams/practice',{headers:{'user-agent':'WhatsApp/2.25'}});assert.equal(r.status(),200);assert.ok((await r.text()).includes('og:image'));await crawl.close();
}finally{await browser.close();}
