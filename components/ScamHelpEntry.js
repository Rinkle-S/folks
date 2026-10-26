'use client';
import Link from 'next/link';
import Icon from './Icons';
import { scamHelp } from '@/lib/scamHelp';
export default function ScamHelpEntry({lang,from='home'}) {
  const u=scamHelp(lang);
  return <section className="scam-help-entry" aria-label={u.entryQuestion}><h2>{u.entryQuestion}</h2><div className="scam-help-actions"><a href="tel:1930" className="scam-help-call"><Icon name="phone" size={24}/><span>{u.call}</span></a><Link href={`/scams/help?source=${encodeURIComponent(from)}`} className="scam-help-next"><span>{u.nextAction}</span><Icon name="arrow" size={22}/></Link></div></section>;
}
