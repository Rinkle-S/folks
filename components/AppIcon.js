import Icon from './Icons';

// Simple recognisable app badges (colour + shape), not the real logos.
const STYLE = {
  gpay: { bg: '#ffffff', border: '#dadce0', fg: '#0b57d0', icon: 'upi' },
  whatsapp: { bg: '#25d366', border: '#25d366', fg: '#ffffff', icon: 'chats' },
  drive: { bg: '#ffffff', border: '#dadce0', fg: '#188038', icon: 'bills' },
};

export default function AppIcon({ app, size = 34 }) {
  const s = STYLE[app] || STYLE.gpay;
  return (
    <span
      className="app-icon"
      style={{ width: size, height: size, background: s.bg, borderColor: s.border, color: s.fg }}
      aria-hidden="true"
    >
      <Icon name={s.icon} size={size * 0.58} stroke={2.2} />
    </span>
  );
}
