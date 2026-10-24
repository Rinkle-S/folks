'use client';
// Share a lesson or guide link. Opens the phone's share sheet when there is one, otherwise WhatsApp.
import Icon from './Icons';
import { MSG } from '@/lib/shareMsg';
import { track, whatsappLink } from '@/lib/client';
import { getProfile } from '@/lib/profile';

export function shareItem({ id, kind = 'lesson', title, lang, where }) {
  const from = (getProfile().name || '').trim();
  const params = new URLSearchParams({ lang });
  if (from) params.set('from', from);
  const link = `${window.location.origin}/${kind === 'guide' ? 'guide' : 'lesson'}/${id}?${params.toString()}`;
  const m = MSG[lang] || MSG.en;
  const sign = from ? `\n${from}` : '';
  const text = (kind === 'guide' ? m.guide : m.lesson)(title, link, sign);
  const done = (via) => track('share', { lesson: id, meta: { where, via, lang, kind } });
  if (navigator.share) {
    navigator.share({ text }).then(() => done('sheet')).catch(() => {});
  } else {
    window.open(whatsappLink(text), '_blank', 'noopener');
    done('whatsapp');
  }
}

// big: a full-width button with a label. Otherwise a 56px square icon button (for lesson lists).
export default function ShareLesson({ id, kind, title, lang, t, where, big }) {
  const go = () => shareItem({ id, kind, title, lang, where });
  if (big)
    return (
      <button className="btn ghost" type="button" onClick={go}>
        <Icon name="share" size={22} /> {t.shareLesson}
      </button>
    );
  return (
    <button className="share-sq" type="button" onClick={go} aria-label={`${t.shareLesson}: ${title}`}>
      <Icon name="share" size={22} />
      <small>{t.shareShort}</small>
    </button>
  );
}
