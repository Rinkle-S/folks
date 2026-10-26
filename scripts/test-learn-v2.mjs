// Learn v2 acceptance checks. External writes, browser speech, print and share actions are mocked.
import { load } from './test-loader.mjs';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { mkdir } from 'node:fs/promises';
const { LESSONS, APPS } = await load('lib/lessons.js');
const { T } = await load('lib/i18n.js');
const { THEMES } = await load('lib/themes.js');
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const base = process.env.TEST_URL || 'http://127.0.0.1:3130';
const output = process.env.LAYOUT_SCREENSHOTS;
if (output) await mkdir(output, {recursive:true});
const done = [...Object.values(LESSONS).filter(l=>l.app==='gpay').map(l=>l.id), 'whatsapp-docs', 'whatsapp-status'];
const saved = ['whatsapp','uber','gpay','maps','yono'];
const expectedOrder = [...saved,...APPS.filter(a=>!saved.includes(a.id)).map(a=>a.id)];
const browser = await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE});
// Audit actual visible DOM, not just CSS tokens. Official app logos and the unchanged bottom-nav font are excluded from the font rule.
async function audit(page, name) {
  const result = await page.evaluate(() => {
    const issues=[];const scope=document.querySelector('.learn-page, .learn-mode-v2');
    const visible=e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return s.visibility!=='hidden'&&s.display!=='none'&&r.width>0&&r.height>0;};
    const rgb=s=>{const a=s.match(/[\d.]+/g)?.map(Number);return a?[a[0],a[1],a[2],a[3]??1]:[0,0,0,0];};
    const over=(fg,bg)=>fg.slice(0,3).map((v,i)=>v*fg[3]+bg[i]*(1-fg[3]));
    const bgOf=e=>{const chain=[];for(let a=e;a;a=a.parentElement)chain.unshift(a);return chain.reduce((bg,a)=>over(rgb(getComputedStyle(a).backgroundColor),bg),[255,255,255]);};
    const luminance=c=>c.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
    const contrast=(a,b)=>{const l=[luminance(a),luminance(b)].sort((a,b)=>b-a);return(l[0]+.05)/(l[1]+.05);};
    for(const e of scope.querySelectorAll('*')){
      if(!visible(e)||e.closest('.app-icon,svg,.print-root,.settings-wrap'))continue;
      const own=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();
      if(!own)continue;
      const s=getComputedStyle(e),bg=bgOf(e);let opacity=1;for(let a=e;a&&a!==scope.parentElement;a=a.parentElement)opacity*=Number(getComputedStyle(a).opacity);
      const fg=rgb(s.color);fg[3]*=opacity;const ratio=contrast(over(fg,bg),bg);
      if(ratio<4.5)issues.push(`contrast ${ratio.toFixed(2)}: ${own.slice(0,60)}`);
      if(!e.closest('.bottomnav')&&parseFloat(s.fontSize)<16)issues.push(`font ${s.fontSize}: ${own.slice(0,60)}`);
      // Ensure wrapped text fits its own element horizontally.
      if(e.scrollWidth>e.clientWidth+2&&s.display!=='inline')issues.push(`clipped text: ${own.slice(0,60)}`);
    }
    for(const e of scope.querySelectorAll('button,a,input,select')){
      if(!visible(e)||e.closest('.settings-wrap,.print-root'))continue;
      const r=e.getBoundingClientRect();if(r.height<44)issues.push(`tap ${r.height}: ${e.textContent.trim()||e.getAttribute('aria-label')||e.tagName}`);
      if(e.matches('button,a')&&!e.matches('.brand')&&!e.textContent.trim()){
        const id=e.getAttribute('aria-labelledby'),label=id&&document.getElementById(id);
        if(!label||!visible(label)||!label.textContent.trim())issues.push(`icon-only ${e.className}`);
      }
    }
    // Brand artwork can contain blue. Interactive states and decorative UI must not.
    for(const e of scope.querySelectorAll('*')){
      if(!visible(e)||e.closest('.app-icon,.brand,.phone-app,.settings-wrap,.print-root'))continue;
      const s=getComputedStyle(e);for(const p of ['backgroundColor','borderTopColor','color']){const c=rgb(s[p]);if(c[3]>.1&&c[2]>c[0]+35&&c[2]>c[1]+15)issues.push(`blue ${p}: ${e.className}`);}
    }
    if(document.documentElement.scrollWidth>innerWidth)issues.push('page overflow');
    const input=scope.querySelector('.askbar input');if(input){const s=getComputedStyle(input,'::placeholder');if(contrast(rgb(s.color),bgOf(input))<4.5)issues.push('placeholder contrast');}
    return issues;
  });
  assert.deepEqual(result,[],`${name}: ${result.join('; ')}`);
}
try {
  for(const lang of ['en','hi','ml'])for(const width of [320,390,1366]){
    const context=await browser.newContext({viewport:{width,height:width<720?844:900}});
    await context.addInitScript(({lang,done,saved})=>{
      if(!localStorage.getItem('__learn_test_seed')){
        localStorage.setItem('folks_lang',lang);localStorage.setItem('folks_onboarded','1');localStorage.setItem('folks_mute_v2','1');
        localStorage.setItem('folks_apps',saved.join(','));localStorage.setItem('folks_done',JSON.stringify(done));localStorage.setItem('folks_profile',JSON.stringify({name:'Elna'}));
        localStorage.setItem('folks_resume',JSON.stringify({id:'video-call',idx:2,at:Date.now()}));localStorage.setItem('__learn_test_seed','1');
      }
      window.SpeechRecognition=class{};window.speechSynthesis.speak=()=>{};window.speechSynthesis.cancel=()=>{};
      window.print=()=>{window.__printed=true;};window.Audio=class{play(){return Promise.resolve();}pause(){}addEventListener(){}removeEventListener(){}};
    },{lang,done,saved});
    await context.route('**/api/**',r=>r.fulfill({json:{enabled:false,ok:true,stored:true}}));
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base);await page.locator('.app-grid').waitFor();await page.evaluate(()=>document.fonts.ready);
    assert.deepEqual(await page.locator('.app-tile').evaluateAll(es=>es.map(e=>e.dataset.app)),expectedOrder);
    assert.equal(await page.locator('.topics-toggle,.home-foot,.avatar').count(),0);
    assert.equal(await page.locator('.home-topics .topic-card').count(),Math.min(3,THEMES.length));
    assert.ok(await page.locator('.home-topics').isVisible());
    assert.equal(await page.locator('.greet').textContent(),(await page.locator('.greet').textContent()).replace('🙏',''));
    assert.equal(await page.locator('.home-h').textContent(),T[lang].learnHomeTitle);
    assert.equal(await page.locator('.askbar input').getAttribute('placeholder'),T[lang].learnTypePlaceholder);
    assert.equal(await page.locator('[data-app="gpay"] small').textContent(),T[lang].progressAllDone);assert.equal(await page.locator('[data-app="gpay"] .progress-check').count(),1);
    assert.equal(await page.locator('[data-app="whatsapp"] small').textContent(),T[lang].appDoneOf(2,3));
    assert.equal(await page.locator('[data-app="whatsapp"] [role="progressbar"]').getAttribute('aria-valuenow'),'2');
    assert.equal(await page.locator('[data-app="uber"] small').textContent(),T[lang].lessonsN(4));
    assert.equal(await page.locator('.resume-card').getAttribute('href'),'/lesson/video-call?resume=1');
    await audit(page,`${lang} ${width} home`);
    if(output)await page.screenshot({path:`${output}/${lang}-${width}-home.png`,fullPage:true});
    await page.getByRole('button',{name:T[lang].settingsLabel,exact:true}).click();
    await page.locator('.settings-profile').waitFor();assert.equal(await page.locator('.settings-profile').getAttribute('href'),'/profile');
    await page.locator('.settings > .btn.primary').click();
    await page.locator('[data-app="whatsapp"]').click();await page.locator('.app-head').waitFor();
    assert.ok((await page.locator('.app-head').textContent()).includes(T[lang].appDoneOf(2,3)));
    assert.equal(await page.locator('.learn-app .share-dot').count(),0);
    assert.equal(await page.locator('.up-next').count(),1);assert.equal(await page.locator('.up-next').getAttribute('href'),'/lesson/video-call');
    assert.equal(await page.locator('.lesson-start').textContent(),T[lang].startNow);
    assert.equal(await page.locator('.is-done').count(),2);
    assert.ok(await page.locator('.learn-helper .helper-send').isVisible());
    assert.ok(await page.locator('.learn-helper .print-open').isVisible());
    assert.equal(await page.locator('.ask-more').getAttribute('href'),'/help#request-lesson');
    await audit(page,`${lang} ${width} app`);
    if(output)await page.screenshot({path:`${output}/${lang}-${width}-app.png`,fullPage:true});
    await page.locator('.ask-more').click();await page.locator('#request-lesson').waitFor();
    assert.ok(await page.locator('#request-lesson').evaluate(e=>e.getBoundingClientRect().top<innerHeight),'Request link must reveal the existing request form');
    await page.goto(`${base}/app/whatsapp`);await page.locator('.app-head').waitFor();
    // Reuse the existing send flow; it must only offer this app's lessons and preserve the chosen language.
    await page.locator('.helper-send').click();await page.locator('select').waitFor();
    await page.waitForFunction(()=>[...document.querySelector('select').options].every(o=>o.value.startsWith('l:whatsapp')||o.value==='l:video-call'));
    assert.ok((await page.locator('.preview').textContent()).includes(LESSONS['whatsapp-docs'].title[lang]));
    for(const mode of ['practice','watch','follow']){
      await page.goto(`${base}/lesson/video-call`);await page.locator('.scene-copy').waitFor();
      // The intro is deliberately unchanged.
      assert.equal(await page.locator('.scene-art').evaluate(e=>getComputedStyle(e).backgroundImage.includes('scene-atlas.png')),true);
      await page.locator('.scene-body .btn.primary').click();await page.locator('.learn-mode-v2').waitFor();
      assert.equal(await page.locator('.learn-lesson-context b').textContent(),LESSONS['video-call'].title[lang]);
      assert.equal(await page.locator('.learn-lesson-context p').textContent(),T[lang].learnLessonMeta(LESSONS['video-call'].minutes));
      const styles=await page.locator('.mode-card').evaluateAll(es=>es.map(e=>{const s=getComputedStyle(e),i=getComputedStyle(e.querySelector('.mode-ic'));return [s.backgroundColor,s.borderColor,s.borderWidth,i.backgroundColor,i.color];}));
      assert.equal(styles.length,3);assert.deepEqual(styles[0],styles[1]);assert.deepEqual(styles[1],styles[2]);
      await audit(page,`${lang} ${width} mode`);
      if(output&&mode==='practice')await page.screenshot({path:`${output}/${lang}-${width}-mode.png`,fullPage:true});
      await page.locator('.mode-card').nth(['practice','watch','follow'].indexOf(mode)).click();
      await page.locator(mode==='follow'?'.read-list':mode==='watch'?'.screen.watching':'.screen').waitFor();
    }
    await page.goto(`${base}/app/whatsapp`);await page.locator('.print-open').click();await page.waitForFunction(()=>window.__printed===true);
    if(lang==='en'&&width===390){
      // Settings and the Home CTA open the same app picker. Reordering and progress changes persist without moving other tiles.
      await page.goto(base);await page.getByRole('button',{name:T.en.settingsLabel,exact:true}).click();
      await page.locator('.settings-row').filter({hasText:T.en.chooseApps}).getByRole('button').click();
      await page.locator('.order-row').nth(1).getByRole('button',{name:`Uber ${T.en.moveUp}`,exact:true}).click();
      await page.locator('.settings > .btn.primary').click();
      const reordered=['uber','whatsapp','gpay','maps','yono','phone'];
      assert.deepEqual(await page.locator('.app-tile').evaluateAll(es=>es.map(e=>e.dataset.app)),reordered);
      await page.evaluate(ids=>localStorage.setItem('folks_done',JSON.stringify(ids)),Object.keys(LESSONS));await page.reload();
      await page.locator('.app-grid').waitFor();assert.deepEqual(await page.locator('.app-tile').evaluateAll(es=>es.map(e=>e.dataset.app)),reordered);
      assert.equal(await page.locator('.app-tile .progress-check').count(),APPS.length);
      await page.goto(`${base}/app/whatsapp`);await page.locator('.app-head').waitFor();assert.equal(await page.locator('.up-next').count(),0);
      await page.evaluate(()=>localStorage.setItem('folks_done','[]'));await page.reload();await page.locator('.up-next').waitFor();assert.equal(await page.locator('.up-next').count(),1);
      await page.goto(`${base}/app/phone`);await page.locator('.app-head').waitFor();await audit(page,'Phone basics app');
      await page.locator('.helper-send').click();await page.waitForFunction(()=>document.querySelector('select')?.options.length===2);
      // Existing Brave warning and desktop QR behavior are preserved.
      await page.addInitScript(()=>Object.defineProperty(navigator,'brave',{value:{isBrave:async()=>true},configurable:true}));
      await page.goto(base);await page.locator('.voice-warn').waitFor();assert.equal(await page.locator('.voice-warn span').textContent(),T.en.voiceWarn);
      await page.locator('.askbar input').fill('video call');await page.locator('.ask-go').click();await page.locator('.result').waitFor();await audit(page,'Home search result');
    }
    assert.deepEqual(errors,[]);
    console.log(`PASS ${lang} ${width}: six checks, real icons, app sharing/print, mode choices and unchanged intro`);
    await context.close();
  }
}finally{await browser.close();}
