// Release checks. All speech, native sharing/printing and external API writes are mocked.
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { mkdir, readFile } from 'node:fs/promises';
import { load } from './test-loader.mjs';
const {LESSONS}=await load('lib/lessons.js');
const {T}=await load('lib/i18n.js');
const {FIRST_GOALS}=await load('lib/flowV2.js');
const {orderForFluency}=await load('lib/levels.js');
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const base=process.env.TEST_URL||'http://127.0.0.1:3150',out=process.env.LAYOUT_SCREENSHOTS;
if(out)await mkdir(out,{recursive:true});
for(const l of Object.values(LESSONS)){assert.equal(l.tips.length,3,l.id);for(const lang of ['en','hi','ml'])assert.ok(l.tips.every(t=>t.text[lang]?.trim()));assert.ok('nextLessonId' in l);}
assert.ok(!(await readFile('components/Icons.js','utf8')).includes('M3 20l18-8'));
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE});
async function setup(lang,width=390,height=844,onboarded=false){
  const c=await browser.newContext({viewport:{width,height}});
  await c.addInitScript(({lang,onboarded})=>{
    localStorage.setItem('folks_lang',lang);localStorage.setItem('folks_mute_v2','1');if(onboarded)localStorage.setItem('folks_onboarded','1');
    Object.defineProperty(window,'__events',{get:()=>JSON.parse(sessionStorage.getItem('__test_events')||'[]')});
    const fetchOriginal=window.fetch;window.fetch=(url,options)=>{if(String(url).includes('/api/event')&&options?.body){const events=window.__events;events.push(JSON.parse(options.body));sessionStorage.setItem('__test_events',JSON.stringify(events));}return fetchOriginal(url,options);};
    window.__spoken=[];window.__shares=[];window.__copies=[];window.__print=[];
    window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
    speechSynthesis.getVoices=()=>[];speechSynthesis.resume=()=>{};speechSynthesis.cancel=()=>{};speechSynthesis.speak=u=>{if(u.text.trim())window.__spoken.push(u.text);setTimeout(()=>u.onend?.(),0);};
    window.Audio=class{play(){return Promise.resolve()}pause(){}load(){}addEventListener(){}removeEventListener(){}};
    Object.defineProperty(navigator,'share',{configurable:true,value:async data=>{window.__shares.push(data);}});
    Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>window.__copies.push(text)}});
    window.print=()=>window.__print.push(document.querySelector('.print-root[data-print-active]')?.textContent);
    const timer=window.setTimeout;window.setTimeout=(fn,ms,...args)=>timer(fn,ms===450?1:ms,...args);
  },{lang,onboarded});
  await c.route('**/api/**',r=>r.fulfill({json:{enabled:false,ok:true,stored:true}}));
  const p=await c.newPage();p.on('pageerror',e=>{throw e;});return[c,p];
}
async function audit(p,label){
  await p.evaluate(()=>document.fonts.ready);
  const issues=await p.evaluate(()=>{
    const root=document.querySelector('.onboard-v2,.lesson-end-v2,.learn-mode-v2');const issues=[];
    const rgb=s=>s.match(/[\d.]+/g)?.map(Number)||[0,0,0,0];
    const over=(a,b)=>a.slice(0,3).map((v,i)=>v*(a[3]??1)+b[i]*(1-(a[3]??1)));
    const lum=c=>c.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
    if(document.documentElement.scrollWidth>innerWidth)issues.push('horizontal overflow');
    for(const e of root.querySelectorAll('button,a,input')){
      const s=getComputedStyle(e),r=e.getBoundingClientRect();if(s.display==='none'||s.visibility==='hidden'||!r.height)continue;
      if(r.height<55.5)issues.push(`${e.textContent.trim()}: target ${r.height}`);
    }
    for(const e of root.querySelectorAll('p,b,small,label,button,input')){
      if(e.closest('.ob-progress,.bottomnav'))continue;const r=e.getBoundingClientRect(),s=getComputedStyle(e);if(r.height&&parseFloat(s.fontSize)<18)issues.push(`${e.textContent.trim()}: font ${s.fontSize}`);
    }
    for(const e of root.querySelectorAll('.end-tips p,.end-safety-label'))if(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1)issues.push(`clipped tip text: ${e.textContent}`);
    for(const e of root.querySelectorAll('*')){
      if(e.closest('svg,.app-icon')||![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))continue;
      if(!e.getBoundingClientRect().height)continue;const chain=[];for(let a=e;a;a=a.parentElement)chain.unshift(a);
      const bg=chain.reduce((b,a)=>over(rgb(getComputedStyle(a).backgroundColor),b),[255,255,255]);
      const fg=over(rgb(getComputedStyle(e).color),bg),l=[lum(bg),lum(fg)].sort((a,b)=>b-a),contrast=(l[0]+.05)/(l[1]+.05);
      if(contrast<4.5)issues.push(`${e.textContent.trim()}: contrast ${contrast.toFixed(2)}`);
    }
    return issues;
  });assert.deepEqual(issues,[],label);
}
async function shot(p,name){if(out)await p.screenshot({path:`${out}/${name}.png`,fullPage:true});}
async function onboard(p,lang,{goal='qr-pay',skip=false,look=false}={}){
  await p.goto(base);await p.locator('.ob-language-options').waitFor();await p.locator(`.ob-language-options button[lang="${lang}"]`).click();
  await audit(p,'language');await shot(p,`${lang}-${p.viewportSize().width}-language`);await p.locator('.ob-actions .primary').click();
  await p.locator('.ob-pay').waitFor();assert.equal(await p.locator('.ob-progress b').textContent(),T[lang].obStep(2));await audit(p,'try');await shot(p,`${lang}-${p.viewportSize().width}-try`);
  // Explicit replay is mocked. It must use the same chosen-language instruction.
  await p.locator('.ob-voice button').click();await p.waitForFunction(text=>window.__spoken.join(' ').includes(text),T[lang].obTapPay);
  if(skip)await p.locator('.ob-actions .ghost').click();else{await p.locator('.ob-pay').click();await p.locator('.ob-success').waitFor();assert.equal(await p.locator('.ob-progress b').textContent(),T[lang].obStep(2));await audit(p,'success');await shot(p,`${lang}-${p.viewportSize().width}-success`);await p.locator('.ob-actions .primary').click();}
  await p.locator('#ob-name').fill('Elna');assert.ok((await p.locator('.ob-name-preview').textContent()).includes(T[lang].wellDoneName('Elna')));await audit(p,'name');await shot(p,`${lang}-${p.viewportSize().width}-name`);
  await p.locator(`.ob-actions .${skip?'ghost':'primary'}`).click();assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('folks_profile')).name),skip?'':'Elna');
  await p.locator('.ob-apps button').first().click();await p.locator('.ob-none').click();assert.equal(await p.locator('.ob-apps [aria-pressed="true"]').count(),1);await p.locator('.ob-apps button').first().click();assert.equal(await p.locator('.ob-none').getAttribute('aria-pressed'),'false');await p.locator('.ob-none').click();assert.equal(await p.locator('.ob-actions .ghost').count(),0);await audit(p,'apps');await shot(p,`${lang}-${p.viewportSize().width}-apps`);
  await p.locator('.ob-actions .primary').click();assert.equal(await p.locator('[role="radio"][aria-checked="true"]').count(),1);await p.getByRole('radio',{name:T[lang].obGoals[FIRST_GOALS.findIndex(g=>g.id===goal)],exact:true}).click();await audit(p,'goal');await shot(p,`${lang}-${p.viewportSize().width}-goal`);
  if(look){await p.locator('.ob-actions .ghost').click();await p.locator('.learn-home').waitFor();return;}
  await p.locator('.ob-actions .primary').click();
  if(goal==='safe')await p.locator('.ss').waitFor();else{await p.locator('.mode-card').first().waitFor();assert.equal(await p.locator('.scene-copy').count(),0);assert.ok(p.url().includes(`/lesson/${goal}`));await audit(p,'mode');}
  await p.waitForTimeout(100);assert.ok((await p.evaluate(()=>window.__events)).some(e=>e.type==='onboarding_goal'&&e.meta.lessonId===goal));
  if(!skip)assert.ok((await p.evaluate(()=>window.__events)).some(e=>e.type==='onboarding_try_tapped'));
  await p.goto(base);await p.locator('.resume-card').waitFor();assert.ok((await p.locator('.resume-card').getAttribute('href')).includes(goal==='safe'?'/scams':goal));
}
async function complete(p,id,mode,lang){
  const l=LESSONS[id];
  if(mode==='practice'){
    await p.goto(base);await p.evaluate(({id,idx})=>localStorage.setItem('folks_resume',JSON.stringify({id,idx,at:Date.now()})),{id,idx:l.steps.length-1});await p.goto(`${base}/lesson/${id}?resume=1`);await p.locator('.coach').waitFor();const s=l.steps.at(-1);
    if(s.kind==='quiz'){await p.locator('.opt').nth(s.options.findIndex(o=>o.correct)).click();await p.locator('.options > .primary').click();}
    else if(s.kind==='tap')await p.locator(`[data-t="${s.target}"]`).first().click();else await p.locator('.coach > .primary').click();
  }else{
    await p.goto(`${base}/lesson/${id}?mode=${mode}`);await p.locator('.scene-body > .primary').click();
    if(mode==='follow')await p.getByRole('button',{name:T[lang].followFinish,exact:true}).click();
    else{await p.locator('.coach-actions button.big').click();for(let i=1;i<l.steps.length;i++)await p.locator('.coach-actions').getByRole('button',{name:T[lang].next,exact:true}).click();}
  }
  await p.locator('.lesson-end-v2').waitFor();await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(50);
}
try{
  if(!process.env.END_ONLY)for(const lang of (process.env.TEST_LANG?[process.env.TEST_LANG]:['en','hi','ml'])){
    for(const width of [320,390,1366]){const[c,p]=await setup(lang,width,844);await onboard(p,lang,{goal:width===320?'qr-pay':width===390?'whatsapp-docs':'safe',skip:width===320});console.log(`PASS onboarding ${lang} ${width}`);await c.close();}
    for(const goal of ['video-call','gd-install-app']){const[c,p]=await setup(lang);await onboard(p,lang,{goal,skip:true});await c.close();}const[c,p]=await setup(lang);await onboard(p,lang,{look:true,skip:true});await c.close();
  }
  if(!process.env.ONBOARD_ONLY)for(const lang of (process.env.TEST_LANG?[process.env.TEST_LANG]:['en','hi','ml']))for(const[width,height]of(process.env.TEST_WIDTH?[[Number(process.env.TEST_WIDTH),Number(process.env.TEST_HEIGHT||844)]]:[[320,700],[390,844],[844,390],[1366,900]])){
    const[c,p]=await setup(lang,width,height,true);await p.goto(base);await p.evaluate(()=>localStorage.setItem('folks_profile',JSON.stringify({name:'Elna'})));
    for(const mode of ['practice','watch','follow']){
      await complete(p,'qr-pay',mode,lang);assert.equal(await p.locator('details').count(),0);assert.equal(await p.locator('.end-tips li').count(),3);assert.equal(await p.locator('.done-title').textContent(),T[lang].wellDoneName('Elna'));assert.equal(await p.locator('.done-sub').textContent(),T[lang][mode==='watch'?'endWatched':mode==='follow'?'endRead':'endTried']);assert.equal(await p.locator('.acts,.real-try,.share-dot').count(),0);await audit(p,`end ${lang} ${width}`);
      const rects=await p.evaluate(()=>{const rect=q=>{const r=document.querySelector(q).getBoundingClientRect();return{top:r.top,bottom:r.bottom,height:r.height}};return{footer:rect('.end-next'),nav:rect('.bottomnav'),main:rect('.end-next .primary')};});assert.ok(Math.abs(rects.footer.bottom-rects.nav.top)<=1);assert.ok(rects.footer.top>=0&&rects.main.height>=62);
      for(const b of await p.locator('.end-rating button').all()){await b.click();assert.equal(await b.getAttribute('aria-pressed'),'true');}await p.waitForTimeout(100);assert.ok((await p.evaluate(()=>window.__events)).filter(e=>e.type==='lesson_feedback').length>=3);
      await p.locator('.end-tips li').last().evaluate(e=>e.scrollIntoView({block:'start'}));assert.ok(await p.locator('.end-tips li').last().evaluate(e=>{const r=e.getBoundingClientRect(),f=document.querySelector('.end-next').getBoundingClientRect();return r.height>f.top || r.bottom<=f.top+1;}));await shot(p,`${lang}-${width}-end-${mode}`);
      await p.locator('.tips-print .print-open').click();assert.ok(await p.locator('.print-root[data-print-active]').textContent());await p.emulateMedia({media:'print'});if(out&&width===390&&mode==='practice')await p.pdf({path:`${out}/${lang}-tips.pdf`,format:'A4',printBackground:true});await p.emulateMedia({media:'screen'});
      await p.locator('.end-repeat').click();await p.locator('.scene-body > .primary').waitFor();
    }
    await complete(p,'yono-balance','practice',lang);assert.equal(await p.locator('.end-next .primary').getAttribute('href'),'/app/yono');assert.equal(await p.locator('.end-next .primary').textContent(),T[lang].endBack('YONO SBI'));await p.locator('.end-next .primary').click();await p.locator('.app-head').waitFor();
    await p.evaluate(()=>localStorage.setItem('folks_mode','watch'));await p.goto(`${base}/lesson/qr-pay?onboarding=1`);assert.equal(await p.locator('.mode-card').count(),3);await p.evaluate(()=>localStorage.setItem('folks_mode','ask'));await p.locator('.mode-sharing .share-link').click();assert.equal(await p.evaluate(()=>window.__shares.length),1);assert.ok((await p.evaluate(()=>window.__shares[0].text)).includes('/lesson/qr-pay?'));
    await p.evaluate(()=>Object.defineProperty(navigator,'share',{value:undefined,configurable:true}));await p.locator('.mode-sharing .share-link').click();assert.equal(await p.evaluate(()=>window.__copies.length),1);
    await p.evaluate(()=>Object.defineProperty(navigator,'share',{configurable:true,value:async()=>{const e=new Error('cancelled');e.name='AbortError';throw e;}}));await p.locator('.mode-sharing .share-link').click();assert.equal(await p.evaluate(()=>window.__copies.length),1,'Cancelling native share must not copy anything');
    if(width===390){
      await complete(p,'qr-pay','practice',lang);const next=await p.locator('.end-next .primary').getAttribute('href');const app=await c.newPage();await app.goto(`${base}/app/gpay`);await app.locator('.lesson-card').first().waitFor();const order=await app.locator('.lesson-card').evaluateAll(es=>es.map(e=>e.getAttribute('href')));assert.equal(next,order[order.indexOf('/lesson/qr-pay')+1]);await app.close();await p.locator('.end-next .primary').click();await p.locator('.scene-copy').waitFor();assert.ok(p.url().includes(next));
      await complete(p,'qr-pay','follow',lang);await p.addStyleTag({content:'.end-tips p{font-size:27px!important}.end-next .primary{font-size:30px!important}'});await p.waitForTimeout(100);assert.ok(await p.evaluate(()=>{const f=document.querySelector('.end-next').getBoundingClientRect(),nav=document.querySelector('.bottomnav').getBoundingClientRect();return f.top>=0&&Math.abs(f.bottom-nav.top)<1&&[...document.querySelectorAll('.end-tips li')].every(e=>e.scrollHeight<=e.clientHeight+1);}));await shot(p,`${lang}-large-text-end`);await p.locator('.end-next .primary').click();await p.locator('.scene-body > .primary').click();await p.locator('.coach').waitFor();assert.equal(await p.locator('.read').count(),0);
      await p.goto(`${base}/send?app=gpay&lang=${lang}`);await p.getByRole('button',{name:'Copy link',exact:true}).click();assert.ok((await p.evaluate(()=>window.__events)).some(e=>e.type==='lesson_send'&&e.meta.from==='app_page'&&e.meta.lessonId));
    }
    console.log(`PASS end modes, pinned layout, print, ratings and sharing ${lang} ${width}x${height}`);await c.close();
  }
  // Automatic instruction uses the existing speech setup, exactly once on entry (never real audio).
  const[c,p]=await setup('en');await p.goto(base);await p.evaluate(()=>localStorage.setItem('folks_mute_v2','0'));await p.locator('.ob-actions .primary').click();await p.waitForFunction(text=>window.__spoken.includes(text),T.en.obTapPay);assert.equal(await p.evaluate(text=>window.__spoken.filter(s=>s===text).length,T.en.obTapPay),1);await p.locator('.ob-pay').click();await p.locator('.ob-success').waitFor();assert.equal(await p.evaluate(()=>Object.keys(localStorage).some(k=>/payment|amount|pin/i.test(k))),false);await c.close();
}finally{await browser.close();}
