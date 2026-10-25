'use client';
// One Stay safe lesson: three reading pages, a one-card quick check, then the next lesson starts by itself.
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icons';
import { SAFE_LESSONS, SAFE_UI, markDone } from '@/lib/safeLessons';
import { T } from '@/lib/i18n';
import { useLang, speak, stopSpeaking, track, vibrate, whatsappLink } from '@/lib/client';

const AUTO_SECONDS = 5;

function Top({ u, onListen }) {
  return (
    <div className="ss-top">
      <Link href="/scams" className="ss-back" onClick={() => stopSpeaking()}>
        <span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}><Icon name="chevron" size={22} /></span> {u.lessonsBack}
      </Link>
      <button type="button" className="ss-listen" onClick={onListen}>
        <Icon name="volume" size={22} /> {u.listen}
      </button>
    </div>
  );
}

function Bars({ at }) {
  return (
    <div className="ss-bars">
      {[1, 2, 3].map((n) => (
        <i key={n} className={n <= at ? 'on' : ''} />
      ))}
    </div>
  );
}

// The sample message with the warning signs highlighted and numbered.
function Sample({ s, lang }) {
  return (
    <div className="ss-card">
      <div className="ss-who">
        <div className="av" aria-hidden="true">👤</div>
        <div style={{ flex: 1 }}>
          {s.who ? s.who[lang] : s.from[lang]}
          {s.who && <small>{s.from[lang]}</small>}
        </div>
        <span className="ss-n" style={{ margin: 0, width: 30, height: 30 }}>1</span>
      </div>
      <div className="ss-bub">
        {s.msg.map((p, i) =>
          p.m ? (
            <span key={i}>
              <mark className={p.link ? 'lk' : ''}>{p.t[lang]}</mark>
              <span className="ss-n">{p.m}</span>
            </span>
          ) : (
            <span key={i}>{p.t[lang]}</span>
          )
        )}
      </div>
    </div>
  );
}

export default function LessonPage({ params }) {
  return <Lesson key={params.id} params={params} />;
}

function Lesson({ params }) {
  const [lang] = useLang();
  const router = useRouter();
  const idx = SAFE_LESSONS.findIndex((l) => l.id === params.id);
  const L = SAFE_LESSONS[idx];
  const next = SAFE_LESSONS[idx + 1];
  const [page, setPage] = useState(1); // 1 to 3 reading pages, 4 quick check, 5 up next
  const [picked, setPicked] = useState(null);
  const [left, setLeft] = useState(AUTO_SECONDS);
  const [auto, setAuto] = useState(true);
  const tips = useRef(null);

  // The page text read aloud for the current page.
  function readText() {
    if (!L) return [];
    const u = SAFE_UI[lang];
    if (page === 1) return [L.spot.h[lang], ...(L.spot.msg.map((p) => p.t[lang])), ...L.spot.flags.map((f) => f[lang]), L.spot.remember[lang]];
    if (page === 2) return [u.pageOf(2), L.how.sub[lang], ...L.how.steps.flatMap((s) => [s.t[lang], s.d[lang]]), L.how.remember[lang]];
    if (page === 3) return [u.todoH, L.todo.rule[lang], ...L.todo.acts.map((a) => a[lang].replace(/<[^>]+>/g, '')), u.already];
    if (page === 4) return [u.realQ, L.check.msg[lang]];
    return [];
  }

  useEffect(() => {
    if (!lang || !L) return;
    speak(readText(), lang);
    window.scrollTo(0, 0);
  }, [page, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => stopSpeaking(), []);

  // Up next: count down, then open the next lesson by itself.
  useEffect(() => {
    if (page !== 5 || !next || !auto) return;
    if (left <= 0) {
      router.push(`/scams/learn/${next.id}`);
      return;
    }
    const id = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(id);
  }, [page, left, auto]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lang) return <div className="page" />;
  if (!L) {
    router.replace('/scams');
    return <div className="page" />;
  }
  const u = SAFE_UI[lang];
  const t = T[lang];

  function go(n) {
    stopSpeaking();
    setPage(n);
  }

  function finish() {
    markDone(L.id);
    track('safe_lesson_done', { meta: { id: L.id } });
    if (!tips.current) tips.current = [...t.scamRules].sort(() => Math.random() - 0.5).slice(0, 3);
    setLeft(AUTO_SECONDS);
    go(5);
  }

  function pick(a) {
    if (picked) return;
    setPicked(a);
    vibrate(a === 'fake' ? 25 : [40, 60, 40]);
    track('scam_answer', { meta: { id: 'lesson-' + L.id, picked: a === 'fake' ? 'scam' : 'safe', right: a === 'fake' } });
    speak([a === 'fake' ? u.rightFake : u.notQuite, L.check.why[lang]], lang);
  }

  const bars = Math.min(page, 3);
  const meta = (
    <div className="ss-meta">
      <span>{L.title[lang]}</span>
      <b>{page <= 3 ? u.pageOf(page) : u.quick}</b>
    </div>
  );

  return (
    <div className="page ss ss-fit" style={{ paddingBottom: 0 }}>
      <Top u={u} onListen={() => speak(readText(), lang)} />
      <div style={{ padding: '0 4px' }}>
        {page <= 4 && (
          <>
            {meta}
            {page <= 3 && <Bars at={bars} />}
          </>
        )}

        {page === 1 && (
          <>
            <h1 style={{ marginTop: 18, fontSize: 30 }}>{L.spot.h[lang]}</h1>
            <div style={{ marginTop: 14 }}>
              <Sample s={L.spot} lang={lang} />
            </div>
            <ol className="ss-flags">
              {L.spot.flags.map((f, i) => (
                <li key={i}>
                  <span className="ss-n">{i + 1}</span>
                  <span>{f[lang]}</span>
                </li>
              ))}
            </ol>
            <div className="ss-rem">
              <small>{u.remember}</small>
              <b>{L.spot.remember[lang]}</b>
            </div>
          </>
        )}

        {page === 2 && (
          <>
            <h1 style={{ marginTop: 18, fontSize: 30 }}>{{ en: 'How they trick you', hi: 'वे कैसे फँसाते हैं', ml: 'അവർ എങ്ങനെ കബളിപ്പിക്കുന്നു' }[lang]}</h1>
            <p className="ss-lead" style={{ fontSize: 19, color: '#4A5550' }}>{L.how.sub[lang]}</p>
            <div className="ss-steps">
              {L.how.steps.map((s, i) => (
                <div className="ss-step" key={i}>
                  <div className="rail">
                    <div className="num">{i + 1}</div>
                    {i < 2 && <div className="line" />}
                  </div>
                  <div className="body">
                    <small>{{ en: 'STEP', hi: 'कदम', ml: 'ഘട്ടം' }[lang]} {i + 1}</small>
                    <b>{s.t[lang]}</b>
                    <p>{s.d[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="ss-rem" style={{ marginTop: 6 }}>
              <small>{u.remember}</small>
              <b>{L.how.remember[lang]}</b>
            </div>
          </>
        )}

        {page === 3 && (
          <>
            <h1 style={{ marginTop: 18, fontSize: 30 }}>{u.todoH}</h1>
            <div className="ss-gold" style={{ marginTop: 14 }}>
              <div className="ic" aria-hidden="true">🛑</div>
              <div>
                <small>{u.golden}</small>
                <b>{L.todo.rule[lang]}</b>
              </div>
            </div>
            <div className="ss-acts">
              {L.todo.acts.map((a, i) => (
                <div key={i}>
                  <span className="tk"><Icon name="check" size={18} stroke={3} /></span>
                  <span dangerouslySetInnerHTML={{ __html: a[lang] }} />
                </div>
              ))}
            </div>
            <div className="ss-help">
              <p>{u.already}</p>
              <a href="tel:1930" className="ss-sos" onClick={() => track('cheated_call')}>
                <span className="ic"><Icon name="phone" size={24} /></span>
                <span>
                  <b>{u.callBig}</b>
                  <small>{u.callSub}</small>
                </span>
              </a>
            </div>
          </>
        )}

        {page === 4 && (
          <>
            <h1 style={{ marginTop: 16, fontSize: 30 }}>{u.realQ}</h1>
            <p className="ss-lead" style={{ fontSize: 18, color: '#4A5550', margin: '0 0 16px' }}>{u.noReal}</p>
            <div className="ss-card">
              <div className="ss-who">
                <div className="av" aria-hidden="true">👤</div>
                <div>{L.check.from[lang]}</div>
              </div>
              <div className="ss-bub">{L.check.msg[lang]}</div>
            </div>
            {!picked ? (
              <div className="ss-q">
                <button onClick={() => pick('real')}>{u.real}</button>
                <button onClick={() => pick('fake')}>{u.fake}</button>
              </div>
            ) : (
              <div className={`ss-ans${picked === 'fake' ? '' : ' bad'}`} aria-live="polite">
                <b>{picked === 'fake' ? u.rightFake : u.notQuite}</b>
                <p>{L.check.why[lang]}</p>
              </div>
            )}
          </>
        )}

        {page === 5 && (
          <>
            <h1 style={{ marginTop: 22, fontSize: 30 }}>{next ? '✓ ' + u.done : u.allDone}</h1>
            <p className="ss-lead">{next ? L.title[lang] : u.allDoneSub}</p>
            <div className="ss-h">{u.tips}</div>
            <ul className="ss-tips">
              {(tips.current || []).map((r, i) => (
                <li key={i}>
                  <span>💡</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <a
              className="ss-btn soft"
              style={{ marginTop: 12 }}
              href={whatsappLink(u.shareMsg + '\n' + window.location.origin + '/scams')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('share', { meta: { from: 'safe-lesson' } })}
            >
              <Icon name="share" size={22} /> {u.share}
            </a>
            {next && (
              <div className="ss-next">
                <small>{u.upNext.toUpperCase()}</small>
                <div className="ss-tile">
                  <div className="ic" aria-hidden="true">{next.icon}</div>
                  <div className="tx">
                    <b>{next.title[lang]}</b>
                    <span>{auto ? u.startsIn(left) : u.pages}</span>
                  </div>
                </div>
                {auto && <div className="ss-count"><span style={{ width: `${((AUTO_SECONDS - left) / AUTO_SECONDS) * 100}%` }} /></div>}
              </div>
            )}
          </>
        )}
      </div>

      <div className={`ss-foot${page === 5 ? ' one' : ''}`}>
        {page === 1 && <button className="ss-btn" style={{ gridColumn: '1 / -1' }} onClick={() => go(2)}>{u.next} <Icon name="chevron" size={22} /></button>}
        {page === 2 && (
          <>
            <button className="ss-btn ghost" onClick={() => go(1)}><span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}><Icon name="chevron" size={22} /></span> {u.back}</button>
            <button className="ss-btn" onClick={() => go(3)}>{u.next} <Icon name="chevron" size={22} /></button>
          </>
        )}
        {page === 3 && (
          <>
            <button className="ss-btn ghost" onClick={() => go(2)}><span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}><Icon name="chevron" size={22} /></span> {u.back}</button>
            <button className="ss-btn" onClick={() => go(4)}>{u.quick}</button>
          </>
        )}
        {page === 4 && (
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {picked && <button className="ss-btn" onClick={finish}>{u.finish}</button>}
            <a href="tel:1930" className="ss-opt" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 48, fontSize: 18, fontWeight: 700, color: '#A4262C', textDecoration: 'none' }}>
              <Icon name="phone" size={20} /> {u.lostShort}
            </a>
          </div>
        )}
        {page === 5 && next && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {auto ? (
              <button className="ss-btn ghost" onClick={() => setAuto(false)}>{u.stop}</button>
            ) : (
              <Link href="/scams" className="ss-btn ghost">{u.lessonsBack}</Link>
            )}
            <Link href={`/scams/learn/${next.id}`} className="ss-btn">{u.startNow}</Link>
          </div>
        )}
        {page === 5 && !next && <Link href="/scams/test" className="ss-btn">{u.testStart}</Link>}
      </div>
    </div>
  );
}
