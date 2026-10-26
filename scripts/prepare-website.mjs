import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'website');
const output = path.join(root, 'public', 'about');

// The marketing page is intentionally independent of the Next.js app shell.
// Vercel runs this script through npm run build on every GitHub deployment.
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true, force: true });

for (const name of ['index.html', 'styles.css', 'main.js']) {
  const file = path.join(output, name);
  let content = await readFile(file, 'utf8');
  content = content
    .replaceAll('/assets/', '/about/assets/')
    .replaceAll('href="/styles.css"', 'href="/about/styles.css"')
    .replaceAll('src="/main.js"', 'src="/about/main.js"');
  if (name === 'index.html') {
    content = content.replace(
      '<meta property="og:type" content="website">',
      '<meta property="og:type" content="website">\n  <meta property="og:url" content="https://nook-learn.vercel.app/about">\n  <link rel="canonical" href="https://nook-learn.vercel.app/about">',
    );
  }
  await writeFile(file, content);
}

console.log('Prepared the Nook website at /about');
