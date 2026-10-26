// Generate the complete lesson handout for every lesson/language. Never opens a native dialog.
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {load} from './test-loader.mjs';
const {buildCards}=await load('lib/followCards.js');
const {LESSONS}=await load('lib/lessons.js'),{T}=await load('lib/i18n.js');
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const out=process.env.LAYOUT_SCREENSHOTS;assert.ok(out,'Set LAYOUT_SCREENSHOTS to the PDF output folder');await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE});
try{
  for(const lang of ['en','hi','ml']){
    const c=await browser.newContext({viewport:{width:390,height:844}});
    await c.addInitScript(lang=>{localStorage.setItem('folks_lang',lang);localStorage.setItem('folks_mute_v2','1');localStorage.setItem('folks_onboarded','1');speechSynthesis.speak=()=>{};speechSynthesis.cancel=()=>{};window.print=()=>{};},lang);
    await c.route('**/api/**',r=>r.fulfill({json:{ok:true,stored:true,enabled:false}}));const p=await c.newPage();
    for(const lesson of Object.values(LESSONS)){
      await p.goto(`${process.env.TEST_URL}/lesson/${lesson.id}?mode=follow`);await p.locator('.scene-body > .primary').click();await p.getByRole('button',{name:T[lang].followFinish,exact:true}).click();await p.locator('.tips-print .print-open').click();
      assert.equal(await p.locator('.print-root[data-print-active] .print-step').count(),buildCards(lesson,lang).filter(c=>!c.tip).length);await p.evaluate(()=>document.fonts.ready);
      await p.emulateMedia({media:'print'});assert.ok(await p.locator('.print-root[data-print-active]').isVisible());await p.pdf({path:`${out}/${lang}-${lesson.id}.pdf`,format:'A4',printBackground:true});await p.emulateMedia({media:'screen'});
    }
    console.log(`PASS ${lang}: all 15 complete lesson handouts generated`);await c.close();
  }
}finally{await browser.close();}
