// Practice Android home screen: the first step of every lesson is finding the app's icon.
import { HIDDEN_APPS } from '@/lib/hidden';
import Icon from '../Icons';
import AppIcon from '../AppIcon';

const SYSTEM = {
  phone: { bg: '#1e8e3e', icon: 'phone', label: 'Phone' },
  messages: { bg: '#1a73e8', icon: 'chats', label: 'Messages' },
  camera: { bg: '#5f6368', icon: 'camera', label: 'Camera' },
  gallery: { bg: '#e8710a', icon: 'image', label: 'Gallery' },
  settings: { bg: '#455a64', icon: 'gear', label: 'Settings' },
  clock: { bg: '#3949ab', icon: 'history', label: 'Clock' },
  calendar: { bg: '#d93025', icon: 'calendar', label: 'Calendar' },
};

const BRAND = {
  gpay: 'Google Pay',
  whatsapp: 'WhatsApp',
  uber: 'Uber',
  rapido: 'Rapido',
  yono: 'YONO SBI',
  irctc: 'IRCTC',
  zomato: 'Zomato',
  maps: 'Maps',
};
const POOL = Object.keys(BRAND).filter((id) => !HIDDEN_APPS.has(id));

// Same phone, but the app being taught sits in a different place each time, like on a real phone.
function layout(app) {
  const seed = [...String(app)].reduce((a, c) => a + c.charCodeAt(0), 0);
  const others = POOL.filter((x) => x !== app);
  const rot = seed % others.length;
  const eight = [...others.slice(rot), ...others.slice(0, rot)].slice(0, 7);
  eight.splice(seed % 8, 0, app);
  return ['gallery', 'camera', 'settings', 'clock', ...eight.filter((x) => BRAND[x])];
}

// The grid mixes everyday system apps with the lesson apps, like a real phone.
const DOCK = ['phone', 'messages', 'camera', 'settings'];

function Tile({ id, size = 50, label = true }) {
  const sys = SYSTEM[id];
  return (
    <div className="ph-app" data-t={sys ? undefined : `app-${id}`}>
      {sys ? (
        <span className="ph-sys" style={{ width: size, height: size, background: sys.bg }}>
          <Icon name={sys.icon} size={size * 0.5} stroke={2.2} />
        </span>
      ) : (
        <AppIcon app={id} size={size} />
      )}
      {label && <small>{sys ? sys.label : BRAND[id]}</small>}
    </div>
  );
}

export function PhoneHome({ app }) {
  const GRID = layout(BRAND[app] ? app : 'gpay');
  return (
    <div className="app ph">
      <div className="ph-status">
        <span>10:30</span>
        <span>4G ▮▮▮ 82%</span>
      </div>
      <div className="ph-clock">
        <b>10:30</b>
        <span>Friday, 23 October</span>
      </div>
      <div className="ph-grid">
        {GRID.map((id) => (
          <Tile key={id} id={id} />
        ))}
      </div>
      <div className="ph-search">
        <Icon name="search" size={18} /> Search
        <Icon name="mic" size={18} />
      </div>
      <div className="ph-dock">
        {DOCK.map((id) => (
          <Tile key={id} id={id} size={46} label={false} />
        ))}
      </div>
    </div>
  );
}
