// Android system screens (Pixel / stock style): Settings pages, quick settings, Clock, Contacts,
// Play Store, Gallery, home-screen menus, Messages and Gmail.
import Icon from '../Icons';
import AppIcon from '../AppIcon';
import { Av, Status, Row, Keys, PinDots } from './ui';

// ---------- Settings ----------
const MAIN = [
  { t: 'set-network', icon: 'wifi', color: '#1a73e8', title: 'Network & internet', sub: 'Mobile, Wi-Fi, hotspot' },
  { t: 'set-devices', icon: 'bluetooth', color: '#1e8e3e', title: 'Connected devices', sub: 'Bluetooth, pairing' },
  { t: 'set-apps', icon: 'apps', color: '#e8710a', title: 'Apps', sub: 'Recent apps, default apps' },
  { t: 'set-notifications', icon: 'bell', color: '#d93025', title: 'Notifications', sub: 'Notification history, conversations' },
  { t: 'set-battery', icon: 'battery', color: '#188038', title: 'Battery', sub: '82%' },
  { t: 'set-storage', icon: 'storage', color: '#7b1fa2', title: 'Storage', sub: '58% used · 54 GB free' },
  { t: 'set-sound', icon: 'volume', color: '#00897b', title: 'Sound & vibration', sub: 'Volume, haptics, Do Not Disturb' },
  { t: 'set-display', icon: 'sun', color: '#f9ab00', title: 'Display', sub: 'Dark theme, font size, brightness' },
  { t: 'set-wallpaper', icon: 'palette2', color: '#c2185b', title: 'Wallpaper & style', sub: 'Colours, themed icons' },
  { t: 'set-security', icon: 'lock', color: '#3949ab', title: 'Security & privacy', sub: 'Screen lock, Find My Device' },
  { t: 'set-safety', icon: 'sos', color: '#d93025', title: 'Safety & emergency', sub: 'Emergency SOS, medical info' },
  { t: 'set-system', icon: 'info', color: '#5f6368', title: 'System', sub: 'Languages, gestures, backup' },
];

export function SetMain() {
  return (
    <div className="app k-set">
      <Status />
      <div className="k-set-big">Settings</div>
      <div className="k-set-search">
        <Icon name="search" size={20} /> Search settings
      </div>
      <div className="k-set-card">
        {MAIN.map((r) => (
          <Row key={r.t} {...r} />
        ))}
      </div>
    </div>
  );
}

// A Settings sub-page. items: rows { t, title, sub, toggle, icon, color, radio, right }; sections: [{ h, items }]
export function SetPage({ title, items, sections, top, button, toast }) {
  const secs = sections || [{ items }];
  return (
    <div className="app k-set">
      <Status />
      <div className="k-set-bar">
        <span data-t="back">
          <Icon name="back" size={22} />
        </span>
      </div>
      <div className="k-set-title">{title}</div>
      {top}
      {secs.map((s, i) => (
        <div key={i}>
          {s.h && <div className="k-set-h">{s.h}</div>}
          <div className="k-set-card">
            {s.items.map((r, j) => (
              <Row key={j} {...r} />
            ))}
          </div>
        </div>
      ))}
      {button && (
        <div className="k-set-btnrow">
          <span className="k-pill-btn" data-t={button.t}>
            {button.label}
          </span>
        </div>
      )}
      {toast && <div className="k-toast">{toast}</div>}
    </div>
  );
}

// Choose / confirm a screen-lock PIN.
export function SetPin({ title = 'Choose your PIN', sub = 'PIN must be at least 4 digits', filled = 0 }) {
  return (
    <div className="app k-set k-pinpage">
      <Status />
      <div className="k-pin-ic">
        <Icon name="lock" size={28} />
      </div>
      <div className="k-pin-t">{title}</div>
      <div className="k-pin-s">{sub}</div>
      <PinDots n={4} filled={filled} color="#1a73e8" />
      <Keys />
    </div>
  );
}

// ---------- Quick settings ----------
const QS = [
  { k: 'wifi', icon: 'wifi', label: 'Internet', sub: 'Home Wi-Fi' },
  { k: 'bluetooth', icon: 'bluetooth', label: 'Bluetooth', sub: 'Off' },
  { k: 'torch', icon: 'torch', label: 'Torch', sub: 'Off' },
  { k: 'dnd', icon: 'dnd', label: 'Do Not Disturb', sub: 'Off' },
  { k: 'airplane', icon: 'plane', label: 'Airplane mode', sub: 'Off' },
  { k: 'battery', icon: 'battery', label: 'Battery Saver', sub: 'Off' },
  { k: 'rotate', icon: 'rotate', label: 'Auto-rotate', sub: 'On' },
  { k: 'hotspot', icon: 'wifi', label: 'Hotspot', sub: 'Off' },
];
export function QuickSettings({ on = ['wifi', 'rotate'], note, sound }) {
  return (
    <div className="app k-qs">
      <Status dark />
      <div className="k-qs-bright">
        <Icon name="sun" size={18} />
        <i />
      </div>
      <div className="k-qs-grid">
        {sound && (
          <div className={`k-qs-tile ${sound === 'Sound' ? 'on' : ''}`} data-t="qs-sound">
            <Icon name={sound === 'Mute' ? 'mute' : 'volume'} size={20} />
            <span>
              <b>{sound}</b>
              <small>{sound === 'Sound' ? 'Ringer on' : sound === 'Vibrate' ? 'Vibrate only' : 'Silent'}</small>
            </span>
          </div>
        )}
        {QS.filter((q) => !(sound && q.k === 'hotspot')).map((q) => {
          const isOn = on.includes(q.k);
          return (
            <div key={q.k} className={`k-qs-tile ${isOn ? 'on' : ''}`} data-t={`qs-${q.k}`}>
              <Icon name={q.icon} size={20} />
              <span>
                <b>{q.label}</b>
                <small>{isOn ? (q.k === 'wifi' ? 'Home Wi-Fi' : 'On') : q.sub === 'On' ? 'Off' : q.sub}</small>
              </span>
            </div>
          );
        })}
      </div>
      {note && <div className="k-qs-note">{note}</div>}
      <div className="k-qs-handle" />
    </div>
  );
}

// ---------- Home screen extras ----------
// The home screen with a grid of apps. pull: the very top is the target (swipe down).
// hold: an app to "press and hold" (gets data-t 'hold'); menu: popup items shown over it.
const SYS = {
  phone: { bg: '#1e8e3e', icon: 'phone', label: 'Phone' },
  messages: { bg: '#1a73e8', icon: 'chats', label: 'Messages' },
  camera: { bg: '#5f6368', icon: 'camera', label: 'Camera' },
  gallery: { bg: '#e8710a', icon: 'image', label: 'Gallery' },
  settings: { bg: '#455a64', icon: 'gear', label: 'Settings' },
  clock: { bg: '#3949ab', icon: 'alarm', label: 'Clock' },
  play: { bg: '#01875f', icon: 'play', label: 'Play Store' },
  photos: { bg: '#f29900', icon: 'image', label: 'Photos' },
  gmail: { bg: '#d93025', icon: 'mail', label: 'Gmail' },
  chrome: { bg: '#1a73e8', icon: 'globe', label: 'Chrome' },
  contacts: { bg: '#1a73e8', icon: 'user', label: 'Contacts' },
  candy: { bg: '#e91e63', icon: 'star', label: 'Candy Game' },
};
const NAMES = { gpay: 'Google Pay', whatsapp: 'WhatsApp', youtube: 'YouTube', phonepe: 'PhonePe', paytm: 'Paytm', yono: 'YONO SBI', icici: 'iMobile', maps: 'Maps', spotify: 'Spotify', instagram: 'Instagram' };
export function AHome({ open, pull, hold, menu, holdEmpty, apps = ['gpay', 'whatsapp', 'youtube'] }) {
  const base = ['gallery', 'camera', 'settings', 'clock', 'play', 'photos', 'gmail', 'chrome', 'contacts', ...apps, ...(hold === 'candy' ? ['candy'] : [])];
  const grid = open && !base.includes(open) && open !== 'phone' && open !== 'messages' ? [...base, open] : base;
  return (
    <div className="app ph k-home">
      <div className="ph-status" data-t={pull ? 'pull' : undefined}>
        <span>10:30</span>
        <span>4G ▮▮▮ 82%</span>
      </div>
      {pull && (
        <div className="k-pull" data-t="pull">
          <Icon name="chevron" size={18} /> Swipe down from here
        </div>
      )}
      <div className="ph-clock">
        <b>10:30</b>
        <span>Friday, 23 October</span>
      </div>
      <div className="ph-grid">
        {grid.map((id) => {
          const sys = SYS[id];
          const t = open === id ? `open-${id}` : hold === id ? 'hold' : undefined;
          return (
            <div key={id} className={`ph-app ${hold === id && menu ? 'held' : ''}`} data-t={t}>
              {sys ? (
                <span className="ph-sys" style={{ width: 50, height: 50, background: sys.bg }}>
                  <Icon name={sys.icon} size={25} stroke={2.2} />
                </span>
              ) : (
                <AppIcon app={id} size={50} />
              )}
              <small>{sys ? sys.label : NAMES[id] || id}</small>
            </div>
          );
        })}
      </div>
      {holdEmpty && (
        <div className="k-empty" data-t="hold-empty">
          Empty space
        </div>
      )}
      {menu && (
        <div className="k-hold-menu">
          {menu.map((m, i) => (
            <div key={i} data-t={m.t}>
              <Icon name={m.icon} size={18} /> {m.label}
            </div>
          ))}
        </div>
      )}
      <div className="ph-search">
        <Icon name="search" size={18} /> Search
        <Icon name="mic" size={18} />
      </div>
      <div className="ph-dock">
        {['phone', 'messages', 'chrome', 'camera'].map((id) => (
          <div key={id} className="ph-app" data-t={open === id ? `open-${id}` : undefined}>
            <span className="ph-sys" style={{ width: 46, height: 46, background: SYS[id].bg }}>
              <Icon name={SYS[id].icon} size={23} stroke={2.2} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Wallpaper preview with the "Set wallpaper" button.
export function WallPreview() {
  return (
    <div className="app k-wall">
      <div className="k-wall-pic">👨‍👩‍👧</div>
      <div className="k-wall-time">10:30</div>
      <div className="k-wall-bar">
        <Icon name="back" size={22} color="#fff" />
        <span className="k-pill-btn" data-t="set">
          Set wallpaper
        </span>
      </div>
    </div>
  );
}

// ---------- Clock ----------
export function Clock({ tab = 'alarm', alarms = [], fab, picker }) {
  return (
    <div className="app k-clock">
      <Status />
      <div className="k-clock-bar">
        <b>{tab === 'alarm' ? 'Alarm' : 'Clock'}</b>
        <Icon name="more" size={22} />
      </div>
      {tab === 'clock' && (
        <div className="k-clock-now">
          <b>10:30</b>
          <small>Fri, 23 Oct · India Standard Time</small>
        </div>
      )}
      {tab === 'alarm' && (
        <div className="k-alarms">
          {alarms.length === 0 && <div className="k-muted">No alarms</div>}
          {alarms.map((a, i) => (
            <div key={i} className="k-alarm">
              <b>{a.time}</b>
              <small>{a.days}</small>
              <span className={`k-switch ${a.on ? 'on' : ''}`}>
                <i />
              </span>
            </div>
          ))}
        </div>
      )}
      {tab === 'alarm' && (
        <div className="k-clock-fab" data-t={fab ? 'fab' : undefined}>
          <Icon name="plus" size={30} />
        </div>
      )}
      <div className="k-clock-nav">
        {[
          ['alarm', 'alarm', 'Alarm'],
          ['clock', 'clock', 'Clock'],
          ['timer', 'timer', 'Timer'],
          ['stopwatch', 'timer', 'Stopwatch'],
          ['bedtime', 'moon', 'Bedtime'],
        ].map(([k, ic, l]) => (
          <div key={k} className={tab === k ? 'on' : ''} data-t={`tab-${k}`}>
            <span>
              <Icon name={ic} size={20} />
            </span>
            {l}
          </div>
        ))}
      </div>
      {picker && (
        <div className="k-dim">
          <div className="k-timepick">
            <small>Select time</small>
            <div className="k-tp-top">
              <b className="on">06</b>:<b>30</b>
              <span className="k-ampm">
                <i className="on">AM</i>
                <i>PM</i>
              </span>
            </div>
            <div className="k-dial">
              {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => (
                <span key={n} className={n === 6 ? 'on' : ''} style={{ transform: `rotate(${i * 30}deg) translate(0, -96px) rotate(${-i * 30}deg)` }}>
                  {n}
                </span>
              ))}
              <i className="k-hand" />
            </div>
            <div className="k-dialog-act">
              <span data-t="cancel">Cancel</span>
              <span data-t={picker === 'ok' ? 'ok' : undefined}>OK</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Phone / Contacts ----------
const CONTACTS = ['Anil', 'Dr. Mehta', 'Pinky', 'Priya', 'Rahul (Beta)', 'Ramesh Bhaiya', 'Sunita'];
export function Contacts({ tab = 'contacts', fab, number }) {
  return (
    <div className="app k-phone">
      <Status />
      <div className="k-dial-search">
        <Icon name="search" size={20} /> Search contacts & places
        <Av name="K" size={30} color="#1a73e8" />
      </div>
      {tab === 'keypad' ? (
        <div className="k-keypad-wrap">
          <div className="k-number">{number || ''}</div>
          <Keys />
          <div className="k-callbtn" data-t="call">
            <Icon name="phone" size={26} color="#fff" />
          </div>
        </div>
      ) : (
        <>
          {tab === 'contacts' && (
            <div className="k-row" data-t={fab ? 'create' : undefined}>
              <span className="k-row-ic" style={{ background: '#d3e3fd', color: '#0b57d0' }}>
                <Icon name="plus" size={20} />
              </span>
              <span className="k-row-tx">
                <b>Create new contact</b>
              </span>
            </div>
          )}
          {(tab === 'contacts' ? CONTACTS : ['Rahul (Beta)', 'Sunita', 'Ramesh Bhaiya']).map((c) => (
            <Row key={c} title={c} sub={tab === 'recents' ? 'Mobile · 2 h ago' : undefined} av={{ name: c }} />
          ))}
        </>
      )}
      <div className="k-dial-nav">
        {[
          ['favourites', 'star', 'Favourites'],
          ['recents', 'history', 'Recents'],
          ['contacts', 'user', 'Contacts'],
          ['keypad', 'grid', 'Keypad'],
        ].map(([k, ic, l]) => (
          <div key={k} className={tab === k ? 'on' : ''} data-t={`tab-${k}`}>
            <span>
              <Icon name={ic} size={20} />
            </span>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactForm({ name = '', phone = '' }) {
  return (
    <div className="app k-phone">
      <Status />
      <div className="k-form-bar">
        <span data-t="close">
          <Icon name="close" size={22} />
        </span>
        <b>Create contact</b>
        <span className="k-pill-btn sm" data-t="save">
          Save
        </span>
      </div>
      <div className="k-form-pic">
        <Icon name="image" size={30} />
        <small>Add picture</small>
      </div>
      <div className="k-field">
        <Icon name="user" size={20} />
        <span className={name ? 'filled' : ''}>
          <small>First name</small>
          {name || ' '}
        </span>
      </div>
      <div className="k-field">
        <span style={{ width: 20 }} />
        <span>
          <small>Surname</small>{' '}
        </span>
      </div>
      <div className="k-field">
        <Icon name="phone" size={20} />
        <span className={phone ? 'filled' : ''}>
          <small>Phone (Mobile)</small>
          {phone || ' '}
        </span>
      </div>
    </div>
  );
}

// ---------- Play Store ----------
export function Play({ view = 'home', query = '', installing, installed }) {
  if (view === 'app')
    return (
      <div className="app k-play">
        <Status />
        <div className="k-play-bar">
          <Icon name="back" size={22} />
          <span />
          <Icon name="search" size={22} />
          <Icon name="more" size={22} />
        </div>
        <div className="k-play-app">
          <AppIcon app="phonepe" size={72} />
          <div>
            <b>PhonePe UPI, Payment, Recharge</b>
            <small className="dev">PhonePe Private Limited</small>
            <small>Contains ads · In-app purchases</small>
          </div>
        </div>
        <div className="k-play-stats">
          <span>
            <b>4.4★</b>
            <small>1 Cr reviews</small>
          </span>
          <span>
            <b>100 Cr+</b>
            <small>Downloads</small>
          </span>
          <span>
            <b>3+</b>
            <small>Rated for 3+</small>
          </span>
        </div>
        {installed ? (
          <div className="k-play-btns">
            <span className="k-play-btn ghost" data-t="uninstall">
              Uninstall
            </span>
            <span className="k-play-btn" data-t="open">
              Open
            </span>
          </div>
        ) : installing ? (
          <div className="k-play-prog">
            <i />
            <small>Installing… 64%</small>
          </div>
        ) : (
          <div className="k-play-btns">
            <span className="k-play-btn full" data-t="install">
              Install
            </span>
          </div>
        )}
        <div className="k-play-shots">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  return (
    <div className="app k-play">
      <Status />
      <div className="k-play-search" data-t={view === 'home' ? 'search' : undefined}>
        {view === 'search' ? <Icon name="back" size={20} /> : <Icon name="search" size={20} />}
        <span className={query ? 'typed' : ''}>{query || 'Search apps & games'}</span>
        <Icon name="mic" size={20} />
        <Av name="K" size={30} color="#1a73e8" t="profile" />
      </div>
      {view === 'home' && (
        <>
          <div className="k-play-tabs">
            <span className="on">For you</span>
            <span>Top charts</span>
            <span>Kids</span>
            <span>Categories</span>
          </div>
          <div className="k-play-h">Recommended for you</div>
          <div className="k-play-row">
            {['whatsapp', 'youtube', 'gpay', 'maps'].map((a) => (
              <div key={a}>
                <AppIcon app={a} size={64} />
              </div>
            ))}
          </div>
        </>
      )}
      {view === 'search' && (
        <div className="k-play-results">
          <div className="k-play-res" data-t="result">
            <AppIcon app="phonepe" size={56} />
            <span>
              <b>PhonePe UPI, Payment, Recharge</b>
              <small>PhonePe Private Limited</small>
              <small>4.4★ · 100 Cr+</small>
            </span>
          </div>
          <div className="k-play-res" data-t="fake">
            <span className="k-fakeicon">P</span>
            <span>
              <b>Phone Pay Recharge Offers</b>
              <small>QuickApps Studio</small>
              <small>2.1★ · 10K+</small>
            </span>
          </div>
          <div className="k-play-res">
            <AppIcon app="paytm" size={56} />
            <span>
              <b>Paytm: Secure UPI Payments</b>
              <small>Paytm - One97 Communications</small>
              <small>4.6★ · 50 Cr+</small>
            </span>
          </div>
        </div>
      )}
      <div className="k-play-nav">
        <span>
          <Icon name="grid" size={20} />
          Games
        </span>
        <span className="on">
          <Icon name="apps" size={20} />
          Apps
        </span>
        <span>
          <Icon name="search" size={20} />
          Search
        </span>
        <span>
          <Icon name="library" size={20} />
          Books
        </span>
      </div>
    </div>
  );
}

// ---------- Gallery ----------
const PHOTOS = ['🌅', '🌸', '👨‍👩‍👧', '🏞️', '🎂', '🪔', '🌺', '🐕', '🏠'];
export function Gallery({ view = 'grid', share, shot }) {
  if (view === 'photo')
    return (
      <div className="app k-gal dark">
        <div className="k-gal-top">
          <Icon name="back" size={22} color="#fff" />
          <span />
          <Icon name="more" size={22} color="#fff" />
        </div>
        <div className="k-gal-photo">👨‍👩‍👧</div>
        <div className="k-gal-actions">
          <span data-t="share">
            <Icon name="share" size={22} color="#fff" />
            Share
          </span>
          <span data-t="edit">
            <Icon name="edit" size={22} color="#fff" />
            Edit
          </span>
          <span data-t="lens">
            <Icon name="eye" size={22} color="#fff" />
            Lens
          </span>
          <span data-t="delete">
            <Icon name="trash" size={22} color="#fff" />
            Delete
          </span>
        </div>
        {share && (
          <div className="k-dim end">
            <div className="k-sheet">
              <i className="k-sheet-h" />
              <div className="k-sheet-t">Share 1 photo</div>
              <div className="k-share-row">
                {[
                  ['whatsapp', 'WhatsApp'],
                  ['gmail', 'Gmail'],
                  ['messages', 'Messages'],
                  ['drive', 'Drive'],
                ].map(([a, l]) => (
                  <div key={a} data-t={a === 'whatsapp' ? 'share-whatsapp' : undefined}>
                    {a === 'whatsapp' || a === 'drive' ? (
                      <AppIcon app={a} size={50} />
                    ) : (
                      <span className="ph-sys" style={{ width: 50, height: 50, background: a === 'gmail' ? '#d93025' : '#1a73e8' }}>
                        <Icon name={a === 'gmail' ? 'mail' : 'chats'} size={24} />
                      </span>
                    )}
                    <small>{l}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  return (
    <div className="app k-gal">
      <Status />
      <div className="k-gal-bar">
        <b>Gallery</b>
        <Icon name="search" size={22} />
        <Icon name="more" size={22} />
      </div>
      <div className="k-gal-h">Today</div>
      <div className="k-gal-grid">
        {(shot ? ['🎫', ...PHOTOS.slice(0, 8)] : PHOTOS).map((p, i) => (
          <span key={i} data-t={shot ? (i === 0 ? 'shot' : undefined) : i === 2 ? 'photo' : undefined}>
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------- Messages (SMS) ----------
export function Sms() {
  return (
    <div className="app k-sms">
      <Status />
      <div className="k-sms-bar">
        <Icon name="back" size={22} />
        <Av name="V" size={34} color="#5f6368" />
        <b>VM-SBIUPD</b>
        <Icon name="more" size={22} />
      </div>
      <div className="k-sms-body">
        <div className="k-sms-warn">
          <Icon name="alert" size={18} /> Suspected spam
        </div>
        <div className="k-sms-msg">
          URGENT: Your SBI account will be BLOCKED today. Update KYC now: <u>http://sbi-kyc-update.xyz</u> or call 98xxx xxxxx
          <small>10:12 am</small>
        </div>
        <div className="k-sms-msg">
          Congratulations! You won ₹25,00,000 in KBC lucky draw. Share OTP to claim.
          <small>10:15 am</small>
        </div>
      </div>
      <div className="k-sms-input">
        <span>Text message</span>
        <Icon name="send" size={20} />
      </div>
    </div>
  );
}

// ---------- Gmail ----------
export function Gmail({ view = 'inbox', to = '', subject = '', body = '' }) {
  if (view === 'compose')
    return (
      <div className="app k-gm">
        <Status />
        <div className="k-gm-cbar">
          <Icon name="back" size={22} />
          <b>Compose</b>
          <span data-t="attach">
            <Icon name="attach" size={20} />
          </span>
          <span data-t="send">
            <Icon name="send" size={22} />
          </span>
          <Icon name="more" size={22} />
        </div>
        <div className="k-gm-f">
          <small>From</small> kamla.devi@gmail.com
        </div>
        <div className="k-gm-f">
          <small>To</small> <b>{to}</b>
        </div>
        <div className="k-gm-f subj">{subject || <span className="k-ph">Subject</span>}</div>
        <div className="k-gm-body">{body || <span className="k-ph">Compose email</span>}</div>
      </div>
    );
  const mails = [
    ['Rahul', 'Photos from Sunday', 'Sharing the photos from the function…'],
    ['SBI', 'Your account statement', 'Your e-statement for September is ready'],
    ['IRCTC', 'Booking confirmation', 'PNR 4521878899 · Kochi to Chennai'],
    ['Pinky', 'Recipe', 'Here is the recipe you asked for 😊'],
  ];
  return (
    <div className="app k-gm">
      <Status />
      <div className="k-gm-search">
        <Icon name="menu" size={20} /> Search in mail
        <Av name="K" size={30} color="#1a73e8" />
      </div>
      <div className="k-gm-h">Primary</div>
      {mails.map(([f, s, p]) => (
        <div key={f} className="k-gm-mail">
          <Av name={f} size={40} />
          <span>
            <b>{f}</b>
            <i>{s}</i>
            <small>{p}</small>
          </span>
          <em>9:30 am</em>
        </div>
      ))}
      <div className="k-gm-fab" data-t="compose">
        <Icon name="edit" size={20} /> Compose
      </div>
      <div className="k-gm-nav">
        <span className="on">
          <Icon name="mail" size={22} />
        </span>
        <span>
          <Icon name="video" size={22} />
        </span>
      </div>
    </div>
  );
}

// In-call screen.
export function ACall({ name = '1930', sub = 'Cyber Crime Helpline', time = '00:18', tap, speakerOn }) {
  return (
    <div className="app k-call">
      <Status dark />
      <div className="k-call-top">
        <Av name={name} size={86} color="#3c4043" />
        <b>{name}</b>
        <small>{sub}</small>
        <span>{time}</span>
      </div>
      <div className="k-call-grid">
        {[
          ['grid', 'Keypad'],
          ['mic', 'Mute'],
          ['volume', 'Speaker'],
          ['plus', 'Add call'],
          ['pause', 'Hold'],
          ['more', 'More'],
        ].map(([ic, l]) => (
          <span key={l} data-t={tap === 'speaker' && l === 'Speaker' ? 'speaker' : undefined}>
            <i className={speakerOn && l === 'Speaker' ? 'on' : ''}>
              <Icon name={ic} size={22} />
            </i>
            {l}
          </span>
        ))}
      </div>
      <div className="k-call-end" data-t={tap === 'end' ? 'end' : undefined}>
        <Icon name="phone" size={28} color="#fff" />
      </div>
    </div>
  );
}

// A web page in Chrome.
export function AWeb({ url = 'cybercrime.gov.in', title, lines = [], button }) {
  return (
    <div className="app k-web">
      <Status />
      <div className="k-web-bar">
        <Icon name="home" size={20} />
        <span>
          <Icon name="lock" size={14} /> {url}
        </span>
        <b>1</b>
        <Icon name="more" size={20} />
      </div>
      <div className="k-web-page">
        <div className="k-web-gov">National Cyber Crime Reporting Portal</div>
        <h3>{title}</h3>
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
        {button && (
          <span className="k-web-btn" data-t={button[0]}>
            {button[1]}
          </span>
        )}
      </div>
    </div>
  );
}

// Camera. flip / shutter / thumb are targets; front shows the selfie view.
export function Camera({ tap, front }) {
  return (
    <div className="app k-cam">
      <div className="k-cam-top">
        <Icon name="gear" size={22} color="#fff" />
        <Icon name="sparkle" size={22} color="#fff" />
        <Icon name="timer" size={22} color="#fff" />
      </div>
      <div className={`k-cam-view ${front ? 'front' : ''}`}>{front ? '🙂' : '🪴'}</div>
      <div className="k-cam-modes">
        <span>Video</span>
        <span className="on">Photo</span>
        <span>Portrait</span>
      </div>
      <div className="k-cam-bar">
        <span className="k-cam-thumb" data-t={tap === 'thumb' ? 'thumb' : undefined}>
          {front ? '🙂' : ''}
        </span>
        <span className="k-cam-shutter" data-t={tap === 'shutter' ? 'shutter' : undefined} />
        <span className="k-cam-flip" data-t={tap === 'flip' ? 'flip' : undefined}>
          <Icon name="refresh" size={24} color="#fff" />
        </span>
      </div>
    </div>
  );
}

export function PhotoView({ e = '🙂', title = 'Today, 10:31' }) {
  return (
    <div className="app k-gal dark">
      <div className="k-gal-top">
        <Icon name="back" size={22} color="#fff" />
        <span>{title}</span>
        <Icon name="more" size={22} color="#fff" />
      </div>
      <div className="k-gal-photo">{e}</div>
      <div className="k-gal-actions">
        {[
          ['share', 'Share'],
          ['edit', 'Edit'],
          ['eye', 'Lens'],
          ['trash', 'Delete'],
        ].map(([ic, l]) => (
          <span key={l}>
            <Icon name={ic} size={22} color="#fff" />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// Font size page with a 4-stop slider. value: 0..3; tap: the stop to tap.
export function FontSize({ value = 0, tap }) {
  const sizes = [14, 17, 21, 26];
  return (
    <div className="app k-set">
      <Status />
      <div className="k-set-bar">
        <span data-t="back">
          <Icon name="back" size={22} />
        </span>
      </div>
      <div className="k-set-title">Font size</div>
      <div className="k-set-card k-font-prev" style={{ fontSize: sizes[value] }}>
        <b>Preview</b>
        <p>Namaste! This is how the words will look in your apps and messages.</p>
      </div>
      <div className="k-font-slider">
        <small>A</small>
        <div>
          <i />
          {sizes.map((_, i) => (
            <span key={i} className={i === value ? 'on' : ''} style={{ left: `${(i / 3) * 100}%` }} data-t={tap === i ? `s${i + 1}` : undefined} />
          ))}
        </div>
        <b>A</b>
      </div>
    </div>
  );
}

// A caller's page in the Phone app, with Block.
export function CallerPage({ block }) {
  return (
    <div className="app k-phone">
      <Status />
      <div className="k-form-bar">
        <Icon name="back" size={22} />
        <b />
        <Icon name="more" size={22} />
      </div>
      <div className="k-caller">
        <Av name="?" size={96} color="#9aa0a6" />
        <b>+91 98xxx xx210</b>
        <small>Possible spam · 6 missed calls today</small>
      </div>
      <div className="k-caller-acts">
        <span>
          <Icon name="phone" size={22} />
          Call
        </span>
        <span>
          <Icon name="chats" size={22} />
          Message
        </span>
        <span>
          <Icon name="info" size={22} />
          Details
        </span>
      </div>
      <div className="k-row" data-t={block ? 'block' : undefined}>
        <span className="k-row-ic" style={{ background: '#fce8e6', color: '#b3261e' }}>
          <Icon name="block" size={20} />
        </span>
        <span className="k-row-tx">
          <b style={{ color: '#b3261e' }}>Block number</b>
          <small>Calls and messages will be blocked</small>
        </span>
      </div>
      <Row icon="flag" title="Report as spam" />
    </div>
  );
}

// Phone app recents with a spam number on top.
export function Recents({ tap }) {
  const rows = [
    ['spam', '+91 98xxx xx210', 'Missed · 6 times today', '#9aa0a6'],
    ['didi', 'Sunita Didi', 'Outgoing · 10:05 am'],
    ['rahul', 'Rahul (Beta)', 'Incoming · Yesterday'],
    ['clinic', 'Dr. Mehta Clinic', 'Incoming · Mon'],
  ];
  return (
    <div className="app k-phone">
      <Status />
      <div className="k-dial-search">
        <Icon name="search" size={20} /> Search contacts & places
        <Av name="K" size={30} color="#1a73e8" />
      </div>
      <div className="k-gm-h">Today</div>
      {rows.map(([k, n, s, c]) => (
        <div key={k} className="k-row" data-t={tap && k === 'spam' ? 'num-spam' : undefined}>
          <Av name={n === '+91 98xxx xx210' ? '?' : n} size={44} color={c} />
          <span className="k-row-tx">
            <b style={k === 'spam' ? { color: '#b3261e' } : undefined}>{n}</b>
            <small>{s}</small>
          </span>
          <Icon name="phone" size={20} />
        </div>
      ))}
      <div className="k-dial-nav">
        {[
          ['favourites', 'star', 'Favourites'],
          ['recents', 'history', 'Recents'],
          ['contacts', 'user', 'Contacts'],
          ['keypad', 'grid', 'Keypad'],
        ].map(([k, ic, l]) => (
          <div key={k} className={k === 'recents' ? 'on' : ''}>
            <span>
              <Icon name={ic} size={20} />
            </span>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
