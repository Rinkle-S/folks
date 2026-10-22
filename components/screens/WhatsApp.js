// Practice look-alike of WhatsApp (Android, current design). Same layout and labels; no WhatsApp logo.
import Icon from '../Icons';

const CHATS = [
  { name: 'Family Group', msg: 'Sunita: 🙏 सुप्रभात', time: '9:12 am', color: '#7c3aed', ini: 'F', unread: 3 },
  { t: 'chat-ramesh', name: 'Ramesh Bhaiya', msg: '✓✓ ठीक है, शाम को मिलते हैं', time: '8:40 am', color: '#ea580c', ini: 'R' },
  { name: 'Pinky', msg: '📷 Photo', time: 'Yesterday', color: '#db2777', ini: 'P' },
  { name: 'Dr. Mehta Clinic', msg: 'Your appointment is confirmed', time: 'Yesterday', color: '#0891b2', ini: 'D' },
  { name: 'Society Committee', msg: 'Water supply notice for Sunday', time: 'Mon', color: '#4d7c0f', ini: 'S' },
  { name: 'Anil', msg: 'Happy birthday! 🎂', time: 'Sun', color: '#b45309', ini: 'A' },
];

function BottomNav({ active = 'chats' }) {
  const items = [
    { k: 'chats', icon: 'chats', label: 'Chats' },
    { k: 'updates', icon: 'updates', label: 'Updates' },
    { k: 'communities', icon: 'contacts', label: 'Communities' },
    { k: 'calls', icon: 'phone', label: 'Calls' },
  ];
  return (
    <div className="wa-nav">
      {items.map((it) => (
        <div key={it.k} className={`wa-nav-i ${active === it.k ? 'on' : ''}`} data-t={`nav-${it.k}`}>
          <span className="wa-nav-pill">
            <Icon name={it.icon} size={22} />
          </span>
          {it.label}
        </div>
      ))}
    </div>
  );
}

export function WaChats() {
  return (
    <div className="app wa">
      <div className="wa-head">
        <span className="wa-word">WhatsApp</span>
        <span className="wa-head-ic">
          <Icon name="camera" size={22} />
          <Icon name="more" size={22} />
        </span>
      </div>
      <div className="wa-search">
        <Icon name="search" size={18} />
        <span>Ask Meta AI or Search</span>
      </div>
      <div className="wa-chips">
        <span className="on">All</span>
        <span>Unread 3</span>
        <span>Favourites</span>
        <span>Groups</span>
      </div>
      <div className="wa-list">
        {CHATS.map((c, i) => (
          <div key={i} className="wa-row" data-t={c.t}>
            <div className="wa-av" style={{ background: c.color }}>
              {c.ini}
            </div>
            <div className="wa-mid">
              <div className="wa-name">{c.name}</div>
              <div className="wa-msg">{c.msg}</div>
            </div>
            <div className="wa-right">
              <span className={c.unread ? 'green' : ''}>{c.time}</span>
              {c.unread ? <b className="wa-badge">{c.unread}</b> : null}
            </div>
          </div>
        ))}
      </div>
      <div className="wa-fab">
        <Icon name="plus" size={24} color="#fff" stroke={2.5} />
      </div>
      <BottomNav active="chats" />
    </div>
  );
}

export function WaChat() {
  const msgs = [
    { me: false, text: 'नमस्ते! कैसे हो?', time: '7:58 am' },
    { me: true, text: 'सब ठीक है 🙏', time: '8:05 am' },
    { me: false, text: 'कल बाज़ार चलेंगे?', time: '8:21 am' },
    { me: true, text: 'हाँ, 10 बजे', time: '8:30 am' },
    { me: false, text: 'ठीक है, शाम को मिलते हैं', time: '8:40 am' },
  ];
  return (
    <div className="app wa">
      <div className="wa-chead">
        <Icon name="back" size={22} />
        <div className="wa-av sm" style={{ background: '#ea580c' }}>
          R
        </div>
        <div className="wa-cname" data-t="contact-name">
          Ramesh Bhaiya
          <small>tap here for contact info</small>
        </div>
        <span className="wa-head-ic">
          <Icon name="video" size={22} />
          <Icon name="phone" size={20} />
          <Icon name="more" size={22} />
        </span>
      </div>
      <div className="wa-msgs">
        <div className="wa-chip">⬆ 2 weeks of older messages</div>
        <div className="wa-chip">Today</div>
        {msgs.map((m, i) => (
          <div key={i} className={`bub ${m.me ? 'me' : ''}`}>
            {m.text}
            <span>
              {m.time} {m.me ? '✓✓' : ''}
            </span>
          </div>
        ))}
      </div>
      <div className="wa-input">
        <div className="wa-pill">
          <Icon name="emoji" size={22} />
          <span>Message</span>
          <Icon name="attach" size={20} />
          <Icon name="camera" size={20} />
        </div>
        <div className="wa-mic">
          <Icon name="mic" size={20} color="#fff" />
        </div>
      </div>
    </div>
  );
}

export function WaInfo() {
  const thumbs = ['#fca5a5', '#93c5fd', '#fde68a', '#86efac'];
  return (
    <div className="app wa info">
      <div className="wa-chead plain">
        <Icon name="back" size={22} />
        <span />
        <Icon name="more" size={22} />
      </div>
      <div className="big-av">R</div>
      <div className="iname">Ramesh Bhaiya</div>
      <div className="iphone">+91 99023 11845</div>
      <div className="iacts">
        <span>
          <Icon name="phone" size={20} />
          <small>Audio</small>
        </span>
        <span>
          <Icon name="video" size={20} />
          <small>Video</small>
        </span>
        <span>
          <Icon name="search" size={20} />
          <small>Search</small>
        </span>
      </div>
      <div className="irow media" data-t="media-row">
        <div className="irow-h">
          <span>Media, links and docs</span>
          <span className="muted">24 ›</span>
        </div>
        <div className="thumbs">
          {thumbs.map((c, i) => (
            <span key={i} style={{ background: c }} />
          ))}
        </div>
      </div>
      <div className="irow">Notifications</div>
      <div className="irow">Disappearing messages</div>
      <div className="irow red">Block Ramesh Bhaiya</div>
    </div>
  );
}

export function WaMedia({ tab }) {
  const photos = ['🌸', '🎂', '🏞️', '👨‍👩‍👧', '🪔', '🍛', '🐄', '🌅', '🎉'];
  const docs = [
    { t: 'bill', name: 'Bijli_bill_Sept.pdf', meta: '2 pages · 180 kB · PDF · 6 Oct' },
    { name: 'Gas_booking_receipt.pdf', meta: '1 page · 90 kB · PDF · 28 Sep' },
    { name: 'Sunita_shaadi_card.pdf', meta: '4 pages · 2.1 MB · PDF · 2 Sep' },
  ];
  return (
    <div className="app wa">
      <div className="wa-chead plain">
        <Icon name="back" size={22} />
        <div className="wa-cname">Ramesh Bhaiya</div>
        <Icon name="more" size={22} />
      </div>
      <div className="mtabs">
        <span className={tab === 'media' ? 'on' : ''} data-t="media-tab">
          Media
        </span>
        <span className={tab === 'docs' ? 'on' : ''} data-t="docs-tab">
          Docs
        </span>
        <span className={tab === 'links' ? 'on' : ''} data-t="links-tab">
          Links
        </span>
      </div>
      {tab === 'docs' ? (
        <div className="docs">
          {docs.map((d, i) => (
            <div key={i} className="doc" data-t={d.t}>
              <div className="doc-ic">PDF</div>
              <div>
                <div className="doc-name">{d.name}</div>
                <div className="doc-meta">{d.meta}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pgrid">
          {photos.map((p, i) => (
            <span key={i}>{p}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export function WaPdf() {
  return (
    <div className="app pdf">
      <div className="pdf-top">
        <Icon name="back" size={20} color="#fff" /> Bijli_bill_Sept.pdf
      </div>
      <div className="pdf-page">
        <div className="pdf-h">BIJLI VITARAN (PRACTICE)</div>
        <div className="pdf-sub">Electricity Bill — September</div>
        <div className="pdf-line" />
        <div className="pdf-row">
          <span>Units used</span>
          <span>212</span>
        </div>
        <div className="pdf-row">
          <span>Due date</span>
          <span>20 Oct</span>
        </div>
        <div className="pdf-row big">
          <span>Amount due</span>
          <span>₹1,240</span>
        </div>
        <div className="pdf-line" />
        <div className="pdf-fill" />
        <div className="pdf-fill short" />
      </div>
      <div className="pdf-bar">
        <span>↗ Forward</span>
        <span className="pdf-done" data-t="done">
          ✓ Done
        </span>
      </div>
    </div>
  );
}

export function WaUpdates({ posted }) {
  return (
    <div className="app wa">
      <div className="wa-head">
        <span className="wa-word dark">Updates</span>
        <span className="wa-head-ic">
          <Icon name="search" size={22} />
          <Icon name="more" size={22} />
        </span>
      </div>
      <div className="wa-sec-h">Status</div>
      <div className="wa-row">
        <div className="wa-av me-av" style={{ background: posted ? '#7c3aed' : '#94a3b8' }}>
          K{!posted && <span className="wa-plus">+</span>}
        </div>
        <div className="wa-mid">
          <div className="wa-name">My status</div>
          <div className="wa-msg">{posted ? 'Just now' : 'Tap to add status update'}</div>
        </div>
      </div>
      <div className="wa-sec-h small">Recent updates</div>
      {[
        ['Pinky', '#db2777', '25 minutes ago'],
        ['Family Group', '#7c3aed', 'Today, 8:02 am'],
      ].map(([n, c, tm]) => (
        <div key={n} className="wa-row">
          <div className="wa-av ring" style={{ background: c }}>
            {n[0]}
          </div>
          <div className="wa-mid">
            <div className="wa-name">{n}</div>
            <div className="wa-msg">{tm}</div>
          </div>
        </div>
      ))}
      <div className="wa-sec-h">Channels</div>
      <div className="wa-msg pad">Stay updated on topics that matter to you.</div>
      <div className="wa-fabs">
        <div className="wa-fab-sm" data-t="pencil" aria-label="Text status">
          <Icon name="pencil" size={20} />
        </div>
        <div className="wa-fab static" data-t="status-camera">
          <Icon name="camera" size={24} color="#fff" />
        </div>
      </div>
      <BottomNav active="updates" />
    </div>
  );
}

const STATUS_COLORS = ['#7c3aed', '#c2410c', '#0f766e'];

export function WaTextStatus({ typed, color = 0 }) {
  return (
    <div className="app wa-ts" style={{ background: STATUS_COLORS[color % STATUS_COLORS.length] }}>
      <div className="wa-ts-top">
        <span>✕</span>
        <span className="wa-ts-tools">
          <Icon name="emoji" size={24} color="#fff" />
          <span className="wa-ts-T">T</span>
          <span data-t="palette" className="wa-ts-pal">
            <Icon name="palette" size={24} color="#fff" />
          </span>
        </span>
      </div>
      <div className="wa-ts-text" data-t="text-area">
        {typed ? 'शुभ दीपावली 🪔 Happy Diwali!' : <span className="ph">Type a status</span>}
      </div>
      <div className="wa-ts-foot">
        <span className="wa-ts-priv">Status (Contacts)</span>
        <span className={`wa-ts-send ${typed ? '' : 'dis'}`} data-t="send">
          <Icon name="send" size={22} color="#fff" />
        </span>
      </div>
    </div>
  );
}
