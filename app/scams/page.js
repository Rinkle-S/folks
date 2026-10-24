'use client';
// "Spot the scam": real-looking messages and calls. The parent picks Real or Scam and hears why.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icons';
import { AppBar, BottomNav } from '@/components/AppShell';
import { SCAMS } from '@/lib/scams';
import { GUIDES } from '@/lib/guides';
import { T } from '@/lib/i18n';
import { useLang, speak, stopSpeaking, track, whatsappLink, vibrate } from '@/lib/client';

// Links, OTP and PIN words, amounts and remote-access app names stand out once the answer is known.
const FLAG = /(https?:\/\/\S+|\bOTP\b|\bPIN\b|\bKYC\b|\bCVV\b|AnyDesk|₹\s?[\d,]+|Rs\s?[\d,.]+)/g;
function marked(text, on) {
  if (!on) return text;
  return text.split(FLAG).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

const HOOK_EMOJI = { worry: '😟', free: '🎁', trust: '👪', official: '🏛️' };
const ASK_EMOJI = { otp: '🔢', link: '🔗', money: '💸', app: '📲' };

// How the scam works in three steps, and the warning signs it showed.
function HowItWorks({ c, t }) {
  if (!c.hook) return null;
  return (
    <section className="how" aria-label={t.scamHowTitle}>
      <h3>{t.scamHowTitle}</h3>
      <div className="how-steps">
        <div>
          <span>{HOOK_EMOJI[c.hook]}</span>
          <small>{t.scamStep1}</small>
          <b>{t['scamHook_' + c.hook]}</b>
        </div>
        <i aria-hidden="true">→</i>
        <div>
          <span>{ASK_EMOJI[c.ask]}</span>
          <small>{t.scamStep2}</small>
          <b>{t['scamAsk_' + c.ask]}</b>
        </div>
        <i aria-hidden="true">→</i>
        <div className="move">
          <span>✋</span>
          <small>{t.scamStep3}</small>
          <b>{t.scamMove}</b>
        </div>
      </div>
      {c.flags && c.flags.length > 0 && (
        <>
          <h4>{t.scamFlagsTitle}</h4>
          <ul className="flags">
            {c.flags.map((f) => (
              <li key={f}>{t['scamFlag_' + f]}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

function Message({ c, lang, t, reveal }) {
  const label = c.kind === 'sms' ? t.scamSms : c.kind === 'call' ? t.scamCall : 'WhatsApp';
  return (
    <div className={`scam-msg ${c.kind}`}>
      <div className="scam-msg-top">
        <span className="scam-kind">
          <Icon name={c.kind === 'call' ? 'phone' : 'chats'} size={16} /> {label}
        </span>
        <span>{t.justNow}</span>
      </div>
      <div className="scam-from">
        {c.from}
        {c.saved ? ' ✓' : ''}
      </div>
      <div className="scam-text">{marked(c.msg[lang], reveal && c.answer === 'scam')}</div>
    </div>
  );
}

// The five signs to remember, shown after the practice and on the first screen.
function Signs({ t }) {
  return (
    <section className="how">
      <h3>{t.scamSignsTitle}</h3>
      <ul className="flags">
        {['rush', 'otp', 'link', 'free', 'official'].map((f) => (
          <li key={f}>{t['scamFlag_' + f]}</li>
        ))}
      </ul>
    </section>
  );
}

// What to do after being cheated: the national helpline and the NCRP portal.
function Cheated({ t }) {
  return (
    <section className="cheated">
      <h2 className="section-h">{t.cheatedTitle}</h2>
      <p className="muted">{t.cheatedLead}</p>
      <ol className="takeaways">
        {t.cheatedSteps.map((r, k) => (
          <li key={k}>{r}</li>
        ))}
      </ol>
      <a className="btn primary" href="tel:1930" onClick={() => track('cheated_call')}>
        <Icon name="phone" size={22} /> {t.cheatedCall}
      </a>
      <a className="btn ghost" href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" onClick={() => track('cheated_portal')}>
        {t.cheatedPortal}
      </a>
    </section>
  );
}

export default function Scams() {
  const [lang] = useLang();
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const c = SCAMS[i];

  useEffect(() => {
    if (!lang || finished || !started) return;
    speak([c.context ? c.context[lang] : '', c.msg[lang], T[lang].scamQ], lang);
  }, [i, lang, finished, started]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => stopSpeaking(), []);

  if (!lang) return <div className="page" />;
  const t = T[lang];

  if (!started) {
    return (
      <div className="shell">
        <AppBar />
        <main className="shell-main">
          <section className="scams-hero">
            <span className="medal lg">
              <Icon name="shieldCheck" size={44} />
            </span>
            <h1>{t.scamTitle}</h1>
            <p>{t.scamLead}</p>
            <button className="btn" onClick={() => setStarted(true)}>
              {t.scamStart}
            </button>
          </section>
          <h2 className="section-h">{t.remember}</h2>
          <ul className="takeaways">
            {t.scamRules.map((r, k) => (
              <li key={k}>{r}</li>
            ))}
          </ul>
          <Signs t={t} />
          {GUIDES['open-link-safe'] && (
            <Link className="btn ghost" href="/guide/open-link-safe">
              <Icon name="shieldCheck" size={22} /> {t.quickGuide}: {GUIDES['open-link-safe'].title[lang]}
            </Link>
          )}
          <Cheated t={t} />
        </main>
        <BottomNav active="safe" t={t} />
      </div>
    );
  }

  function pick(a) {
    if (picked) return;
    const right = a === c.answer;
    setPicked(a);
    vibrate(right ? 25 : [40, 60, 40]);
    if (right) setScore(score + 1);
    track('scam_answer', { meta: { id: c.id, picked: a, right } });
    speak([right ? t.scamRight : t.scamWrong, c.why[lang], c.todo[lang]], lang);
  }

  function next() {
    stopSpeaking();
    if (i + 1 >= SCAMS.length) {
      setFinished(true);
      track('scam_done', { meta: { score, total: SCAMS.length } });
      speak(t.scamScore(score, SCAMS.length), lang);
      return;
    }
    setPicked(null);
    setI(i + 1);
  }

  if (finished) {
    return (
      <div className="done">
        <div className="done-medal shield">
          <Icon name="shieldCheck" size={56} stroke={2.4} />
        </div>
        <h1 className="done-title">{t.scamScore(score, SCAMS.length)}</h1>
        <p className="done-sub" style={{ marginBottom: 16 }}>
          {t.remember}
        </p>
        <ul className="takeaways">
          {t.scamRules.map((r, k) => (
            <li key={k}>{r}</li>
          ))}
        </ul>
          <Cheated t={t} />
        <a
          className="btn wa-btn"
          href={whatsappLink(t.scamShare(score, SCAMS.length) + '\n' + window.location.origin + '/scams')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('share', { meta: { from: 'scams' } })}
        >
          <Icon name="share" size={22} /> {t.scamShareBtn}
        </a>
        <button
          className="btn ghost"
          onClick={() => {
            setI(0);
            setScore(0);
            setPicked(null);
            setFinished(false);
          }}
        >
          {t.practiceAgain}
        </button>
        <Link className="btn ghost" href="/">
          {t.home}
        </Link>
      </div>
    );
  }

  const right = picked && picked === c.answer;

  return (
    <div className="page">
      <div className="scam-top">
        <Link href="/" className="ptop-btn" aria-label={t.exit} onClick={() => stopSpeaking()}>
          <Icon name="close" size={24} />
        </Link>
        <div className="progress">
          <div className="bar">
            <span style={{ width: `${(i / SCAMS.length) * 100}%` }} />
          </div>
          <small>{t.step(i + 1, SCAMS.length)}</small>
        </div>
      </div>
      {c.context && <p className="scam-context">{c.context[lang]}</p>}
      <Message c={c} lang={lang} t={t} reveal={!!picked} />

      {!picked ? (
        <>
          <p className="scam-q">{t.scamQ}</p>
          <div className="scam-btns">
            <button className="btn safe" onClick={() => pick('safe')}>
              <Icon name="check" size={24} stroke={3} /> {t.scamSafe}
            </button>
            <button className="btn danger" onClick={() => pick('scam')}>
              <Icon name="shield" size={24} /> {t.scamScam}
            </button>
          </div>
        </>
      ) : (
        <div className={`scam-result ${right ? 'good' : 'bad'}`} aria-live="polite">
          <b>
            {right ? t.scamRight : t.scamWrong} {c.answer === 'scam' ? t.scamScam : t.scamSafe}
          </b>
          <p>{c.why[lang]}</p>
          <p className="scam-todo">{c.todo[lang]}</p>
          {c.answer === 'scam' && <HowItWorks c={c} t={t} />}
          <button className="btn primary" onClick={next}>
            {t.next}
          </button>
          <button className="chip" style={{ marginTop: 10 }} onClick={() => speak([c.why[lang], c.todo[lang]], lang)}>
            <Icon name="volume" size={20} /> {t.listen}
          </button>
        </div>
      )}
    </div>
  );
}
