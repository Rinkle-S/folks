// Browser-only release checks. Never dials, plays audio, shares externally or writes production events.
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {mkdir} from 'node:fs/promises';
import {load} from './test-loader.mjs';
import QRCode from 'qrcode';
const {scamHelp}=await load('lib/scamHelp.js');
const {SAFE_LESSONS,SAFE_UI}=await load('lib/safeLessons.js');
const {THEMES}=await load('lib/themes.js');
const {T}=await load('lib/i18n.js');
const {LESSONS}=await load('lib/lessons.js');
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const base=process.env.TEST_URL||'http://127.0.0.1:3170',out=process.env.LAYOUT_SCREENSHOTS;
if(out)await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE});
async function setup(lang,width,height){
 const c=await browser.newContext({viewport:{width,height}});
 await c.addInitScript(lang=>{
  localStorage.setItem('folks_lang',lang);localStorage.setItem('folks_mute_v2','1');localStorage.setItem('folks_onboarded','1');
  window.__events=[];window.__shares=[];window.__copies=[];window.__prints=[];
  const original=window.fetch;window.fetch=(url,opt)=>{if(String(url).includes('/api/event')&&opt?.body)window.__events.push(JSON.parse(opt.body));return original(url,opt);};
  window.Audio=class{play(){return Promise.resolve()}pause(){}addEventListener(){}removeEventListener(){}};
  speechSynthesis.speak=()=>{};speechSynthesis.cancel=()=>{};
  Object.defineProperty(navigator,'share',{configurable:true,value:async d=>window.__shares.push(d)});
  Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async s=>window.__copies.push(s)}});
  window.print=()=>window.__prints.push(document.querySelector('.print-root[data-print-active]')?.textContent);
  document.addEventListener('click',e=>{if(e.target.closest?.('a[href^="tel:"]'))e.preventDefault();});
 },lang);
 await c.route('**/api/**',r=>r.fulfill({json:{ok:true,stored:true,enabled:false}}));
 const p=await c.newPage();p.on('pageerror',e=>{throw e;});return[c,p];
}
async function audit(p,selector){
 await p.evaluate(()=>document.fonts.ready);
 const errors=await p.locator(selector).evaluate(root=>{
  const errors=[];if(document.documentElement.scrollWidth>innerWidth)errors.push('horizontal page overflow');
  for(const e of root.querySelectorAll('a,button')){
   const r=e.getBoundingClientRect(),s=getComputedStyle(e);if(!r.height||s.display==='none')continue;
   if(r.height<55.5)errors.push(`small target: ${e.textContent} ${r.height}`);
   if(e.scrollWidth>e.clientWidth+2)errors.push(`clipped target: ${e.textContent}`);
  }
  const footer=root.querySelector('.scam-help-footer,.ss-foot'),scroller=root.querySelector('.scam-help-content,.ss-content');
  if(footer){const f=footer.getBoundingClientRect();if(f.bottom>innerHeight+1||f.top<0)errors.push('footer outside viewport');if(scroller&&scroller.getBoundingClientRect().bottom>f.top+1)errors.push('content behind footer');}
  for(const e of root.querySelectorAll('p,li,small,button,a')){
   if(!e.getBoundingClientRect().height||getComputedStyle(e).display==='none')continue;
   if(parseFloat(getComputedStyle(e).fontSize)<18)errors.push(`small text: ${e.textContent}`);
  }return errors;
 });assert.deepEqual(errors,[],selector);
}
async function shot(p,name){if(out)await p.screenshot({path:`${out}/${name}.png`,fullPage:true});}
try{
 if(!process.env.CHECKS_ONLY)for(const lang of (process.env.TEST_LANG?[process.env.TEST_LANG]:['en','hi','ml']))for(const [width,height]of (process.env.TEST_WIDTH?[[+process.env.TEST_WIDTH,+(process.env.TEST_HEIGHT||844)]]:[[320,568],[390,844],[844,390],[1366,900]])){
  const[c,p]=await setup(lang,width,height),u=scamHelp(lang);
  await p.goto(`${base}/scams/help?lang=${lang}&source=test`);await p.locator('.scam-help-content h1').waitFor();
  for(let step=1;step<=6;step++){
   assert.equal(await p.locator('.scam-help-content h1').textContent(),u.pages[step-1].title);
   assert.equal(await p.locator('.scam-help-progress .on').count(),step);
   await audit(p,'.scam-help');
   const call=p.locator('a[href="tel:1930"]');assert.equal(await call.count(),1);await call.click();
   if(out&&width===390)await shot(p,`${lang}-${step}-top`);
   await p.locator('.scam-help-content').evaluate(e=>e.scrollTop=e.scrollHeight);
   await p.locator('.scam-help-takeaway').evaluate(e=>{const s=e.closest('.scam-help-content'),r=e.getBoundingClientRect(),v=s.getBoundingClientRect();s.scrollTop+=r.height>v.height?r.bottom-v.bottom:r.top-v.top;});
   assert.ok(await p.locator('.scam-help-takeaway').evaluate(e=>{const r=e.getBoundingClientRect(),s=e.closest('.scam-help-content').getBoundingClientRect();return (r.height>s.height||r.top>=s.top-1)&&r.bottom<=s.bottom+1;}),`${lang} ${width} step ${step}: takeaway reachable: ${await p.locator('.scam-help-takeaway').evaluate(e=>{const a=e.getBoundingClientRect(),b=e.closest('.scam-help-content').getBoundingClientRect();return JSON.stringify({top:a.top,bottom:a.bottom,height:a.height,viewTop:b.top,viewBottom:b.bottom,viewHeight:b.height})})}`);
   if(out&&width===390)await shot(p,`${lang}-${step}-bottom`);
   if(step===6){
    await p.locator('.print-open').click();assert.ok((await p.evaluate(()=>window.__prints.at(-1))).includes(u.pages[5].takeaway));
    for(const page of u.pages)assert.ok((await p.evaluate(()=>window.__prints.at(-1))).includes(page.title));
    assert.equal(await p.locator('.print-guide').count(),6);
    if(out&&width===390)await p.pdf({path:`${out}/${lang}-guide.pdf`,format:'A4',printBackground:true});
    await p.locator('.scam-help-share > button').click();assert.equal(await p.evaluate(()=>window.__shares.at(-1).url),`https://nook-learn.vercel.app/scams/help?lang=${lang}`);
    await p.evaluate(()=>Object.defineProperty(navigator,'share',{configurable:true,value:async()=>{const e=new Error();e.name='AbortError';throw e;}}));await p.locator('.scam-help-share > button').click();assert.equal(await p.evaluate(()=>window.__copies.length),0);
    await p.evaluate(()=>Object.defineProperty(navigator,'share',{configurable:true,value:undefined}));await p.locator('.scam-help-share > button').click();assert.ok((await p.evaluate(()=>window.__copies.at(-1))).includes('/scams/help?lang='));
    assert.equal(await p.locator('a[href="tel:112"]').count(),1);assert.equal(await p.locator('a[href="tel:181"]').count(),1);
   }else await p.locator('.scam-help-footer button').last().click();
  }
  for(let step=5;step>=1;step--){await p.locator('.scam-help-footer button').first().click();assert.equal(await p.locator('.scam-help-progress .on').count(),step);assert.equal(await p.locator('.scam-help-content').evaluate(e=>e.scrollTop),0);}
  await p.waitForTimeout(100);const events=await p.evaluate(()=>window.__events);assert.equal(events.filter(e=>e.type==='scam_help_opened').length,1);for(let step=1;step<=6;step++)assert.ok(events.some(e=>e.type==='scam_help_call_1930'&&e.meta.step===step));
  assert.equal(await p.evaluate(()=>localStorage.getItem('folks_from')),null,'Entry source must not replace the caregiver name');
  await p.goto(base);await p.getByRole('button',{name:T[lang].settingsLabel,exact:true}).click();assert.equal(await p.locator('.settings').getByText(T[lang].installApp,{exact:true}).count(),0);assert.equal(await p.locator('.voice-speed select option').count(),3);await p.locator('.settings > .primary').click();
  // Completing a later reading lesson first still fills progress from the left.
  await p.evaluate(id=>localStorage.setItem('folks_safe_done',JSON.stringify([id])),SAFE_LESSONS[1].id);await p.goto(`${base}/scams`);await p.waitForFunction(()=>document.querySelector('.ss-bars')?.getAttribute('aria-valuenow')==='1');assert.equal(await p.locator('.ss-total-fill').evaluate(e=>e.style.width),'33.3333%');
  // Both entry paths open the first screen, never a previous step.
  await p.goto(`${base}/scams`);if(out&&width===390)await shot(p,`${lang}-safe-home`);await p.locator('.scam-help-next').click();assert.equal(await p.locator('.scam-help-progress').getAttribute('aria-valuenow'),'1');
  for(const l of SAFE_LESSONS){
   await p.evaluate(()=>localStorage.removeItem('folks_safe_pages'));await p.goto(`${base}/scams/learn/${l.id}`);await p.locator('.ss-content').waitFor();
   for(let page=1;page<=3;page++){
    await audit(p,'.ss-fit');assert.equal(await p.locator('.ss-bars .on').count(),page);assert.equal(await p.locator('.ss-bars i').first().evaluate(e=>e.getBoundingClientRect().height),8);
    if(page===3){await p.locator('.scam-help-next').click();assert.equal(await p.locator('.scam-help-progress').getAttribute('aria-valuenow'),'1');await p.evaluate(()=>localStorage.removeItem('folks_safe_pages'));await p.goto(`${base}/scams/learn/${l.id}`);await p.locator('.ss-foot button').last().click();await p.locator('.ss-foot button').last().click();}
    await p.locator('.ss-foot button').last().click();
   }
   // Quick check and completion retain the filled reading progress.
   assert.equal(await p.locator('.ss-bars .on').count(),3);await p.locator('.ss-foot button').last().click();await audit(p,'.ss-fit');await p.locator('.ss-foot button').last().click();assert.equal(await p.locator('.ss-bars .on').count(),3);
   const stop=p.getByRole('button',{name:SAFE_UI[lang].stop,exact:true});if(await stop.count())await stop.click();
   assert.equal(await p.locator('.ss-tips li').count(),3);await p.locator('.scam-help-next').click();assert.equal(await p.locator('.scam-help-progress').getAttribute('aria-valuenow'),'1');
  }
  await p.goto(`${base}/scams/test`);await p.locator('.ss-q-bars').waitFor();
  for(let i=1;i<=6;i++){assert.equal(await p.locator('.ss-q-bars .on').count(),i);await audit(p,'.ss-fit');await p.locator('.ss-foot button').first().click();await audit(p,'.ss-fit');await p.locator('.ss-foot button').click();}
  await p.locator('.scam-help-entry').waitFor();
  for(const th of THEMES){
   await p.goto(`${base}/theme/${th.id}`);await p.locator('.learn-helper').waitFor();if(out&&width===390)await shot(p,`${lang}-topic-${th.id}`);assert.equal(await p.locator('.share-dot').count(),0);assert.equal(await p.locator('.print-open').count(),1);assert.equal(await p.locator('.learn-helper .print-open').count(),1);assert.equal(await p.locator('.lesson-list .lesson-card').count(),th.lessons.length);
   await p.locator('.helper-send').click();await p.waitForFunction(id=>document.querySelector('.send-back')?.getAttribute('href')===`/theme/${id}`,th.id);const vals=await p.locator('.send select option').evaluateAll(es=>es.map(e=>e.value));assert.deepEqual(vals,th.lessons.map(id=>`l:${id}`));assert.equal(await p.locator('.send-back').getAttribute('href'),`/theme/${th.id}`);
  }
  if(width===1366){
   let svg;for(const route of ['/help','/scams','/theme/rides']){await p.goto(base+route);await p.locator('.phone-qr svg').waitFor();const html=await p.locator('.phone-qr').innerHTML();if(svg)assert.equal(html,svg);svg=html;}
   const expected=await QRCode.toString('https://nook-learn.vercel.app/',{type:'svg',margin:0,color:{dark:'#142420',light:'#ffffff'}});assert.ok(svg.includes(expected.match(/<path[^>]+stroke="#142420"[^>]+d="([^"]+)"/)?.[1]));
  }
  console.log(`PASS guide, calls/share/print, progress and topics ${lang} ${width}x${height}`);await c.close();
 }
 // Crawler-visible preview metadata and a real, public PNG on every shared route family.
 const[autoContext,autoPage]=await setup('en',390,844);
 await autoPage.goto(`${base}/send`);await autoPage.locator('.send select option').first().waitFor({state:'attached'});
 const offered=await autoPage.locator('.send select option').evaluateAll(es=>es.map(e=>e.value));
 assert.ok(offered.length);for(const value of offered)assert.ok(LESSONS[value.slice(2)],`No retired/missing share destination: ${value}`);
 await autoPage.goto(`${base}/scams/learn/${SAFE_LESSONS[0].id}`);
 for(let n=0;n<3;n++)await autoPage.locator('.ss-foot button').last().click();
 await autoPage.locator('.ss-foot button').last().click();await autoPage.locator('.ss-foot button').last().click();
 await autoPage.waitForURL(`**/scams/learn/${SAFE_LESSONS[1].id}`,{timeout:15000});
 await autoPage.locator('.ss-bars .on').waitFor();assert.equal(await autoPage.locator('.ss-bars .on').count(),1);assert.equal(await autoPage.locator('.ss-ans').count(),0);
 await autoContext.close();console.log('PASS automatic next lesson resets reading progress and answer state');
 const c=await browser.newContext(),p=await c.newPage();
 for(const route of ['/','/lesson/qr-pay?lang=hi&from=Elna','/guide/install-app','/app/whatsapp','/theme/rides','/scams','/scams/help','/scams/test','/scams/learn/'+SAFE_LESSONS[0].id,'/help','/send']){
   const r=await p.request.get(base+route,{headers:{'User-Agent':'WhatsApp/2.25'}});assert.equal(r.status(),200);const html=await r.text();assert.ok(html.slice(0,html.indexOf('</head>')).includes('property="og:title"'),route);assert.ok(html.includes('property="og:image"'),route);assert.ok(html.includes('property="og:title"'),route);assert.ok(html.includes('name="twitter:card" content="summary_large_image"'),route);assert.ok(!html.match(/property="og:title"[^>]*Elna/));assert.equal(new URL(html.match(/property="og:url" content="([^"]+)"/)[1]).href,new URL(route.split('?')[0],'https://nook-learn.vercel.app').href,route);
 }
 const img=await p.request.get(base+'/opengraph-image');assert.equal(img.status(),200);assert.ok(img.headers()['content-type'].includes('image/png'));const buf=await img.body();assert.equal(buf.readUInt32BE(16),1200);assert.equal(buf.readUInt32BE(20),630);if(out)await (await import('node:fs/promises')).writeFile(`${out}/link-preview.png`,buf);await c.close();
 console.log('PASS crawler metadata and 1200×630 PNG');
 const {realAppHref}=await load('lib/openApp.js');const nav=Object.getOwnPropertyDescriptor(globalThis,'navigator');
 for(const ua of ['Android','iPhone','Desktop']){
  Object.defineProperty(globalThis,'navigator',{configurable:true,value:{userAgent:ua}});
  for(const app of ['gpay','whatsapp','uber','yono','maps','playstore'])assert.ok(realAppHref(app),`${ua} ${app} has a destination`);
  if(ua==='Android'){assert.ok(realAppHref('gpay').includes('package=com.google.android.apps.nbu.paisa.user;'));assert.ok(realAppHref('whatsapp').includes('scheme=whatsapp;'));assert.ok(realAppHref('yono').includes('S.browser_fallback_url='));}
  if(ua==='iPhone')assert.equal(realAppHref('whatsapp'),'whatsapp://');
  assert.equal(realAppHref('phone'),null,'Phone basics use the Read checklist rather than an invented app');
 }
 if(nav)Object.defineProperty(globalThis,'navigator',nav);else delete globalThis.navigator;
 console.log('PASS Android/iPhone/desktop app destinations');
}finally{await browser.close();}
