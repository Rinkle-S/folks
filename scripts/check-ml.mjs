// Fails if Malayalam text is missing, empty, or contains Devanagari (Hindi) letters.
// Run from the repo root: npm run check:ml
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

const hook = `
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
const ROOT = ${JSON.stringify(process.cwd())};
export async function resolve(spec, ctx, next) {
  let p = null;
  if (spec.startsWith('@/')) p = path.join(ROOT, spec.slice(2));
  else if (spec.startsWith('.') && ctx.parentURL && ctx.parentURL.startsWith('file:')) p = path.resolve(path.dirname(fileURLToPath(ctx.parentURL)), spec);
  if (p) for (const c of [p, p + '.js', path.join(p, 'index.js')]) if (existsSync(c) && statSync(c).isFile()) return next(pathToFileURL(c).href, ctx);
  return next(spec, ctx);
}`;
register('data:text/javascript,' + encodeURIComponent(hook), pathToFileURL('./'));

const load = (f) => import(pathToFileURL(`${process.cwd()}/${f}`).href);
const { LESSONS, REAL } = await load('lib/lessons.js');
const { SCAMS } = await load('lib/scams.js');
const { GUIDES } = await load('lib/guides/index.js');
const { T } = await load('lib/i18n.js');
const { ML_MISSING } = await load('lib/ml.js');
const { ML_UI } = await load('lib/i18nMl.js');

const DEVANAGARI = /[ऀ-ॿ]/;
const problems = [];
const text = (v) => (Array.isArray(v) ? v.join(' ') : String(v));
function walk(node, where) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) return node.forEach((x, i) => walk(x, `${where}[${i}]`));
  if ('en' in node && 'hi' in node) {
    if (node.ml === undefined || !text(node.ml).trim()) problems.push(`missing ml: ${where}  (${text(node.en).slice(0, 60)})`);
    else if (DEVANAGARI.test(text(node.ml))) problems.push(`Hindi letters in ml: ${where}  (${text(node.ml).slice(0, 60)})`);
    return;
  }
  for (const [k, v] of Object.entries(node)) walk(v, `${where}.${k}`);
}
walk(LESSONS, 'LESSONS');
walk(REAL, 'REAL');
walk(SCAMS, 'SCAMS');
walk(GUIDES, 'GUIDES');
walk((await load('lib/scamHelp.js')).SCAM_HELP, 'SCAM_HELP');
walk((await load('lib/help.js')).HELP, 'HELP');
walk((await load('lib/voiceMessages.js')).VOICE_MESSAGES, 'VOICE_MESSAGES');
for (const s of ML_MISSING) problems.push(`no Malayalam translation yet: ${s.slice(0, 70)}`);
for (const k of Object.keys(T.en)) if (!(k in ML_UI)) problems.push(`UI text missing in lib/i18nMl.js: ${k}`);
for (const [k, v] of Object.entries(ML_UI)) if (typeof v === 'string' && DEVANAGARI.test(v)) problems.push(`Hindi letters in UI text: ${k}`);

if (problems.length) {
  console.error(`${problems.length} Malayalam problem(s):\n- ` + problems.join('\n- '));
  process.exit(1);
}
console.log('Malayalam check passed: every lesson, real-phone step, scam, guide and UI string is present and has no Hindi letters.');
