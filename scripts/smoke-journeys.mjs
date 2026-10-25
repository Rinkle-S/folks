// Run against a freshly built local server. API calls are mocked; audio is disabled.
// PLAYWRIGHT_MODULE and BROWSER_EXECUTABLE can point to an existing local test runtime.
import { load } from './test-loader.mjs';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const { LESSONS } = await load('lib/lessons.js');
const { T } = await load('lib/i18n.js');
const { buildCards } = await load('lib/followCards.js');
const { GUIDE_LIST } = await load('lib/guides/index.js');
const { THEMES } = await load('lib/themes.js');
const { personalise } = await load('lib/persona.js');
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
const base = process.env.TEST_URL || 'http://localhost:3110';
let passed = 0;
try {
  for (const lang of (process.env.TEST_LANG ? [process.env.TEST_LANG] : ['en', 'hi', 'ml'])) {
    globalThis.localStorage = { getItem: (key) => key === 'folks_lang' ? lang : null };
    const context = await browser.newContext({ viewport: { width: Number(process.env.TEST_WIDTH || 390), height: Number(process.env.TEST_HEIGHT || 844) } });
    await context.addInitScript((lang) => {
      for (const [k, v] of Object.entries({ folks_lang: lang, folks_onboarded: '1', folks_practice_note: 'off', folks_mute_v2: '1' })) localStorage.setItem(k, v);
      // Accelerate the player's 450ms success flash, without changing app code.
      const timer = window.setTimeout;
      window.setTimeout = (fn, ms, ...args) => timer(fn, ms === 450 ? 1 : ms, ...args);
      window.SpeechRecognition = undefined; window.webkitSpeechRecognition = undefined;
      if (window.speechSynthesis) { window.speechSynthesis.speak = () => {}; window.speechSynthesis.cancel = () => {}; }
      window.Audio = class { play() { return Promise.resolve(); } pause() {} addEventListener() {} removeEventListener() {} };
    }, lang);
    await context.route('**/api/**', (route) => route.fulfill({ json: { ok: true, stored: true, enabled: false } }));
    const page = await context.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    for (const lesson of Object.values(LESSONS)) {
      if (process.env.TEST_LESSON && lesson.id !== process.env.TEST_LESSON) continue;
      await page.goto(`${base}/lesson/${lesson.id}?mode=practice`);
      for (let i = 1; i < lesson.steps.length; i++) {
        const step = lesson.steps[i];
        try {
          await page.waitForFunction((text) => document.querySelector('.coach-text')?.textContent.trim() === text, personalise(step.say[lang]), { timeout: 8000 });
        } catch (error) {
          console.error({ lesson: lesson.id, lang, step: step.id, expected: step.say[lang], actual: await page.locator('.coach-text').textContent().catch(() => null) });
          throw error;
        }
        if (process.env.LAYOUT_SCREENSHOTS && lesson.id==='video-call' && step.target==='flip') {
          await page.screenshot({ path:`${process.env.LAYOUT_SCREENSHOTS}/${lang}-video-call-${process.env.TEST_WIDTH || 390}.png`, fullPage:true });
        }
        if (step.kind === 'tap') await page.locator(`.screen [data-t="${step.target}"]`).first().click();
        else if (step.kind === 'input') {
          for (const key of step.expected) await page.locator(`.screen [data-key="${key}"]`).first().click();
        } else if (step.kind === 'quiz') {
          await page.getByRole('button', { name: personalise(step.options.find((o) => o.correct).text[lang]), exact: true }).click();
          await page.locator('.options .btn.primary').click();
        } else await page.locator('.coach > .btn.primary').click();
      }
      await page.locator('.done-title').waitFor();
      assert.equal(errors.length, 0, errors.join('\n'));
      // Every lesson's real-phone guide must also have complete text and render through to its end.
      const cards = buildCards(lesson, lang);
      assert.ok(cards.every((c) => c.text?.trim()), `${lesson.id}: missing reading text (${lang})`);
      await page.goto(`${base}/lesson/${lesson.id}?mode=follow`);
      await page.locator('.read-list').waitFor();
      await page.getByRole('button', { name: T[lang].followFinish, exact: true }).click();
      await page.locator('.done-title').waitFor();
      await page.goto(`${base}/lesson/${lesson.id}?mode=watch`);
      for (let i = 1; i < lesson.steps.length; i++) {
        await page.waitForFunction((text) => document.querySelector('.coach-text')?.textContent.trim() === text, personalise(lesson.steps[i].say[lang]));
        await page.locator('.coach-actions').getByRole('button', { name: T[lang].next, exact: true }).click();
      }
      await page.locator('.done-title').waitFor();
      assert.equal(errors.length, 0, errors.join('\n'));
      console.log(`PASS ${lang} ${lesson.id}: practice + read + watch controls`); passed++;
    }
    const paths = ['/', '/help', '/scams', '/themes', '/levels', '/profile', '/send', '/stats',
      ...new Set(Object.values(LESSONS).map((l) => `/app/${l.app}`)),
      ...GUIDE_LIST.map((g) => `/guide/${g.id}`), ...THEMES.map((t) => `/theme/${t.id}`)];
    for (const path of paths) {
      const response = await page.goto(`${base}${path}`);
      assert.equal(response.status(), 200, path);
      await page.waitForTimeout(80);
      assert.equal(errors.length, 0, `${path}: ${errors.join('\n')}`);
    }
    console.log(`PASS ${lang}: ${paths.length} app, topic, guide and navigation pages`);
    await context.close();
  }
  console.log(`PASS ${passed} lesson/language combinations in all three modes; no page errors.`);
} finally { await browser.close(); }
