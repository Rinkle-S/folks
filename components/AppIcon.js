import Icon from './Icons';

// Simple recognisable app badges (colour + shape), not the real logos.
const STYLE = {
  gpay: { bg: '#ffffff', border: '#dadce0', fg: '#0b57d0', icon: 'upi' },
  phonepe: { bg: '#5f259f', border: '#5f259f', fg: '#ffffff', icon: 'upi' },
  paytm: { bg: '#00b9f1', border: '#00b9f1', fg: '#ffffff', icon: 'upi' },
  whatsapp: { bg: '#25d366', border: '#25d366', fg: '#ffffff', icon: 'chats' },
  drive: { bg: '#ffffff', border: '#dadce0', fg: '#188038', icon: 'bills' },
  youtube: { bg: '#ff0000', border: '#ff0000', fg: '#ffffff', icon: 'video' },
  other: { bg: '#f5f5f4', border: '#d6d3d1', fg: '#57534e', icon: 'more' },
};

export default function AppIcon({ app, size = 34 }) {
  const s = STYLE[app] || STYLE.other;
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
