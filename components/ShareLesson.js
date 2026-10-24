'use client';
// Copy a lesson link to send to a parent. It only reacts to a tap exactly on the small round icon (and its words),
// and it never opens anything by itself: it copies the message with the link and says so. That keeps a parent from
// sharing by mistake. Adult children paste it into WhatsApp.
import { useState } from 'react';
import { MSG } from '@/lib/shareMsg';
import { track } from '@/lib/client';
import { getProfile } from '@/lib/profile';

// The round "share" mark: white dots joined by lines on a dark circle.
export function ShareMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="24" fill="#4b5c56" />
      <path d="M18 24.5l12-6.5M18 23.5l12 6.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="31" cy="17" r="4" fill="#4b5c56" stroke="#fff" strokeWidth="2.6" />
      <circle cx="17" cy="24" r="4" fill="#4b5c56" stroke="#fff" strokeWidth="2.6" />
      <circle cx="31" cy="31" r="4" fill="#4b5c56" stroke="#fff" strokeWidth="2.6" />
    </svg>
  );
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function lessonMessage({ id, kind = 'lesson', title, lang }) {
  const from = (getProfile().name || '').trim();
  const params = new URLSearchParams({ lang });
  if (from) params.set('from', from);
  const link = `${window.location.origin}/${kind === 'guide' ? 'guide' : 'lesson'}/${id}?${params.toString()}`;
  const m = MSG[lang] || MSG.en;
  return (kind === 'guide' ? m.guide : m.lesson)(title, link, from ? `\n${from}` : '');
}

// look: "icon" (default, only the round mark), "text" (mark and a few words, under a card) or "act" (mark with a label, in the end-of-lesson row).
export default function ShareLesson({ id, kind, title, lang, t, where, look = 'icon', text }) {
  const [state, setState] = useState(''); // '' | copied | failed
  const style = look === 'text' || text ? 'text' : look;
  async function go() {
    const ok = await copyText(lessonMessage({ id, kind, title, lang }));
    track('share', { lesson: id, meta: { where, via: 'copy', ok, lang, kind } });
    setState(ok ? 'copied' : 'failed');
    setTimeout(() => setState(''), 3500);
  }
  const label = `${t.shareLesson}: ${title}`;
  return (
    <>
      {style === 'act' ? (
        <button type="button" className="act" onClick={go} aria-label={label}>
          <span className="act-ic"><ShareMark size={56} /></span>
          {t.shareShort}
        </button>
      ) : style === 'text' ? (
        <span className="share-text">
          <button type="button" className="share-link" onClick={go} aria-label={label}>
            <ShareMark size={28} /> {t.shareLesson}
          </button>
        </span>
      ) : (
        <button type="button" className="share-dot" onClick={go} aria-label={label}>
          <ShareMark size={36} />
        </button>
      )}
      {state && (
        <span className={`copied-toast ${state === 'failed' ? 'bad' : ''}`} role="status">
          {state === 'copied' ? t.linkCopied : t.linkCopyFail}
        </span>
      )}
    </>
  );
}
