'use client';
// Real or fake test: six messages picked at random. Two big buttons, a short answer, three tips at the end.
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icons';
import { BottomNav } from '@/components/AppShell';
import { SCAMS } from '@/lib/scams';
import { SAFE_UI } from '@/lib/safeLessons';
import { T } from '@/lib/i18n';
import { useLang, speak, stopSpeaking, track, vibrate, whatsappLink } from '@/lib/client';

const ROUND = 6;

// Six random cards, always with at least one genuine message so "Real" is also practised.
function pickRound() {
  const shuffled = [...SCAMS].sort(() => Math.random() - 0.5);
  const real = shuffled.find((c) => c.answer === 'safe');
  const rest = shuffled.filter((c) => c !== real).slice(0, ROUND - 1);
  return [real, ...rest].sort(() => Math.random() - 0.5);
}

export default function Test() {
  const [lang] = useLang();
  const [cards, setCards] = useState(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [tipKeys, setTipKeys] = useState([]);

  useEffect(() => setCards(pickRound()), []);
  const c = cards && cards[i];

  useEffect(() => {
    if (!lang || !c || finished) return;
    speak([c.context ? c.context[lang] : '', c.msg[lang], SAFE_UI[lang].realQ], lang);
  }, [i, lang, cards, finished]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => stopSpeaking(), []);

  const signs = useMemo(() => ['rush', 'otp', 'link', 'free', 'official', 'money'], []);

  if (!lang || !cards) return <div className="page" />;
  const t = T[lang];
  const u = SAFE_UI[lang];

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
    if (i + 1 >= cards.length) {
      setFinished(true);
      setTipKeys([...signs].sort(() => Math.random() - 0.5).slice(0, 3));
      track('scam_done', { meta: { score, total: cards.length } });
      speak(t.scamScore(score, cards.length), lang);
      return;
    }
    setPicked(null);
    setI(i + 1);
  }

  function again() {
    setCards(pickRound());
    setI(0);
    setScore(0);
    setPicked(null);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="page ss has-nav">
        <div className="ss-top">
          <Link href="/scams" className="ss-back">
            <span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}><Icon name="chevron" size={22} /></span> {u.title}
          </Link>
        </div>
        <h1 style={{ marginTop: 18 }}>{t.scamScore(score, cards.length)}</h1>
        <div className="ss-h">{u.tips}</div>
        <ul className="ss-tips">
          {tipKeys.map((k) => (
            <li key={k}>
              <span>💡</span>
              <span>{t['scamFlag_' + k]}</span>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 }}>
          <button className="ss-btn" onClick={again}>{u.again}</button>
          <a
            className="ss-btn soft"
            href={whatsappLink(t.scamShare(score, cards.length) + '\n' + window.location.origin + '/scams')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('share', { meta: { from: 'scams' } })}
          >
            <Icon name="share" size={22} /> {u.share}
          </a>
          <Link href="/scams" className="ss-btn ghost">{u.home}</Link>
          <a href="tel:1930" className="ss-sos" onClick={() => track('cheated_call')}>
            <span className="ic"><Icon name="phone" size={22} /></span>
            <span style={{ flex: 1 }}>
              <small>{u.lost}</small>
              <b>{u.call}</b>
            </span>
          </a>
        </div>
        <BottomNav active="safe" t={t} />
      </div>
    );
  }

  const right = picked && picked === c.answer;
  const label = c.kind === 'sms' ? t.scamSms : c.kind === 'call' ? t.scamCall : 'WhatsApp';

  return (
    <div className="page ss ss-fit">
      <div className="ss-top">
        <Link href="/scams" className="ss-back" onClick={() => stopSpeaking()}>
          <span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}><Icon name="chevron" size={22} /></span> {u.title}
        </Link>
        <span style={{ fontSize: 16, color: '#4A5550', paddingRight: 8 }}><b>{u.testOf(i + 1, cards.length)}</b></span>
      </div>
      <div className="ss-bars" style={{ gridTemplateColumns: `repeat(${cards.length}, minmax(0, 1fr))`, marginTop: 8 }}>
        {cards.map((_, n) => (
          <i key={n} className={n <= i ? 'on' : ''} />
        ))}
      </div>
      <h1>{u.realQ}</h1>
      {c.context && <p className="ss-sub">{c.context[lang]}</p>}
      <div className="ss-card">
        <div className="ss-who">
          <div className="av" aria-hidden="true">{c.kind === 'call' ? '📞' : '💬'}</div>
          <div>
            {c.from}
            {c.saved ? ' ✓' : ''}
            <small>{label}</small>
          </div>
        </div>
        <div className={`ss-bub${picked ? ' ss-clamp' : ''}`}>{c.msg[lang]}</div>
      </div>

      {!picked ? (
        <div className="ss-q">
          <button onClick={() => pick('safe')}>{u.real}</button>
          <button onClick={() => pick('scam')}>{u.fake}</button>
        </div>
      ) : (
        <>
          <div className={`ss-ans${right ? '' : ' bad'}`} aria-live="polite">
            <b>
              {right ? t.scamRight : t.scamWrong} {c.answer === 'scam' ? u.fake : u.real}
            </b>
            <p>{c.why[lang]}</p>
            <p><b>{c.todo[lang]}</b></p>
          </div>
          <button className="ss-btn" style={{ marginTop: 16 }} onClick={next}>{t.next}</button>
        </>
      )}
      <a href="tel:1930" className="ss-opt" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 48, marginTop: 4, fontSize: 18, fontWeight: 700, color: '#A4262C', textDecoration: 'none' }}>
        <Icon name="phone" size={20} /> {u.lostShort}
      </a>
    </div>
  );
}
