'use client';
import Link from 'next/link';
import Icon from './Icons';
import { scamHelp } from '@/lib/scamHelp';
export default function ScamHelpEntry({lang,from='home'}) {
  const u=scamHelp(lang);
  return <Link href={`/scams/help?source=${encodeURIComponent(from)}`} className="ss-sos scam-help-entry"><span className="ic"><Icon name="phone" size={24}/></span><span><b>{u.entry}</b><small>{u.entrySub}</small></span><Icon name="chevron" size={22}/></Link>;
}
