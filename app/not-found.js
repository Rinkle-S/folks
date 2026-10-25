'use client';
import Link from 'next/link';
import { useLang } from '@/lib/client';
import { T } from '@/lib/i18n';
import { BottomNav } from '@/components/AppShell';
export default function NotFound() {
  const [lang] = useLang(); const t = T[lang || 'en'];
  return <main className="page has-nav"><h1>{t.pageMissing}</h1><Link href="/" className="btn primary">{t.home}</Link><Link href="/help" className="btn ghost">{t.navHelp}</Link><BottomNav active="learn" t={t} /></main>;
}
