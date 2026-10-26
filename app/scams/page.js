'use client';
// Stay safe home: three short reading lessons, the real-or-fake test, and the 1930 helpline.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icons';
import ScamHelpEntry from '@/components/ScamHelpEntry';
import { AppBar, BottomNav } from '@/components/AppShell';
import { SAFE_LESSONS, SAFE_UI, readDone, readSafePages, SAFE_PROGRESS } from '@/lib/safeLessons';
import { T } from '@/lib/i18n';
import { useLang, track } from '@/lib/client';

export default function StaySafe() {
  const [lang] = useLang();
  const [done, setDone] = useState([]);
  const [pages,setPages]=useState({});
  useEffect(() => {setDone(readDone());setPages(readSafePages());}, []);

  if (!lang) return <div className="page" />;
  const t = T[lang];
  const u = SAFE_UI[lang];
  const doneCount = SAFE_LESSONS.filter((l) => done.includes(l.id)).length;
  const progress=SAFE_PROGRESS[lang];

  return (
    <div className="shell">
      <AppBar />
      <main className="shell-main ss ss-home" data-l={lang}>
        <h1>{u.title}</h1>
        <p className="ss-lead">{u.lead}</p>

        <div className="ss-prog">
          <b>{u.progress}</b>
          <span>{u.doneOf(doneCount)}</span>
        </div>
        <div className="ss-bars" role="progressbar" aria-label={u.progress} aria-valuenow={doneCount} aria-valuemin={0} aria-valuemax={SAFE_LESSONS.length}>
          <i className="ss-total-fill" style={{width:`${doneCount/SAFE_LESSONS.length*100}%`}}/>
        </div>

        <div className="ss-h">{u.lessons}</div>
        {SAFE_LESSONS.map((l) => {
          const isDone = done.includes(l.id);
          const page=Number.isInteger(pages[l.id])?Math.max(1,Math.min(4,pages[l.id])):0;
          const started=!isDone && page>0;
          const pct=isDone?100:page?((page-1)/3*100):0;
          return (
            <Link key={l.id} href={`/scams/learn/${l.id}`} className={`ss-tile${started ? ' now' : ''}`} onClick={() => track('safe_lesson_open', { meta: { id: l.id } })}>
              <div className="ic safe-progress-icon" aria-hidden="true"><Icon name={['phone','lock','chart'][SAFE_LESSONS.indexOf(l)]} size={30}/>{isDone && <span className="progress-check"><Icon name="check" size={18} stroke={3}/></span>}</div>
              <div className="tx">
                <b>{l.title[lang]}</b>
                <span className="safe-tile-progress" role="progressbar" aria-label={l.title[lang]} aria-valuenow={isDone?3:Math.min(3,Math.max(0,page-1))} aria-valuemin={0} aria-valuemax={3}><i style={{width:`${pct}%`}}/></span><span className={started?'safe-continue':undefined}>{isDone?progress.done:started?progress.resume(page):progress.fresh}</span>
              </div>
              <Icon name="chevron" size={22} />
            </Link>
          );
        })}

        <Link href="/scams/test" className="ss-tile ss-testtile" onClick={() => track('safe_test_open')}>
          <div className="ic" aria-hidden="true">❓</div>
          <div className="tx">
            <b>{u.testTitle}</b>
            <span>{u.testSub}</span>
          </div>
          <Icon name="chevron" size={22}/>
        </Link>

        <ScamHelpEntry lang={lang} from="home"/>
      </main>
      <BottomNav active="safe" t={t} />
    </div>
  );
}
