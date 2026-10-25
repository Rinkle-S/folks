'use client';
import Link from 'next/link';
import { useLang } from '@/lib/client';
import { T } from '@/lib/i18n';
export default function RetiredLesson() {
  const [lang] = useLang();
  if (!lang) return <div className="page" />;
  return <main className="page"><h1>{T[lang].guideGone}</h1><Link className="btn primary" href="/">{T[lang].home}</Link></main>;
}
