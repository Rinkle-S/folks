// No cloud audio, real microphone, transfers, native printing/sharing or production event writes.
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {mkdir,writeFile} from 'node:fs/promises';
import {load} from './test-loader.mjs';
const {LESSONS}=await load('lib/lessons.js'),{T}=await load('lib/i18n.js');
const {speechTexts}=await load('lib/speechText.js'),{textId}=await load('lib/hash.js');
const {buildCards}=await load('lib/followCards.js'),{idsForApp,entriesFor}=await load('lib/printable.js');
const {VOICE_MESSAGES}=await load('lib/voiceMessages.js');
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const base=process.env.TEST_URL||'http://127.0.0.1:3170',out=process.env.LAYOUT_SCREENSHOTS;
if(out)await mkdir(out,{recursive:true});
for(const l of Object.values(LESSONS))for(const lang of ['en','hi','ml']){
 for(const text of [l.scene.say[lang],l.closing[lang],l.watchClosing[lang],...l.steps.slice(1).flatMap(s=>[s.say[lang],s.watchSay[lang],s.hint?.[lang],...s.options?.map(o=>o.why[lang])||[]]),...buildCards(l,lang).map(c=>c.text)].filter(Boolean))assert.ok(speechTexts().has(textId(text)),`Speech registration: ${l.id} ${lang} ${text}`);
 for(const s of l.steps.filter(s=>s.safety))assert.ok(!/^One more thing|^Be careful\./i.test(s.say.en));
}
for(const app of new Set(Object.values(LESSONS).map(l=>l.app))){const ids=idsForApp(app);assert.deepEqual(ids,Object.values(LESSONS).filter(l=>l.app===app).map(l=>l.id));for(const lang of ['en','hi','ml'])assert.equal(entriesFor(ids,lang).length,ids.length);}
assert.ok(!LESSONS['yono-balance'].steps.some(s=>s.id==='balance'),'Do not teach an invented extra balance button');
assert.equal(LESSONS['yono-balance'].steps.find(s=>s.id==='mpin').expected.length,6);
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE});
async function setup(lang,width=390,height=844,{voices=['en-IN','hi-IN','ml-IN'],muted=true}={}){
 const c=await browser.newContext({viewport:{width,height}});
 await c.addInitScript(({lang,voices,muted})=>{
  for(const[k,v]of Object.entries({folks_lang:lang,folks_onboarded:'1',folks_mute_v2:muted?'1':'0'}))localStorage.setItem(k,v);
  window.__voices=voices.map(lang=>({lang,name:lang+' test voice',localService:true}));window.__spoken=[];window.__copies=[];window.__prints=[];window.__mic=[];window.__speechError=null;
  SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};speechSynthesis.getVoices=()=>window.__voices;speechSynthesis.cancel=()=>{};speechSynthesis.resume=()=>{};
  speechSynthesis.speak=u=>{if(!u.text.trim())return;window.__spoken.push({text:u.text,lang:u.lang,voice:u.voice?.lang,rate:u.rate});setTimeout(()=>window.__speechError?u.onerror?.({error:window.__speechError}):u.onend?.(),0);};
  window.Audio=class{play(){return Promise.resolve()}pause(){}load(){}addEventListener(){}removeEventListener(){}};
  window.print=()=>window.__prints.push(document.querySelector('.print-root[data-print-active]')?.textContent);
  Object.defineProperty(navigator,'clipboard',{value:{writeText:async t=>window.__copies.push(t)},configurable:true});
  Object.defineProperty(navigator,'share',{value:undefined,configurable:true});
  window.SpeechRecognition=class{start(){window.__mic.push(this.lang);setTimeout(()=>{this.onerror?.({error:'language-not-supported'});this.onend?.()},0)}abort(){}stop(){}};
  const timer=window.setTimeout;window.setTimeout=(fn,ms,...a)=>timer(fn,ms===450?1:ms,...a);
 },{lang,voices,muted});
 await c.route('**/api/**',r=>r.fulfill({json:{ok:true,stored:true,enabled:false}}));const p=await c.newPage();p.on('pageerror',e=>{throw e;});return[c,p];
}
async function audit(p){assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'page has no horizontal overflow');assert.deepEqual(await p.locator('.yono').evaluate(root=>{const bad=[];for(const b of root.querySelectorAll('button')){const r=b.getBoundingClientRect();if(r.height<55.5||r.width<35)bad.push(`${b.textContent||b.ariaLabel}: small target`);if(b.scrollWidth>b.clientWidth+1)bad.push('clipped control');}return bad;}),[]);}
async function shot(p,name){if(out)await p.screenshot({path:`${out}/${name}.png`,fullPage:true});}
try{
 if(!process.env.VOICE_ONLY)for(const lang of ['en','hi','ml'])for(const[width,height]of [[320,568],[360,800],[393,852],[390,844],[1366,900]]){
  const[c,p]=await setup(lang,width,height);await p.goto(`${base}/lesson/yono-balance?mode=practice`);await p.locator('.scene-body > .primary').click();
  await p.locator('[data-t="app-yono"]').click();await p.locator('[data-t="login-mpin"]').waitFor();await audit(p);if(width===393)await shot(p,`${lang}-yono-welcome`);
  await p.locator('[data-t="login-mpin"]').click();for(let i=0;i<6;i++)await p.locator('.yono [data-key="1"]').click();
  await p.locator('[data-t="tile-accounts"]').waitFor();await p.waitForFunction(()=>{const b=document.querySelector('[data-t="tile-accounts"]'),nav=document.querySelector('.yono-nav');return b&&nav&&b.getBoundingClientRect().bottom<=nav.getBoundingClientRect().top+1;});await p.evaluate(()=>document.fonts.ready);await audit(p);const eye=p.locator('.yono-card-label button');await eye.click();assert.ok((await p.locator('.yono-amount').textContent()).includes('24,350'));await eye.click();assert.ok((await p.locator('.yono-amount').textContent()).includes('XXXX'));await p.locator('.coach-actions button').last().click();if(width===393)await shot(p,`${lang}-yono-home`);
  await p.locator('[data-t="tile-accounts"]').click();await p.locator('.yono-accounts-header').waitFor();await audit(p);assert.ok((await p.locator('.yono-account-total').textContent()).includes('24,350'));const number=p.locator('.yono-savings-row button');await number.click();assert.equal(await p.locator('.yono-account-number').textContent(),'000000005234');await number.click();assert.equal(await p.locator('.yono-account-number').textContent(),'XXXXXX5234');if(width===393)await shot(p,`${lang}-yono-accounts`);
  await p.locator('.coach > .primary').click();await p.locator('.opt').last().click();await p.locator('.options > .primary').click();await p.locator('.tips-print .print-open').click();assert.equal(await p.locator('.print-root[data-print-active] .print-step').count(),buildCards(LESSONS['yono-balance'],lang).filter(c=>!c.tip).length);assert.ok(!(await p.evaluate(()=>JSON.stringify(localStorage))).includes('111111'));
  console.log(`PASS YONO exact controls, full printing and layout ${lang} ${width}x${height}`);await c.close();
 }
 for(const lang of ['en','hi','ml']){
  const code=`${lang}-IN`,[c,p]=await setup(lang,390,844,{voices:['en-IN'],muted:false});await p.goto(`${base}/lesson/qr-pay?mode=practice`);
  if(lang!=='en'){
   await p.locator('.voice-notice').waitFor();assert.equal(await p.evaluate(()=>window.__spoken.length),0,'Never substitute an English voice');assert.ok((await p.locator('.voice-notice').textContent()).includes(VOICE_MESSAGES.missing[lang]));
   await p.locator('.voice-notice a').click();await p.locator('#voice').waitFor();assert.equal(await p.locator('#voice details').count(),4);
   await p.goto(`${base}/lesson/qr-pay?mode=practice`);await p.locator('.voice-notice').waitFor();
   await p.evaluate(code=>{window.__voices.push({lang:code,name:code+' installed',localService:true});speechSynthesis.dispatchEvent(new Event('voiceschanged'));},code);await p.locator('.scene-listen').click();
  }
  await p.waitForFunction(code=>window.__spoken.some(s=>s.lang===code),code);assert.ok((await p.evaluate(()=>window.__spoken)).every(s=>s.voice===s.lang));
  await p.locator('.scene-body > .primary').click();await p.locator('.coach').waitFor();const original=LESSONS['qr-pay'].steps[1].say[lang],hint=LESSONS['qr-pay'].steps[1].hint[lang];await p.waitForFunction(text=>window.__spoken.map(s=>s.text).join(' ').includes(text),original);
  await p.locator('.coach-actions button').last().click();await p.waitForFunction(text=>window.__spoken.map(s=>s.text).join(' ').includes(text),hint);
  await p.locator('.coach-actions button').first().click();assert.equal(await p.locator('.coach-text').textContent(),original);
  await p.evaluate(()=>window.__speechError='language-unavailable');await p.locator('.coach-actions button').first().click();await p.locator('.voice-notice').waitFor();
  await p.goto(base);await p.getByRole('button',{name:T[lang].tapToSpeak,exact:true}).click();await p.waitForFunction(()=>window.__mic.length>0);assert.deepEqual(await p.evaluate(()=>window.__mic),[code]);
  console.log(`PASS ${lang}: supported/missing voice, hint/replay, FAQ and recognition language`);await c.close();
 }
 const[watchContext,watchPage]=await setup('ml',390,844,{voices:['en-IN'],muted:false});await watchPage.goto(`${base}/lesson/qr-pay?mode=watch`);await watchPage.locator('.voice-notice').waitFor();await watchPage.locator('.scene-body > .primary').click();await watchPage.locator('.coach-actions .big').waitFor();assert.equal((await watchPage.locator('.coach-actions .big').textContent()).trim(),T.ml.play);const at=await watchPage.locator('.ptop').textContent();await watchPage.waitForTimeout(2500);assert.equal((await watchPage.locator('.coach-actions .big').textContent()).trim(),T.ml.play);assert.equal(await watchPage.locator('.ptop').textContent(),at);await watchContext.close();console.log('PASS Watch pauses when the chosen language cannot play');
 const[c,p]=await setup('ml',390,844,{voices:[],muted:false});await p.goto(`${base}/lesson/qr-pay?mode=practice`);await p.evaluate(()=>setTimeout(()=>{window.__voices=[{lang:'ml-IN',name:'delayed',localService:true}];speechSynthesis.dispatchEvent(new Event('voiceschanged'));},200));await p.waitForFunction(()=>window.__spoken.some(s=>s.voice==='ml-IN'));await c.close();console.log('PASS delayed voice-list initialization');
 const crawl=await browser.newContext();let previousImage;
 for(const id of Object.keys(LESSONS)){
  const r=await crawl.request.get(`${base}/lesson/${id}?lang=ml&from=Test`,{headers:{'User-Agent':'WhatsApp/2.25'}});assert.equal(r.status(),200);const html=await r.text();assert.ok(html.includes(LESSONS[id].title.en.replaceAll('&','&amp;'))||html.includes(LESSONS[id].title.en));const image=html.match(/property="og:image" content="([^"]+)"/)[1];assert.ok(new URL(image).pathname.includes(`/lesson/${id}/opengraph-image`));const img=await crawl.request.get(base+new URL(image).pathname);assert.equal(img.status(),200);const bytes=await img.body();assert.equal(bytes.readUInt32BE(16),1200);if(previousImage)assert.notDeepEqual(bytes,previousImage,'Lesson previews must differ');previousImage=bytes;if(out&&id==='yono-balance')await writeFile(`${out}/yono-share-preview.png`,bytes);
 }await crawl.close();console.log('PASS lesson-specific preview images for every active lesson');
}finally{await browser.close();}
