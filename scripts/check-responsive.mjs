// Reproduce narrow-screen clipping and verify existing hand/highlight/Help positioning.
// Same Playwright runtime environment variables as smoke-journeys.mjs. APIs/audio are disabled.
import { pathToFileURL } from 'node:url';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
const sizes = [[320,568], [360,640], [390,700], [430,860], [844,390], [1366,768], [1440,900]];
const output = process.env.LAYOUT_SCREENSHOTS;
if (output) await mkdir(output, { recursive: true });
try {
  for (const lang of ['en', 'hi', 'ml']) for (const [width, height] of sizes) {
    const context = await browser.newContext({ viewport: { width, height } });
    await context.addInitScript((lang) => {
      for (const [k,v] of Object.entries({ folks_lang:lang, folks_onboarded:'1', folks_practice_note:'off', folks_mute_v2:'1' })) localStorage.setItem(k,v);
      if (window.speechSynthesis) { window.speechSynthesis.speak = () => {}; window.speechSynthesis.cancel = () => {}; }
      window.Audio = class { play() { return Promise.resolve(); } pause() {} addEventListener() {} removeEventListener() {} };
    }, lang);
    await context.route('**/api/**', (r) => r.fulfill({ json: { ok:true, stored:true, enabled:false } }));
    const page = await context.newPage();
    const errors = []; page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(`${process.env.TEST_URL || 'http://127.0.0.1:3110'}/lesson/qr-pay?mode=practice`);
    await page.locator('.screen [data-t="app-gpay"]').click();
    await page.locator('.g2-chips').waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    const measure = () => page.evaluate(() => {
      const rect = (el) => { const r=el.getBoundingClientRect(); return { left:r.left, right:r.right, top:r.top, bottom:r.bottom, width:r.width, height:r.height }; };
      const screen = document.querySelector('.screen'); const tag = document.querySelector('.practice-tag');
      const chips = document.querySelector('.g2-chips'); const coach = document.querySelector('.coach');
      const target=rect(document.querySelector('.hl')); const scroll=rect(document.querySelector('.g2-scroll'));
      const bounds=rect(screen);
      const visibleTarget={ left:Math.max(target.left,bounds.left+screen.clientLeft,scroll.left), top:Math.max(target.top,bounds.top+screen.clientTop,scroll.top) };
      return { screen:rect(screen), mark:rect(document.querySelector('.practice-mark span')),
        markFont:parseFloat(getComputedStyle(document.querySelector('.practice-mark span')).fontSize),
        chips:rect(chips), items:[...chips.children].map(rect),
        tagFits:tag.scrollWidth<=tag.clientWidth, bodyFits:document.documentElement.scrollWidth<=innerWidth,
        coach:rect(coach), target, visibleTarget, tint:rect(document.querySelector('.tap-tint')),
        hand:rect(document.querySelector('.tap-hand')), viewport:{width:innerWidth,height:innerHeight}, pageHeight:document.documentElement.scrollHeight, scrollY };
    });
    const before = await measure();
    if (output && lang==='en' && [360,1366].includes(width)) await page.screenshot({ path:`${output}/${width}-${height}.png`, fullPage:true });
    if (!process.env.CAPTURE_ONLY) {
      const check = (m) => {
        assert.ok(m.bodyFits && m.tagFits, `page/banner overflow: ${lang} ${width}`);
        for (const r of m.items) assert.ok(r.left>=m.chips.left-1 && r.right<=m.chips.right+1, `clipped reward row: ${lang} ${width}`);
        assert.ok(m.items.every((r) => Math.abs(r.top-m.items[0].top)<1), `shortcut row wrapped: ${lang} ${width}`);
        assert.ok(m.mark.left>=m.screen.left && m.mark.right<=m.screen.right && m.mark.top>=m.screen.top && m.mark.bottom<=m.screen.bottom, `clipped watermark: ${lang} ${width}`);
        assert.ok(m.screen.height>=100, `collapsed practice screen: ${lang} ${width}`);
        assert.ok(m.coach.bottom+m.scrollY<=m.pageHeight+1, `coach unreachable by scrolling: ${lang} ${width}`);
        assert.ok(Math.abs(m.tint.left-m.visibleTarget.left)<2 && Math.abs(m.tint.top-m.visibleTarget.top)<2, `misaligned tint: ${lang} ${width}`);
        assert.ok(m.hand.left>=m.screen.left && m.hand.right<=m.screen.right && m.hand.top>=m.screen.top && m.hand.bottom<=m.screen.bottom, `clipped hand: ${lang} ${width}`);
      };
      check(before);
      if (width>=720) assert.ok(before.markFont>before.screen.width*0.12, `laptop watermark too small: ${lang} ${width}`);
      else assert.ok(before.markFont<=before.screen.width*0.12+1, `phone watermark unexpectedly enlarged: ${lang} ${width}`);
      // Opening Help changes the available screen height. The existing overlay must follow it.
      await page.locator('.coach-actions button').last().click();
      await page.waitForTimeout(500);
      check(await measure());
      // Free scrolling retains the edge pointer; Help brings the target back into view.
      await page.locator('.g2-scroll').evaluate((el) => { el.scrollTop=el.scrollHeight; });
      await page.waitForTimeout(300);
      await page.locator('.tap-hand.edge').waitFor();
      await page.locator('.coach-actions button').last().click();
      await page.waitForTimeout(500);
      check(await measure());
      if (lang==='en' && width===360) {
        await page.setViewportSize({ width:1366, height:768 });
        await page.waitForTimeout(500);
        check(await measure());
        await page.setViewportSize({ width, height });
        await page.waitForTimeout(500);
        check(await measure());
      }
      assert.equal(errors.length,0,errors.join('\n'));
    }
    console.log(`${process.env.CAPTURE_ONLY ? 'BASELINE' : 'PASS'} ${lang} ${width}x${height}: ${JSON.stringify({ chipsWidth:before.chips.width, lastChipRight:before.items.at(-1).right, markWidth:before.mark.width, screenWidth:before.screen.width })}`);
    await context.close();
  }
} finally { await browser.close(); }
