// Google Pay extras (balance, history, PIN reset, pay a number), PhonePe and bank apps (YONO SBI).
// Google Pay screens share the parts in components/screens/GPay.js, so every lesson looks the same.
import Icon from '../Icons';
import AppIcon from '../AppIcon';
import { Av, Status, Keys, PinDots } from './ui';
import { GpHome, GpAmount, GpPin, GpSuccess, GpScan, GpPayAnyone, GpMoney, GpTop, GpAv, BankBadge, BANKS, ME } from '../screens/GPay';

export { GpHome, GpAmount, GpPin, GpSuccess, GpMoney };

// Choose a bank account (balance check, reset PIN).
export function GpBanks({ title = 'Select bank account', tap }) {
  return (
    <div className="app gp g2">
      <Status />
      <GpTop title={title} />
      <div className="g2-list-h">Bank accounts</div>
      {BANKS.map((b) => (
        <div key={b.k} className="g2-row" data-t={tap === b.k ? `bank-${b.k}` : undefined}>
          <BankBadge bank={b} />
          <div className="g2-row-t">
            <b>
              {b.name} ••••{b.last4}
            </b>
            <small>Savings account</small>
          </div>
          <Icon name="chevron" size={18} />
        </div>
      ))}
    </div>
  );
}

// "You": the profile page from the round picture at the top right.
export function GpProfile({ tap }) {
  return (
    <div className="app gp g2">
      <Status />
      <GpTop right={['more']} />
      <div className="g2-prof">
        <GpAv name={ME.name} color="#c26401" size={72} />
        <b>{ME.name}</b>
        <small>UPI ID: {ME.upi}</small>
        <span className="g2-chip">
          <Icon name="scan" size={18} /> Your QR code
        </span>
      </div>
      {[
        ['bank', 'bank', 'Bank account', '2 accounts'],
        ['card', 'card', 'Credit & debit cards', 'Add a card'],
        ['upi', 'upi', 'UPI Lite', 'Pay small amounts without PIN'],
        ['settings', 'gear', 'Settings', ''],
        ['help', 'help', 'Get help', ''],
      ].map(([k, ic, l, sub]) => (
        <div key={k} className="g2-row" data-t={tap === k ? k : undefined}>
          <span className="g2-round">
            <Icon name={ic} size={20} />
          </span>
          <div className="g2-row-t">
            <b>{l}</b>
            {sub && <small>{sub}</small>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function GpBankPage({ more }) {
  const b = BANKS[0];
  return (
    <div className="app gp g2">
      <Status />
      <GpTop right={[{ icon: 'more', t: more ? 'more' : undefined }]} />
      <div className="g2-prof">
        <BankBadge bank={b} size={64} />
        <b>
          {b.name} ••••{b.last4}
        </b>
        <small>Savings account · Primary</small>
      </div>
      <div className="g2-links">
        <div>
          <Icon name="balance" size={22} /> <span>Check balance</span> <Icon name="chevron" size={18} />
        </div>
        <div>
          <Icon name="key" size={22} /> <span>UPI PIN is set</span>
        </div>
        <div>
          <Icon name="upi" size={22} /> <span>UPI ID: {ME.upi}</span>
        </div>
      </div>
    </div>
  );
}

export function GpBalance() {
  const b = BANKS[0];
  return (
    <div className="app gp g2">
      <Status />
      <GpTop left="close" />
      <div className="g2-done">
        <BankBadge bank={b} size={72} />
        <div className="g2-done-to">
          {b.name} ••••{b.last4}
        </div>
        <small>Available balance</small>
        <div className="g2-done-amt">₹ 12,450.00</div>
      </div>
    </div>
  );
}

const TXNS = [
  { k: 'sharma', n: 'Sunrise General Store', d: '23 October', a: '₹50', c: '#5f6368' },
  { k: 'ramesh', n: 'Ramesh Bhaiya', d: '21 October', a: '₹500', c: '#1e8e3e' },
  { k: 'failed', n: 'Gupta Medical', d: '20 October', a: '₹320', c: '#16a34a', failed: true },
  { k: 'sunita', n: 'Sunita Didi', d: '19 October', a: '+ ₹200', c: '#e8710a', inn: true },
  { k: 'bill', n: 'State Electricity Board', d: '15 October', a: '₹1,240', c: '#b06000' },
];
export function GpHistory({ tap }) {
  return (
    <div className="app gp g2">
      <Status />
      <GpTop title="Transaction history" right={['more']} />
      <div className="g2-find">
        <div className="g2-input">
          <Icon name="search" size={20} />
          <span className="ph">Search transactions</span>
        </div>
      </div>
      <div className="g2-list-h">October</div>
      {TXNS.map((t) => (
        <div key={t.k} className="g2-row" data-t={tap === t.k ? `txn-${t.k}` : undefined}>
          <GpAv name={t.n} color={t.c} />
          <div className="g2-row-t">
            <b>{t.n}</b>
            <small style={t.failed ? { color: '#b3261e' } : undefined}>{t.failed ? `Failed · ${t.d}` : t.d}</small>
          </div>
          <b className={t.inn ? 'k-green' : ''}>{t.a}</b>
        </div>
      ))}
    </div>
  );
}

export function GpTxn({ failed, help }) {
  const name = failed ? 'Gupta Medical' : 'Sunrise General Store';
  return (
    <div className="app gp g2">
      <Status />
      <GpTop left="close" right={['share', 'more']} />
      <div className="g2-done">
        <GpAv name={name} color={failed ? '#16a34a' : '#5f6368'} size={56} />
        <small>To {name}</small>
        <div className="g2-done-amt">{failed ? '₹320' : '₹50'}</div>
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
          <b>
            {BANKS[0].name} ••••{BANKS[0].last4}
          </b>
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
    <div className="app gp g2">
      <Status />
      <GpTop title="Reset UPI PIN" />
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
    <div className="app gp g2">
      <Status />
      <GpTop title="Verify" />
      <div className="k-gp-form">
        <small>{title}</small>
        <PinDots n={6} filled={3} color="#0b57d0" />
        <small className="k-warn">Type it yourself. Never tell this code to anyone.</small>
      </div>
      <Keys />
    </div>
  );
}

// Pay a phone number: "Pay anyone", type the number, then check whose name comes up.
export function GpPayPhone({ number = '99023 11845', found, tap }) {
  return <GpPayAnyone number={number} found={found} tap={tap} keypad={!found} />;
}

// Google Pay QR scanner, with "Upload from gallery" as the tap target.
export function GpScanG({ gallery }) {
  return <GpScan gallery={gallery} />;
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
      <small>Welcome back, Kamala</small>
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
        ['22 Oct', 'UPI/Sunrise General Store', '- ₹50'],
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
