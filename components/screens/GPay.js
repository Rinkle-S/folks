// Practice look-alike of Google Pay (India). Same layout, labels and flow; no Google logos.
import Icon from '../Icons';
import Keypad from './Keypad';

const QUICK = [
  { t: 'scan', icon: 'scan', label: 'Scan any QR code' },
  { t: 'pay-contacts', icon: 'contacts', label: 'Pay contacts' },
  { t: 'pay-phone', icon: 'phone', label: 'Pay phone number' },
  { t: 'bank-transfer', icon: 'bank', label: 'Bank transfer' },
  { t: 'pay-upi', icon: 'upi', label: 'Pay UPI ID or number' },
  { t: 'self-transfer', icon: 'self', label: 'Self transfer' },
  { t: 'pay-bills', icon: 'bills', label: 'Pay bills' },
  { t: 'recharge', icon: 'recharge', label: 'Mobile recharge' },
];

const PEOPLE = [
  { name: 'Sunita', c: '#e8710a' },
  { name: 'Ramesh', c: '#1e8e3e' },
  { name: 'Pinky', c: '#d01884' },
  { name: 'Raju', c: '#1967d2' },
];

export function GpHome({ request, links, me }) {
  return (
    <div className={`app gp ${request ? 'stack' : ''}`}>
      <div className="gp-head">
        <div className="gp-search">
          <Icon name="search" size={18} />
          <span>Pay friends and merchants</span>
        </div>
        <div className="gp-me" data-t={me ? 'me' : undefined}>K</div>
      </div>
      <div className="gp-hero">
        <span className="gp-tag">PRACTICE</span>
      </div>
      <div className="gp-quick">
        {QUICK.map((q) => (
          <div key={q.t} className="gp-q" data-t={q.t}>
            <div className="gp-q-ic">
              <Icon name={q.icon} size={24} />
            </div>
            <span>{q.label}</span>
          </div>
        ))}
      </div>
      <div className="gp-upi">UPI ID: kamla.devi@practice</div>
      <div className="gp-sec">
        <div className="gp-sec-h">People</div>
        <div className="gp-people">
          {PEOPLE.map((p) => (
            <div key={p.name} className="gp-person">
              <span style={{ background: p.c }}>{p.name[0]}</span>
              {p.name}
            </div>
          ))}
        </div>
      </div>
      <div className="gp-links">
        <div><Icon name="gauge" size={20} /> Check your CIBIL score for free</div>
        <div data-t={links === 'history' ? 'history' : undefined}><Icon name="history" size={20} /> See transaction history</div>
        <div data-t={links === 'balance' ? 'balance' : undefined}><Icon name="balance" size={20} /> Check bank balance</div>
      </div>

      {request && (
        <>
          <div className="gp-dim" />
          <div className="gp-sheet">
            <div className="gp-sheet-h">Payment request</div>
            <div className="gp-req-from">
              <span className="gp-av" style={{ background: '#5f6368' }}>
                R
              </span>
              <div>
                <b>RAJESH KUMAR</b>
                <small>Not in your contacts</small>
              </div>
            </div>
            <div className="gp-req-amt">₹5,000</div>
            <div className="gp-req-note">"Prize money! Enter PIN to receive"</div>
            <div className="gp-req-btns">
              <div className="gp-btn outline" data-t="decline">
                Decline
              </div>
              <div className="gp-btn" data-t="pay-scam">
                Pay
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// QR-looking pattern (not a real, scannable code).
function FakeQR({ size = 140 }) {
  const n = 21;
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const cells = [];
  const inFinder = (x, y) => (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) if (!inFinder(x, y) && rand() > 0.52) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
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

export function GpScan() {
  return (
    <div className="app gp-cam">
      <div className="gp-cam-top">
        <Icon name="back" size={22} color="#fff" />
        <span>Scan any QR code</span>
        <span />
      </div>
      <div className="viewfinder">
        <div className="vf-corner tl" />
        <div className="vf-corner tr" />
        <div className="vf-corner bl" />
        <div className="vf-corner br" />
        <div className="sticker" data-t="qr">
          <div className="st-name">SHARMA GENERAL STORE</div>
          <FakeQR size={136} />
          <div className="st-upi">Scan &amp; pay with any UPI app</div>
        </div>
      </div>
      <div className="gp-cam-foot">
        <span>Upload from gallery</span>
        <span>Show my QR code</span>
      </div>
    </div>
  );
}

const CONTACTS = [
  { t: 'c-sunita', name: 'Sunita Didi', ph: '+91 98110 24567', c: '#e8710a' },
  { name: 'Ramesh Bhaiya', ph: '+91 99023 11845', c: '#1e8e3e' },
  { name: 'Raju (Milk)', ph: '+91 90080 77312', c: '#1967d2' },
  { name: 'Dr. Mehta Clinic', ph: '+91 80412 55620', c: '#9334e6' },
  { name: 'Pinky', ph: '+91 97400 33219', c: '#d01884' },
];

export function GpContacts() {
  return (
    <div className="app gp">
      <div className="gp-bar">
        <Icon name="back" size={22} />
        <span>Pay contacts</span>
      </div>
      <div className="gp-search in">
        <Icon name="search" size={18} />
        <span>Search any name or number</span>
      </div>
      <div className="gp-list-h">All contacts</div>
      {CONTACTS.map((c, i) => (
        <div key={i} className="gp-row" data-t={c.t}>
          <span className="gp-av" style={{ background: c.c }}>
            {c.name[0]}
          </span>
          <div>
            <b>{c.name}</b>
            <small>{c.ph}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export function GpChat({ payee }) {
  return (
    <div className="app gp">
      <div className="gp-bar">
        <Icon name="back" size={22} />
        <span className="gp-av sm" style={{ background: payee.color }}>
          {payee.initial}
        </span>
        <div className="gp-bar-name">
          <b>{payee.name}</b>
          <small>{payee.sub}</small>
        </div>
        <Icon name="more" size={22} />
      </div>
      <div className="gp-thread">
        <div className="gp-date">12 Sep</div>
        <div className="gp-txn me">
          <small>Payment to {payee.name.split(' ')[0]}</small>
          <b>₹500</b>
          <span>✓ Paid · 12 Sep</span>
        </div>
        <div className="gp-date">3 Oct</div>
        <div className="gp-txn">
          <small>Payment to you</small>
          <b>₹200</b>
          <span>✓ Received · 3 Oct</span>
        </div>
      </div>
      <div className="gp-chat-actions">
        <div className="gp-btn" data-t="pay">
          Pay
        </div>
        <div className="gp-btn outline" data-t="request">
          Request
        </div>
        <div className="gp-msg">Message…</div>
      </div>
    </div>
  );
}

export function GpAmount({ payee, amount, keypad, sheet }) {
  return (
    <div className={`app gp ${keypad ? 'compact' : ''} ${sheet ? 'stack' : ''}`}>
      <div className="gp-bar">
        <Icon name="back" size={22} />
        <span />
      </div>
      <div className="gp-payee">
        <span className="gp-av lg" style={{ background: payee.color }}>
          {payee.initial}
        </span>
        <div className="gp-payee-name">Paying {payee.name}</div>
        <div className="gp-payee-sub">{payee.bank}</div>
      </div>
      <div className="gp-amt">
        <span className="rs">₹</span>
        <span className={amount ? '' : 'ph'}>{amount || '0'}</span>
      </div>
      <div className="gp-note">Add note</div>
      <div className="gp-go-row">
        <div className={`gp-go ${amount ? '' : 'dis'}`} data-t="next" aria-label="Proceed">
          <Icon name="arrow" size={26} color="#fff" stroke={2.5} />
        </div>
      </div>
      {keypad && <Keypad />}

      {sheet && (
        <>
          <div className="gp-dim" />
          <div className="gp-sheet">
            <div className="gp-sheet-h">Choose account to pay with</div>
            <div className="gp-acct on">
              <span className="gp-bank-ic">
                <Icon name="bank" size={20} />
              </span>
              <div>
                <b>Practice Bank ••4321</b>
                <small>Savings account</small>
              </div>
              <span className="gp-radio" />
            </div>
            <div className="gp-btn wide" data-t="pay-final">
              Pay ₹{amount}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function GpPin({ payee, amount, typed, full }) {
  const filled = full ? 4 : (typed || '').length;
  return (
    <div className="app pin">
      <div className="pin-top">
        <div className="pin-bank">Practice Bank</div>
        <div className="pin-row">
          <span>To:</span>
          <b>{payee.name}</b>
        </div>
        <div className="pin-row">
          <span>Sending:</span>
          <b>₹{amount}.00</b>
        </div>
      </div>
      <div className="pin-label">ENTER 4-DIGIT UPI PIN</div>
      <div className="dots">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={i < filled ? 'on' : ''} />
        ))}
      </div>
      <div className="pin-warn">Practice PIN: 1 2 3 4. Never your real PIN.</div>
      <Keypad tick />
    </div>
  );
}

export function GpSuccess({ payee, amount, title }) {
  return (
    <div className="app gp-done">
      <div className="gp-done-tick">
        <Icon name="check" size={54} color="#fff" stroke={3} />
      </div>
      <div className="gp-done-amt">₹{amount}</div>
      <div className="gp-done-to">{title || `Paid to ${payee.name}`}</div>
      <div className="gp-done-meta">Just now · UPI transaction ID: PRACTICE0001</div>
      <div className="gp-btn wide done" data-t="done">
        Done
      </div>
    </div>
  );
}

export function GpRechargeNumbers() {
  return (
    <div className="app gp">
      <div className="gp-bar">
        <Icon name="back" size={22} />
        <span>Mobile recharge</span>
      </div>
      <div className="gp-search in">
        <Icon name="search" size={18} />
        <span>Enter a name or mobile number</span>
      </div>
      <div className="gp-list-h">My number</div>
      <div className="gp-row" data-t="my-number">
        <span className="gp-av" style={{ background: '#1967d2' }}>
          K
        </span>
        <div>
          <b>Kamla Devi (You)</b>
          <small>+91 98765 43210 · Prepaid</small>
        </div>
      </div>
      <div className="gp-list-h">Contacts</div>
      {CONTACTS.slice(0, 3).map((c, i) => (
        <div key={i} className="gp-row">
          <span className="gp-av" style={{ background: c.c }}>
            {c.name[0]}
          </span>
          <div>
            <b>{c.name}</b>
            <small>{c.ph}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

const PLANS = [
  { t: 'plan-299', price: 299, days: '28 days', data: '1.5 GB/day', extra: 'Unlimited calls · 100 SMS/day' },
  { price: 349, days: '28 days', data: '2 GB/day', extra: 'Unlimited calls · 100 SMS/day' },
  { price: 199, days: '18 days', data: '1.5 GB/day', extra: 'Unlimited calls' },
  { price: 19, days: '1 day', data: '1 GB', extra: 'Data add-on' },
];

export function GpPlans() {
  return (
    <div className="app gp">
      <div className="gp-bar">
        <Icon name="back" size={22} />
        <div className="gp-bar-name">
          <b>Kamla Devi</b>
          <small>+91 98765 43210 · Prepaid</small>
        </div>
      </div>
      <div className="gp-tabs">
        <span className="on">Recommended</span>
        <span>Unlimited</span>
        <span>Data</span>
      </div>
      <div className="gp-plans">
        {PLANS.map((p, i) => (
          <div key={i} className="gp-plan" data-t={p.t}>
            <div className="gp-plan-top">
              <b>₹{p.price}</b>
              <Icon name="chevron" size={20} />
            </div>
            <div className="gp-plan-mid">
              <span>
                <small>Validity</small>
                {p.days}
              </span>
              <span>
                <small>Data</small>
                {p.data}
              </span>
            </div>
            <div className="gp-plan-extra">{p.extra}</div>
          </div>
        ))}
      </div>
      <div className="gp-foot-note">Practice prices, not real plans</div>
    </div>
  );
}

const BILL_CATS = [
  { t: 'cat-electricity', icon: '💡', label: 'Electricity' },
  { icon: '📱', label: 'Mobile postpaid' },
  { icon: '📺', label: 'DTH / Cable TV' },
  { icon: '🔥', label: 'LPG cylinder' },
  { icon: '🌐', label: 'Broadband' },
  { icon: '🚰', label: 'Water' },
  { icon: '🚗', label: 'FASTag' },
  { icon: '💳', label: 'Credit card' },
];

export function GpBills() {
  return (
    <div className="app gp">
      <div className="gp-bar">
        <Icon name="back" size={22} />
        <span>Pay bills</span>
      </div>
      <div className="gp-list-h">Choose a bill type</div>
      <div className="gp-cats">
        {BILL_CATS.map((c, i) => (
          <div key={i} className="gp-cat" data-t={c.t}>
            <span>{c.icon}</span>
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}

const BOARDS = [
  { t: 'board-1', name: 'Bijli Vitaran Nigam (Practice)', area: 'Your state' },
  { name: 'City Power Supply Ltd (Practice)', area: 'Metro cities' },
  { name: 'Gramin Vidyut Board (Practice)', area: 'Rural areas' },
  { name: 'Northern Power Co. (Practice)', area: 'North zone' },
];

export function GpBoards() {
  return (
    <div className="app gp">
      <div className="gp-bar">
        <Icon name="back" size={22} />
        <span>Electricity</span>
      </div>
      <div className="gp-search in">
        <Icon name="search" size={18} />
        <span>Search for your electricity board</span>
      </div>
      <div className="gp-list-h">All billers</div>
      {BOARDS.map((b, i) => (
        <div key={i} className="gp-row" data-t={b.t}>
          <span className="gp-av" style={{ background: '#b06000' }}>
            ⚡
          </span>
          <div>
            <b>{b.name}</b>
            <small>{b.area}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export function GpConsumer({ typed, keypad }) {
  return (
    <div className={`app gp ${keypad ? 'compact' : ''}`}>
      <div className="gp-bar">
        <Icon name="back" size={22} />
        <span>Bijli Vitaran Nigam</span>
      </div>
      <div className="gp-field">
        <label>Consumer number</label>
        <div className="gp-input">{typed || <span className="ph">Enter consumer number</span>}</div>
        <small>Printed on your paper bill, near your name</small>
      </div>
      <div className={`gp-btn wide ${typed && typed.length >= 6 ? '' : 'dis'}`} data-t="fetch">
        Confirm
      </div>
      {keypad && <Keypad />}
    </div>
  );
}

export function GpBill() {
  return (
    <div className="app gp">
      <div className="gp-bar">
        <Icon name="back" size={22} />
        <span>Bijli Vitaran Nigam</span>
      </div>
      <div className="gp-billcard">
        <div className="gp-bill-row">
          <span>Name</span>
          <b>KAMLA DEVI</b>
        </div>
        <div className="gp-bill-row">
          <span>Consumer no.</span>
          <b>452187</b>
        </div>
        <div className="gp-bill-row">
          <span>Bill date</span>
          <b>5 Oct</b>
        </div>
        <div className="gp-bill-row">
          <span>Due date</span>
          <b>20 Oct</b>
        </div>
        <div className="gp-bill-amt">₹1,240</div>
      </div>
      <div className="gp-btn wide" data-t="pay-bill">
        Pay ₹1,240
      </div>
    </div>
  );
}
