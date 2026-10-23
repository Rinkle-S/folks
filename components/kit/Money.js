// Google Pay extras, PhonePe, Paytm and bank apps (YONO SBI, iMobile).
// Google Pay screens reuse the look of components/screens/GPay.js.
import Icon from '../Icons';
import AppIcon from '../AppIcon';
import { Av, Status, Keys, PinDots } from './ui';
import { GpHome, GpAmount, GpPin, GpSuccess } from '../screens/GPay';

export { GpHome, GpAmount, GpPin, GpSuccess };

const BANKS = [
  { k: 'sbi', name: 'State Bank of India', acc: '••5234', c: '#2a5caa' },
  { k: 'hdfc', name: 'HDFC Bank', acc: '••8891', c: '#004c8f' },
];

function GpBar({ title, more }) {
  return (
    <div className="gp-bar">
      <Icon name="back" size={22} />
      <span style={{ flex: 1 }}>{title}</span>
      {more !== undefined && (
        <span data-t={more ? 'more' : undefined}>
          <Icon name="more" size={22} />
        </span>
      )}
    </div>
  );
}

// Choose a bank account (balance check, reset PIN).
export function GpBanks({ title = 'Select bank account', tap }) {
  return (
    <div className="app gp">
      <GpBar title={title} />
      <div className="gp-list-h">Bank accounts</div>
      {BANKS.map((b) => (
        <div key={b.k} className="gp-row k-gp-bank" data-t={tap === b.k ? `bank-${b.k}` : undefined}>
          <span className="gp-bank-ic" style={{ background: '#e8f0fe', color: b.c }}>
            <Icon name="bank" size={20} />
          </span>
          <div style={{ flex: 1 }}>
            <b>{b.name}</b>
            <small>Savings {b.acc}</small>
          </div>
          <Icon name="chevron" size={18} />
        </div>
      ))}
    </div>
  );
}

export function GpProfile({ tap }) {
  return (
    <div className="app gp">
      <GpBar title="" more={false} />
      <div className="k-gp-prof">
        <span className="gp-me lg">K</span>
        <b>Kamla Devi</b>
        <small>kamla.devi@okaxis</small>
        <span className="k-gp-qr">
          <Icon name="scan" size={18} /> Your QR code
        </span>
      </div>
      {[
        ['bank', 'bank', 'Bank account', '2 accounts'],
        ['card', 'card', 'Credit & debit cards', 'Add a card'],
        ['upi', 'upi', 'UPI Lite', 'Pay small amounts without PIN'],
        ['settings', 'gear', 'Settings', ''],
        ['help', 'help', 'Get help', ''],
      ].map(([k, ic, l, s]) => (
        <div key={k} className="gp-row" data-t={tap === k ? k : undefined}>
          <span className="gp-bank-ic">
            <Icon name={ic} size={20} />
          </span>
          <div style={{ flex: 1 }}>
            <b>{l}</b>
            {s && <small>{s}</small>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function GpBankPage({ more }) {
  return (
    <div className="app gp">
      <GpBar title="" more={more} />
      <div className="k-gp-prof">
        <span className="gp-bank-ic lg">
          <Icon name="bank" size={30} />
        </span>
        <b>State Bank of India ••5234</b>
        <small>Savings account · Primary</small>
      </div>
      <div className="gp-links">
        <div>
          <Icon name="balance" size={20} /> Check balance
        </div>
        <div>
          <Icon name="key" size={20} /> UPI PIN is set
        </div>
        <div>
          <Icon name="upi" size={20} /> UPI ID: kamla.devi@oksbi
        </div>
      </div>
    </div>
  );
}

export function GpBalance() {
  return (
    <div className="app gp-done">
      <div className="gp-done-tick">
        <Icon name="bank" size={44} color="#fff" stroke={2.4} />
      </div>
      <div className="gp-done-to">State Bank of India ••5234</div>
      <div className="gp-done-amt">₹12,450.00</div>
      <div className="gp-done-meta">Available balance</div>
    </div>
  );
}

const TXNS = [
  { k: 'sharma', n: 'Sharma General Store', d: '23 Oct', a: '₹50', c: '#5f6368' },
  { k: 'ramesh', n: 'Ramesh Bhaiya', d: '21 Oct', a: '₹500', c: '#ea580c' },
  { k: 'failed', n: 'Gupta Medical', d: '20 Oct', a: '₹320', c: '#16a34a', failed: true },
  { k: 'sunita', n: 'Sunita', d: '19 Oct', a: '+ ₹200', c: '#e8710a', inn: true },
  { k: 'bill', n: 'Bijli Vitaran Nigam', d: '15 Oct', a: '₹1,240', c: '#b06000' },
];
export function GpHistory({ tap }) {
  return (
    <div className="app gp">
      <GpBar title="Transaction history" />
      <div className="gp-search in">
        <Icon name="search" size={18} />
        <span>Search transactions</span>
      </div>
      <div className="gp-list-h">October</div>
      {TXNS.map((t) => (
        <div key={t.k} className="gp-row" data-t={tap === t.k ? `txn-${t.k}` : undefined}>
          <Av name={t.n} size={40} color={t.c} />
          <div style={{ flex: 1 }}>
            <b>{t.n}</b>
            <small style={t.failed ? { color: '#d93025' } : undefined}>{t.failed ? `Failed · ${t.d}` : t.d}</small>
          </div>
          <b className={t.inn ? 'k-green' : ''}>{t.a}</b>
        </div>
      ))}
    </div>
  );
}

export function GpTxn({ failed, help }) {
  return (
    <div className="app gp">
      <GpBar title="" more={false} />
      <div className="k-gp-prof">
        <Av name={failed ? 'Gupta Medical' : 'Sharma General Store'} size={56} color={failed ? '#16a34a' : '#5f6368'} />
        <small>To {failed ? 'Gupta Medical' : 'Sharma General Store'}</small>
        <b className="k-gp-big">{failed ? '₹320' : '₹50'}</b>
        <span className={failed ? 'k-gp-fail' : 'k-gp-ok'}>{failed ? '⚠ Failed' : '✓ Completed'}</span>
        <small>{failed ? '20 Oct, 11:42 am' : '23 Oct, 4:12 pm'}</small>
      </div>
      <div className="k-gp-card">
        <div>
          <small>UPI transaction ID</small>
          <b>4231 8890 2211</b>
        </div>
        <div>
          <small>From</small>
          <b>State Bank of India ••5234</b>
        </div>
      </div>
      {failed && (
        <div className="k-gp-help" data-t={help ? 'help' : undefined}>
          <Icon name="help" size={20} /> Having issues?
        </div>
      )}
    </div>
  );
}

export function GpCard() {
  return (
    <div className="app gp">
      <GpBar title="Reset UPI PIN" />
      <div className="k-gp-form">
        <small>Enter the last 6 digits of your debit card and its expiry date</small>
        <div className="k-gp-field">
          <span>Last 6 digits</span>
          <b>• • • • • •</b>
        </div>
        <div className="k-gp-field">
          <span>Expiry (MM/YY)</span>
          <b>08 / 29</b>
        </div>
      </div>
      <Keys />
    </div>
  );
}

export function GpOtp({ title = 'Enter the 6-digit code sent to your phone' }) {
  return (
    <div className="app gp">
      <GpBar title="Verify" />
      <div className="k-gp-form">
        <small>{title}</small>
        <PinDots n={6} filled={3} color="#0b57d0" />
        <small className="k-warn">Type it yourself. Never tell this code to anyone.</small>
      </div>
      <Keys />
    </div>
  );
}

// Pay phone number: type the number. found: show who it belongs to (the name to check).
export function GpPayPhone({ number = '98765 43210', found, tap }) {
  return (
    <div className="app gp">
      <GpBar title="Pay phone number" />
      <div className="k-gp-num">
        <span>+91</span>
        <b>{number}</b>
      </div>
      {found && (
        <div className="gp-row k-gp-found" data-t={tap ? 'person' : undefined}>
          <Av name="Ramesh Kumar" size={44} color="#ea580c" />
          <div style={{ flex: 1 }}>
            <b>Ramesh Kumar</b>
            <small>Banking name: RAMESH KUMAR</small>
          </div>
        </div>
      )}
      {!found && <Keys />}
    </div>
  );
}

// Google Pay QR scanner with the gallery icon, and the picture picker.
export function GpScanG({ gallery }) {
  return (
    <div className="app gp-cam">
      <div className="gp-cam-top">
        <Icon name="back" size={22} color="#fff" />
        <span>Scan any QR code</span>
        <span data-t={gallery ? 'gallery' : undefined} className="k-cam-ic">
          <Icon name="image" size={22} color="#fff" />
        </span>
      </div>
      <div className="viewfinder">
        <div className="vf-corner tl" />
        <div className="vf-corner tr" />
        <div className="vf-corner bl" />
        <div className="vf-corner br" />
      </div>
      <div className="k-cam-hint">Point at a QR code, or pick a picture of one from your gallery</div>
    </div>
  );
}

export function PhotoPick() {
  return (
    <div className="app k-gal">
      <Status />
      <div className="k-gal-bar">
        <b>Select a photo</b>
      </div>
      <div className="k-gal-grid">
        {['🌅', '🌸', 'QR', '🏞️', '🎂', '🪔'].map((p, i) => (
          <span key={i} data-t={p === 'QR' ? 'qr' : undefined} className={p === 'QR' ? 'k-qrthumb' : ''}>
            {p === 'QR' ? <Icon name="scan" size={46} /> : p}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------- PhonePe ----------
export function PpHome({ tap }) {
  const tiles = [
    ['to-mobile', 'phone', 'To Mobile Number'],
    ['to-bank', 'bank', 'To Bank/ UPI ID'],
    ['to-self', 'self', 'To Self Account'],
    ['balance', 'balance', 'Check Balance'],
  ];
  return (
    <div className="app k-pp">
      <div className="k-pp-head">
        <Av name="K" size={34} color="#fff" />
        <span>
          <small>Add Address</small>
          <b>Kochi ▾</b>
        </span>
        <Icon name="scan" size={22} color="#fff" />
        <Icon name="bell" size={22} color="#fff" />
        <Icon name="help" size={22} color="#fff" />
      </div>
      <div className="k-pp-card">
        <b>Money Transfers</b>
        <div className="k-pp-grid">
          {tiles.map(([k, ic, l]) => (
            <div key={k} data-t={tap === k ? k : undefined}>
              <span>
                <Icon name={ic} size={22} color="#fff" />
              </span>
              <small>{l}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="k-pp-card">
        <b>Recharge & Pay Bills</b>
        <div className="k-pp-grid light">
          {[
            ['recharge', 'Mobile Recharge'],
            ['bills', 'Electricity'],
            ['card', 'Credit Card'],
            ['wifi', 'Broadband'],
          ].map(([ic, l]) => (
            <div key={l}>
              <span>
                <Icon name={ic} size={22} />
              </span>
              <small>{l}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="k-pp-nav">
        {[
          ['home', 'Home'],
          ['search', 'Search'],
          ['scan', ''],
          ['bell', 'Alerts'],
          ['history', 'History'],
        ].map(([ic, l]) => (
          <span key={ic} className={ic === 'scan' ? 'scan' : ic === 'home' ? 'on' : ''}>
            <Icon name={ic} size={ic === 'scan' ? 26 : 22} color={ic === 'scan' ? '#fff' : undefined} />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PpContacts({ tap }) {
  return (
    <div className="app k-pp white">
      <div className="k-pp-bar">
        <Icon name="back" size={22} color="#fff" />
        <b>Send Money</b>
      </div>
      <div className="gp-search in">
        <Icon name="search" size={18} />
        <span>Search number or name</span>
      </div>
      <div className="gp-list-h">All contacts</div>
      {[
        ['ramesh', 'Ramesh Kumar', '+91 98765 43210', '#ea580c'],
        ['sunita', 'Sunita', '+91 98110 24567', '#16a34a'],
        ['anil', 'Anil', '+91 99023 11845', '#2563eb'],
      ].map(([k, n, ph, c]) => (
        <div key={k} className="gp-row" data-t={tap === k ? `p-${k}` : undefined}>
          <Av name={n} size={40} color={c} />
          <div>
            <b>{n}</b>
            <small>{ph}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PpAmount({ amount = '500', send }) {
  return (
    <div className="app k-pp white">
      <div className="k-pp-bar">
        <Icon name="back" size={22} color="#fff" />
        <Av name="Ramesh Kumar" size={34} color="#ea580c" />
        <span className="k-pp-who">
          <b>Ramesh Kumar</b>
          <small>+91 98765 43210</small>
        </span>
      </div>
      <div className="k-pp-thread">
        <div className="k-pp-amt">
          <small>Enter amount</small>
          <b>₹ {amount}</b>
          <i>Add a message</i>
        </div>
      </div>
      <div className="k-pp-send" data-t={send ? 'send' : undefined}>
        Send
      </div>
    </div>
  );
}

// Choose bank sheet (PhonePe / Paytm style) with a pay button.
export function PayBankSheet({ brand = '#5f259f', label = 'PAY ₹500' }) {
  return (
    <div className="k-dim end">
      <div className="k-sheet">
        <i className="k-sheet-h" />
        <div className="k-sheet-t">Pay using</div>
        <div className="gp-acct on">
          <span className="gp-bank-ic">
            <Icon name="bank" size={20} />
          </span>
          <div>
            <b>State Bank of India ••5234</b>
            <small>Savings account</small>
          </div>
          <span className="gp-radio" style={{ borderColor: brand }} />
        </div>
        <div className="k-sheet-btn" data-t="pay" style={{ background: brand }}>
          {label}
        </div>
      </div>
    </div>
  );
}

// ---------- Paytm ----------
export function PtHome({ tap }) {
  return (
    <div className="app k-pt">
      <div className="k-pt-head">
        <Av name="K" size={34} color="#00b9f1" />
        <b className="k-pt-word">paytm</b>
        <Icon name="search" size={22} />
        <Icon name="bell" size={22} />
      </div>
      <div className="k-pt-card">
        <b>UPI Money Transfer</b>
        <div className="k-pt-grid">
          {[
            ['scan', 'scan', 'Scan & Pay'],
            ['to-mobile', 'phone', 'To Mobile or Contact'],
            ['to-bank', 'bank', 'To Bank A/c or UPI ID'],
            ['balance', 'balance', 'Balance & History'],
          ].map(([k, ic, l]) => (
            <div key={k} data-t={tap === k ? k : undefined}>
              <span>
                <Icon name={ic} size={24} />
              </span>
              <small>{l}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="k-pt-card">
        <b>Recharges & Bill Payments</b>
        <div className="k-pt-grid">
          {[
            ['recharge', 'Mobile Recharge'],
            ['bills', 'Electricity Bill'],
            ['card', 'Credit Card'],
            ['wifi', 'DTH'],
          ].map(([ic, l]) => (
            <div key={l}>
              <span>
                <Icon name={ic} size={24} />
              </span>
              <small>{l}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PtContacts({ tap }) {
  return (
    <div className="app k-pt">
      <div className="k-pt-bar">
        <Icon name="back" size={22} />
        <b>Pay to Mobile or Contact</b>
      </div>
      <div className="gp-search in">
        <Icon name="search" size={18} />
        <span>Enter mobile number or name</span>
      </div>
      <div className="gp-list-h">Recent</div>
      {[
        ['ramesh', 'Ramesh Kumar', '98765 43210', '#ea580c'],
        ['sunita', 'Sunita', '98110 24567', '#16a34a'],
      ].map(([k, n, ph, c]) => (
        <div key={k} className="gp-row" data-t={tap === k ? `p-${k}` : undefined}>
          <Av name={n} size={40} color={c} />
          <div>
            <b>{n}</b>
            <small>{ph}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PtAmount({ pay }) {
  return (
    <div className="app k-pt">
      <div className="k-pt-bar">
        <Icon name="back" size={22} />
        <Av name="Ramesh Kumar" size={34} color="#ea580c" />
        <b>
          Ramesh Kumar
          <small>Banking name: RAMESH KUMAR</small>
        </b>
      </div>
      <div className="k-pt-amt">
        <b>₹ 500</b>
        <small>Add a message (optional)</small>
      </div>
      <div className="k-pt-pay" data-t={pay ? 'pay' : undefined}>
        Pay
      </div>
      <Keys />
    </div>
  );
}

// ---------- Bank apps (YONO SBI, iMobile) ----------
const BANK = {
  sbi: { name: 'YONO SBI', c: '#2a5caa', c2: '#1b3f78', acct: 'Savings A/c ••5234' },
  icici: { name: 'iMobile Pay', c: '#ae282e', c2: '#f37e20', acct: 'Savings A/c ••6612' },
};

function BkBar({ bank, title }) {
  const b = BANK[bank];
  return (
    <div className="k-bk-bar" style={{ background: b.c }}>
      <Icon name="back" size={22} color="#fff" />
      <b>{title}</b>
    </div>
  );
}

export function BkLogin({ bank = 'sbi', filled = 3 }) {
  const b = BANK[bank];
  return (
    <div className="app k-bk login" style={{ background: `linear-gradient(170deg, ${b.c}, ${b.c2})` }}>
      <div className="k-bk-logo">
        <AppIcon app={bank === 'sbi' ? 'yono' : 'icici'} size={64} />
        <b>{b.name}</b>
      </div>
      <small>Welcome back, Kamla</small>
      <div className="k-bk-pinlabel">Enter your 6-digit MPIN</div>
      <PinDots n={6} filled={filled} color="#fff" />
      <div className="k-bk-alt">
        <Icon name="touch" size={20} color="#fff" /> Use fingerprint
      </div>
      <span className="k-bk-forgot" data-t="forgot">
        Forgot MPIN?
      </span>
      <Keys />
    </div>
  );
}

export function BkHome({ bank = 'sbi', tap }) {
  const b = BANK[bank];
  const tiles =
    bank === 'sbi'
      ? [
          ['accounts', 'bank', 'Accounts'],
          ['pay', 'self', 'Pay & Transfer'],
          ['cards', 'card', 'Cards'],
          ['invest', 'gauge', 'Investments'],
          ['bills', 'bills', 'Bill Pay'],
          ['services', 'gear', 'Service Request'],
        ]
      : [
          ['pay', 'self', 'Pay / Transfer'],
          ['accounts', 'bank', 'Accounts'],
          ['cards', 'card', 'Cards & Forex'],
          ['bills', 'bills', 'Bill Pay'],
          ['invest', 'gauge', 'Invest'],
          ['services', 'gear', 'Services'],
        ];
  return (
    <div className="app k-bk">
      <div className="k-bk-top" style={{ background: b.c }}>
        <div className="k-bk-row">
          <Icon name="menu" size={22} color="#fff" />
          <b>{b.name}</b>
          <Icon name="bell" size={22} color="#fff" />
          <Icon name="logout" size={22} color="#fff" />
        </div>
        <div className="k-bk-acct" data-t={tap === 'account' ? 'account' : undefined}>
          <small>{b.acct}</small>
          <b>₹ ••••••</b>
          <span>View balance ›</span>
        </div>
      </div>
      <div className="k-bk-grid">
        {tiles.map(([k, ic, l]) => (
          <div key={k} data-t={tap === k ? `tile-${k}` : undefined}>
            <span style={{ color: b.c }}>
              <Icon name={ic} size={26} />
            </span>
            <small>{l}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

// A list page. items: [k, icon, title, sub]
export function BkList({ bank = 'sbi', title, items, tap, h }) {
  const b = BANK[bank];
  return (
    <div className="app k-bk">
      <BkBar bank={bank} title={title} />
      {h && <div className="k-bk-h">{h}</div>}
      {items.map(([k, ic, t, s]) => (
        <div key={k} className="k-bk-item" data-t={tap === k ? k : undefined}>
          {ic.length > 2 ? (
            <span className="k-bk-ic" style={{ color: b.c }}>
              <Icon name={ic} size={22} />
            </span>
          ) : (
            <Av name={t} size={42} />
          )}
          <span className="k-bk-tx">
            <b>{t}</b>
            {s && <small>{s}</small>}
          </span>
          <Icon name="chevron" size={18} />
        </div>
      ))}
    </div>
  );
}

// A form page. fields: [label, value]; chips: [k, label, on]; button: [t, label]
export function BkForm({ bank = 'sbi', title, fields = [], chips, chipTap, button, note }) {
  const b = BANK[bank];
  return (
    <div className="app k-bk">
      <BkBar bank={bank} title={title} />
      <div className="k-bk-form">
        {fields.map(([l, v]) => (
          <div key={l} className="k-bk-field">
            <small>{l}</small>
            <b>{v}</b>
          </div>
        ))}
        {chips && (
          <div className="k-bk-chips">
            {chips.map(([k, l, on]) => (
              <span key={k} className={on ? 'on' : ''} style={on ? { background: b.c, borderColor: b.c } : undefined} data-t={chipTap === k ? `chip-${k}` : undefined}>
                {l}
              </span>
            ))}
          </div>
        )}
        {note && <div className="k-bk-note">{note}</div>}
      </div>
      {button && (
        <div className="k-bk-btn" style={{ background: b.c }} data-t={button[0]}>
          {button[1]}
        </div>
      )}
    </div>
  );
}

export function BkOtp({ bank = 'sbi' }) {
  return (
    <div className="app k-bk">
      <BkBar bank={bank} title="Enter OTP" />
      <div className="k-bk-form center">
        <Icon name="mail" size={36} />
        <b>OTP sent to +91 98xxx xx345</b>
        <PinDots n={6} filled={4} color={BANK[bank].c} />
        <small className="k-warn">Type it yourself. The bank will never call you to ask for it.</small>
      </div>
      <Keys />
    </div>
  );
}

export function BkStatement({ bank = 'sbi', download, toast }) {
  const b = BANK[bank];
  return (
    <div className="app k-bk">
      <BkBar bank={bank} title="Account Statement" />
      <div className="k-bk-chips pad">
        <span>1 month</span>
        <span className="on" style={{ background: b.c, borderColor: b.c }}>
          3 months
        </span>
        <span>Custom</span>
      </div>
      {[
        ['22 Oct', 'UPI/Sharma General Store', '- ₹50'],
        ['21 Oct', 'UPI/Ramesh Kumar', '- ₹500'],
        ['20 Oct', 'Pension credit', '+ ₹18,500'],
        ['15 Oct', 'Electricity bill', '- ₹1,240'],
      ].map(([d, n, a]) => (
        <div key={n} className="k-bk-item">
          <span className="k-bk-tx">
            <b>{n}</b>
            <small>{d}</small>
          </span>
          <b className={a.startsWith('+') ? 'k-green' : ''}>{a}</b>
        </div>
      ))}
      <div className="k-bk-btnrow">
        <span className="k-bk-btn sm" style={{ background: b.c }} data-t={download ? 'download' : undefined}>
          <Icon name="download" size={18} color="#fff" /> Download PDF
        </span>
        <span className="k-bk-btn sm ghost" style={{ color: b.c, borderColor: b.c }}>
          <Icon name="share" size={18} /> Share
        </span>
      </div>
      {toast && <div className="k-toast">{toast}</div>}
    </div>
  );
}
