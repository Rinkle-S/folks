'use client';
// Tell us more, by typing or by voice. The mic uses the browser's own speech recognition (nothing is recorded or kept),
// so it is hidden where the browser cannot do it, and typing always works.
import { useEffect, useRef, useState } from 'react';
import Icon from './Icons';
import { track } from '@/lib/client';
import { langCode } from '@/lib/langs';

// The text box with a mic. Controlled, so a parent screen can send the text with its own button.
export function FeedbackBox({ t, lang, value, onChange, onVoice }) {
  const [canListen, setCanListen] = useState(false);
  const [listening, setListening] = useState(false);
  const [fail, setFail] = useState(false);
  const recRef = useRef(null);
  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    setCanListen(!!SR);
    if (SR && navigator.brave && typeof navigator.brave.isBrave === 'function') {
      navigator.brave.isBrave().then((yes) => yes && setCanListen(false)).catch(() => {});
    }
    return () => {
      try {
        recRef.current && recRef.current.abort();
      } catch {}
    };
  }, []);

  function toggleMic() {
    if (listening && recRef.current) {
      try {
        recRef.current.stop();
      } catch {}
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    try {
      const rec = new SR();
      rec.lang = langCode(lang);
      rec.interimResults = false;
      rec.continuous = false;
      rec.maxAlternatives = 1;
      let heard = false;
      rec.onresult = (e) => {
        heard = true;
        const said = e.results[0][0].transcript.trim();
        const cur = valueRef.current;
        onChange((cur ? cur.trim() + ' ' : '') + said);
        onVoice && onVoice();
      };
      rec.onerror = (e) => {
        if (e.error !== 'aborted' && e.error !== 'no-speech') setFail(true);
        setListening(false);
      };
      rec.onend = () => setListening(false);
      recRef.current = rec;
      setFail(false);
      setListening(true);
      rec.start();
    } catch {
      setListening(false);
      setFail(true);
    }
  }

  return (
    <div className="fb-box">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.fbPlaceholder}
        aria-label={t.fbPlaceholder}
        rows={4}
        maxLength={600}
      />
      {canListen && (
        <button type="button" className={`btn ghost fb-mic ${listening ? 'on' : ''}`} onClick={toggleMic} aria-pressed={listening}>
          <Icon name="mic" size={24} /> {listening ? t.fbStop : t.fbSpeak}
        </button>
      )}
      {listening && <p className="muted fb-hint" aria-live="polite">{t.fbListening}</p>}
      {fail && <p className="warn-text fb-hint">{t.fbMicFail}</p>}
    </div>
  );
}

// A "Tell us more" button that opens the box with a Send button. `type` is the event it is recorded as.
export default function FeedbackAsk({ t, lang, lesson, where, v, type = 'feedback_detail', open: startOpen = false, title }) {
  const [open, setOpen] = useState(startOpen);
  const [text, setText] = useState('');
  const [voice, setVoice] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) return <p className="thanks">{t.fbThanks}</p>;
  if (!open)
    return (
      <button className="btn ghost" type="button" onClick={() => setOpen(true)}>
        <Icon name="edit" size={22} /> {title || t.fbTell}
      </button>
    );
  return (
    <div className="fb-more">
      {title && <p>{title}</p>}
      <FeedbackBox t={t} lang={lang} value={text} onChange={setText} onVoice={() => setVoice(true)} />
      <button
        className="btn primary"
        type="button"
        disabled={!text.trim()}
        onClick={() => {
          track(type, { lesson, meta: { note: text.trim().slice(0, 600), via: voice ? 'voice' : 'typed', lang, where, v } });
          setSent(true);
        }}
      >
        {t.fbSend}
      </button>
    </div>
  );
}
