'use client';
// Practice look-alike screens. Generic styling (no real brand logos), clearly marked as practice.
// Anything a parent should tap carries data-t="<target>"; keypad keys carry data-key.

export function ScanIcon({ size = 30, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
      <path d="M8 12h8" />
    </svg>
  );
}

// A QR-looking pattern (not a real, scannable code).
function FakeQR({ size = 150 }) {
  const n = 21;
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const cells = [];
  const inFinder = (x, y) =>
    (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (inFinder(x, y)) continue;
      if (rand() > 0.52) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
    }
  }
  const finder = (x, y) => (
    <g key={`f${x}${y}`}>
      <rect x={x} y={y} width="7" height="7" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`-1 -1 ${n + 2} ${n + 2}`} shapeRendering="crispEdges" aria-label="QR code">
      <rect x="-1" y="-1" width={n + 2} height={n + 2} fill="#fff" />
      <g fill="#111">
        {cells}
        {finder(0, 0)}
        {finder(n - 7, 0)}
        {finder(0, n - 7)}
      </g>
    </svg>
  );
}

function Keypad() {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'];
  return (
    <div className="keypad">
      {keys.map((k, i) =>
        k === '' ? (
          <div key={i} className="key blank" />
        ) : (
          <div key={i} className="key" data-key={k} role="button">
            {k === 'back' ? '⌫' : k}
          </div>
        )
      )}
    </div>
  );
}

function Intro({ lesson, lang, t }) {
  return (
    <div className="intro">
      <div className="intro-emoji">{lesson.emoji}</div>
      <div className="intro-title">{lesson.title[lang]}</div>
      <div className="intro-badge">🛡️ {t.practiceOnly}</div>
      <div className="intro-time">⏱ {t.minutes(lesson.minutes)}</div>
    </div>
  );
}

function UpiHome({ dim }) {
  const transfers = [
    { t: 'scan', icon: <ScanIcon size={28} />, label: 'Scan any QR' },
    { icon: '📱', label: 'To Mobile Number' },
    { icon: '🏦', label: 'To Bank Account' },
    { icon: '🔁', label: 'To Self Account' },
  ];
  const bills = [
    { icon: '📶', label: 'Mobile Recharge' },
    { icon: '💡', label: 'Electricity' },
    { icon: '📺', label: 'DTH' },
    { icon: '🔥', label: 'Gas Cylinder' },
  ];
  return (
    <div className={`app upi ${dim ? 'dim' : ''}`}>
      <div className="upi-top">
        <div className="upi-av">K</div>
        <div className="upi-title">
          UPI Pay <span className="upi-tag">practice</span>
        </div>
        <div className="upi-icons">🔔 ❔</div>
      </div>
      <div className="upi-body">
        <div className="upi-card">
          <div className="card-h">Money Transfers</div>
          <div className="grid4">
            {transfers.map((g, i) => (
              <div key={i} className="gi" data-t={g.t}>
                <div className="gi-ic">{g.icon}</div>
                <span>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="upi-card">
          <div className="card-h">Recharge &amp; Pay Bills</div>
          <div className="grid4">
            {bills.map((g, i) => (
              <div key={i} className="gi">
                <div className="gi-ic">{g.icon}</div>
                <span>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="upi-banner">Refer a friend and get ₹0 — this is a practice app 🙂</div>
      </div>
      <div className="upi-nav">
        <div className="nv">🏠<span>Home</span></div>
        <div className="nv">🔍<span>Search</span></div>
        <div className="nv nv-scan" data-t="scan">
          <div className="scan-btn">
            <ScanIcon size={26} color="#fff" />
          </div>
          <span>Scan</span>
        </div>
        <div className="nv">🕘<span>History</span></div>
        <div className="nv">👤<span>Profile</span></div>
      </div>
    </div>
  );
}

function Camera() {
  return (
    <div className="app cam">
      <div className="cam-top">← Scan any QR code</div>
      <div className="viewfinder">
        <div className="vf-corner tl" />
        <div className="vf-corner tr" />
        <div className="vf-corner bl" />
        <div className="vf-corner br" />
        <div className="sticker" data-t="qr">
          <div className="st-name">SHARMA GENERAL STORE</div>
          <FakeQR size={140} />
          <div className="st-upi">Scan &amp; pay with any UPI app</div>
        </div>
      </div>
      <div className="cam-tip">Point your camera at a QR code</div>
    </div>
  );
}

function PayTo({ amount, keypad }) {
  return (
    <div className={`app pay ${keypad ? 'compact' : ''}`}>
      <div className="pay-top">← Paying</div>
      <div className="payee">
        <div className="pav">S</div>
        <div className="pname">SHARMA GENERAL STORE</div>
        <div className="pupi">sharmastore@upi · practice</div>
      </div>
      <div className="amt">
        <span className="rs">₹</span>
        <span className={amount ? '' : 'ph'}>{amount || '0'}</span>
      </div>
      <div className="pnote">Add a note</div>
      <div className={`pay-btn ${amount ? '' : 'dis'}`} data-t="pay">
        Pay {amount ? `₹${amount}` : ''}
      </div>
      {keypad && <Keypad />}
    </div>
  );
}

function Pin({ typed }) {
  return (
    <div className="app pinsc">
      <div className="pin-top">
        <div>Practice Bank ••••</div>
        <div className="pin-to">Paying ₹50 to SHARMA GENERAL STORE</div>
      </div>
      <div className="pin-label">ENTER 4-DIGIT UPI PIN</div>
      <div className="dots">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={i < (typed || '').length ? 'on' : ''} />
        ))}
      </div>
      <div className="pin-warn">Practice PIN: 1 2 3 4</div>
      <Keypad />
    </div>
  );
}

function Success() {
  return (
    <div className="app succ">
      <div className="tick">✓</div>
      <div className="s-amt">₹50</div>
      <div className="s-to">Paid to SHARMA GENERAL STORE</div>
      <div className="s-meta">Just now · UPI Ref PRACTICE-000123</div>
      <div className="s-done" data-t="done">
        Done
      </div>
    </div>
  );
}

function Collect() {
  return (
    <div className="stack">
      <UpiHome dim />
      <div className="modal">
        <div className="m-h">Payment Request</div>
        <div className="m-from">RAJESH KUMAR</div>
        <div className="m-sub">is requesting</div>
        <div className="m-amt">₹5,000</div>
        <div className="m-note">"Prize money — enter PIN to receive"</div>
        <div className="m-btns">
          <div className="m-decline" data-t="decline">
            Decline
          </div>
          <div className="m-pay" data-t="pay-scam">
            Pay
          </div>
        </div>
      </div>
    </div>
  );
}

const CHATS = [
  { name: 'Family Group', msg: 'Sunita: 🙏 सुप्रभात', time: '9:12 am', color: '#7c3aed', ini: 'F' },
  { t: 'chat-ramesh', name: 'Ramesh Bhaiya', msg: 'ठीक है, शाम को मिलते हैं', time: '8:40 am', color: '#ea580c', ini: 'R' },
  { name: 'Pinky', msg: '📷 Photo', time: 'Yesterday', color: '#db2777', ini: 'P' },
  { name: 'Dr. Mehta Clinic', msg: 'Your appointment is confirmed', time: 'Yesterday', color: '#0891b2', ini: 'D' },
  { name: 'Society Committee', msg: 'Water supply notice for Sunday', time: 'Mon', color: '#4d7c0f', ini: 'S' },
  { name: 'Anil', msg: 'Happy birthday! 🎂', time: 'Sun', color: '#b45309', ini: 'A' },
];

function ChatList() {
  return (
    <div className="app wa">
      <div className="wa-top">
        <span>Chats</span>
        <span className="wa-top-ic">📷 ⋮</span>
      </div>
      <div className="wa-search">🔍 Search</div>
      <div className="wa-tabs">
        <span className="on">All</span>
        <span>Unread</span>
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
            <div className="wa-time">{c.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Chat() {
  const msgs = [
    { me: false, text: 'नमस्ते! कैसे हो?', time: '7:58 am' },
    { me: true, text: 'सब ठीक है 🙏', time: '8:05 am' },
    { me: false, text: 'कल बाज़ार चलेंगे?', time: '8:21 am' },
    { me: true, text: 'हाँ, 10 बजे', time: '8:30 am' },
    { me: false, text: 'ठीक है, शाम को मिलते हैं', time: '8:40 am' },
  ];
  return (
    <div className="app wa">
      <div className="wa-ctop">
        <span>←</span>
        <div className="wa-av sm" style={{ background: '#ea580c' }}>
          R
        </div>
        <div className="wa-cname" data-t="contact-name">
          Ramesh Bhaiya
          <small>tap here for contact info</small>
        </div>
        <span>📞 ⋮</span>
      </div>
      <div className="wa-msgs">
        <div className="wa-chip">⬆ 2 weeks of older messages</div>
        <div className="wa-chip">Today</div>
        {msgs.map((m, i) => (
          <div key={i} className={`bub ${m.me ? 'me' : ''}`}>
            {m.text}
            <span>{m.time}</span>
          </div>
        ))}
      </div>
      <div className="wa-input">
        <span>😊 Message</span>
        <span className="wa-mic">🎤</span>
      </div>
    </div>
  );
}

function ContactInfo() {
  const thumbs = ['#fca5a5', '#93c5fd', '#fde68a', '#86efac'];
  return (
    <div className="app wa info">
      <div className="wa-ctop light">
        <span>←</span>
        <span />
        <span>⋮</span>
      </div>
      <div className="big-av">R</div>
      <div className="iname">Ramesh Bhaiya</div>
      <div className="iphone">+91 98765 43210</div>
      <div className="iacts">
        <span>📞<small>Audio</small></span>
        <span>📹<small>Video</small></span>
        <span>🔍<small>Search</small></span>
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
      <div className="irow">🔔 Notifications</div>
      <div className="irow">⏱ Disappearing messages</div>
      <div className="irow red">🚫 Block Ramesh Bhaiya</div>
    </div>
  );
}

function Media({ tab }) {
  const photos = ['🌸', '🎂', '🏞️', '👨‍👩‍👧', '🪔', '🍛', '🐄', '🌅', '🎉'];
  const docs = [
    { t: 'bill', name: 'Bijli_bill_Sept.pdf', meta: '2 pages · 180 kB · PDF · 6 Oct' },
    { name: 'Gas_booking_receipt.pdf', meta: '1 page · 90 kB · PDF · 28 Sep' },
    { name: 'Sunita_shaadi_card.pdf', meta: '4 pages · 2.1 MB · PDF · 2 Sep' },
  ];
  return (
    <div className="app wa">
      <div className="wa-ctop">
        <span>←</span>
        <div className="wa-cname">Ramesh Bhaiya</div>
        <span />
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

function Pdf() {
  return (
    <div className="app pdf">
      <div className="pdf-top">← Bijli_bill_Sept.pdf</div>
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

export default function Screen({ step, lesson, lang, t, values, typed }) {
  switch (step.screen) {
    case 'intro':
      return <Intro lesson={lesson} lang={lang} t={t} />;
    case 'upi-home':
      return <UpiHome />;
    case 'camera':
      return <Camera />;
    case 'pay-to': {
      const amount = step.kind === 'input' && step.field === 'amount' ? typed : values.amount;
      return <PayTo amount={amount} keypad={step.kind === 'input'} />;
    }
    case 'pin':
      return <Pin typed={typed} />;
    case 'success':
      return <Success />;
    case 'collect':
      return <Collect />;
    case 'chat-list':
      return <ChatList />;
    case 'chat':
      return <Chat />;
    case 'contact-info':
      return <ContactInfo />;
    case 'media':
      return <Media tab={step.tab || 'media'} />;
    case 'pdf':
      return <Pdf />;
    default:
      return null;
  }
}
