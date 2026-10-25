// Resolve the app's extensionless imports and @/ alias in Node regression checks.
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
  if (spec === 'next/server') return next('next/server.js', ctx);
  return next(spec, ctx);
}`;
register('data:text/javascript,' + encodeURIComponent(hook), pathToFileURL('./'));

export const load = (f) => import(pathToFileURL(`${process.cwd()}/${f}`).href);
