// Practice look-alike of Google Pay (India), matched to the reference screens in docs/reference/gpay.
// Same order, labels and layout as the real app; no Google logos, no real names, numbers or UPI IDs.
import Icon from '../Icons';
import AppIcon from '../AppIcon';
import Keypad from './Keypad';
import { Status } from '../kit/ui';
import { useScreenLang } from '../LangCtx';
import { PIN_NOTE } from '@/lib/screenText';

// The practice person and bank, the same on every Google Pay screen.
export const ME = { name: 'Kamala Nair', initial: 'K', upi: 'kamala.nair@oksbi', phone: '+91 98765 43210' };
export const BANKS = [
  { k: 'sbi', name: 'State Bank of India', last4: '5234', c: '#2a5caa' },
  { k: 'hdfc', name: 'HDFC Bank', last4: '8891', c: '#004c8f' },
];
const BANK = BANKS[0];

const rupees = (a) => `₹${a || '0'}`;
const paise = (a) => `₹ ${a || '0'}${String(a || '').includes('.') ? '' : '.00'}`;

// ---------- Shared parts ----------

// Top bar: a back arrow or a close X on the left, an optional title, and icons on the right.
// left/right items: an icon name, or { icon, t } when it is a tap target.
export function GpTop({ left = 'back', title, sub, right = [], tint }) {
  const item = (x, i) => {
    const o = typeof x === 'string' ? { icon: x } : x;
    return (
      <span key={i} className="g2-ic" data-t={o.t}>
        <Icon name={o.icon} size={24} />
      </span>
    );
  };
  return (
    <div className={`g2-top ${tint ? 'tint' : ''}`}>
      {left && item(left === 'back' ? 'back' : left, 'l')}
      <div className="g2-top-t">
        {title && <b>{title}</b>}
        {sub && <small>{sub}</small>}
      </div>
      {right.map(item)}
    </div>
  );
}

// "Banking name: ..." with the green shield, the name to check before paying. Any other line is shown plain.
export function BankingName({ text }) {
  if (!text) return null;
  const m = /^Banking name:\s*(.*)$/.exec(text);
  if (!m) return <div className="g2-sub">{text}</div>;
  return (
    <div className="g2-bname">
      <Icon name="shieldCheck" size={16} color="#188038" />
      <span>Banking name:</span> <b>{m[1]}</b>
    </div>
  );
}

export function BankBadge({ bank = BANK, size = 40 }) {
  return (
    <span className="g2-bank" style={{ width: size, height: size, color: bank.c }}>
      <Icon name="bank" size={size * 0.5} />
    </span>
  );
}

export const UpiMark = () => <span className="g2-upi">UPI</span>;

export function GpAv({ name, color = '#0b57d0', size = 40, t }) {
  return (
    <span className="g2-av" data-t={t} style={{ width: size, height: size, background: color, fontSize: size * 0.42 }}>
      {String(name || '?').replace(/[^\p{L}\p{N}]/gu, '').slice(0, 1).toUpperCase()}
    </span>
  );
}

// Bottom tabs: Home, Money, You.
export function GpTabs({ on = 'home', tap }) {
  return (
    <div className="g2-tabs">
      {[
        ['home', 'home', 'Home'],
        ['money', 'rupee', 'Money'],
        ['you', 'user', 'You'],
      ].map(([k, ic, l]) => (
        <span key={k} className={on === k ? 'on' : ''} data-t={tap === k ? `tab-${k}` : undefined}>
          <i>{k === 'you' ? <GpAv name={ME.name} color="#c26401" size={26} /> : <Icon name={ic} size={22} />}</i>
          {l}
        </span>
      ))}
    </div>
  );
}

// QR-looking pattern (not a real, scannable code).
export function FakeQR({ size = 140 }) {
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

// A list row: picture, name, grey line, and something on the right.
function Row({ t, av, title, sub, right, children }) {
  return (
    <div className="g2-row" data-t={t}>
      {av}
      <div className="g2-row-t">
        <b>{title}</b>
        {sub && <small>{sub}</small>}
        {children}
      </div>
      {right}
    </div>
  );
}

// ---------- Home ----------

const PEOPLE = [
  ['Sunita Didi', '#e8710a'],
  ['Ramesh Bhaiya', '#1e8e3e'],
  ['Pinky', '#b3261e'],
  ['Raju (Milk)', '#1967d2'],
  ['Dr. Mehta', '#9334e6'],
  ['Rahul', '#00796b'],
];

function Tile({ t, icon, label, round }) {
  return (
    <div className="g2-tile" data-t={t}>
      <span className={`g2-tile-ic ${round ? 'round' : ''}`}>
        <Icon name={icon} size={24} />
      </span>
      {label}
    </div>
  );
}

function SecHead({ title, link }) {
  return (
    <div className="g2-sec-h">
      <b>{title}</b>
      {link && (
        <span>
          {link} <Icon name="chevron" size={16} />
        </span>
      )}
    </div>
  );
}

export function GpHome({ request, links, me, tab }) {
  return (
    <div className={`app gp g2 ${request ? 'stack' : ''}`}>
      <div className="g2-scroll">
        <div className="g2-hero">
          <Status />
          <div className="g2-head">
            <div className="g2-search">
              <Icon name="search" size={20} />
              <span>Pay friends and merchants</span>
            </div>
            <span data-t={me ? 'me' : undefined}>
              <GpAv name={ME.name} color="#c26401" size={36} />
            </span>
          </div>
          <div className="g2-banner">
            <b>Pay at any shop with UPI</b>
            <span className="g2-tag">PRACTICE</span>
          </div>
        </div>
        <div className="g2-quick">
          <Tile t="scan" icon="scan" label="Scan any QR code" />
          <Tile t="pay-anyone" icon="rupee" label="Pay anyone" />
          <Tile t="bank-transfer" icon="bank" label="Bank transfer" />
          <Tile t="recharge" icon="smartphone" label="Mobile recharge" />
        </div>
        <div className="g2-chips">
          <span>
            <Icon name="touch" size={20} /> <i>Tap &amp; Pay<small>View cards</small></i>
          </span>
          <span>
            <Icon name="upi" size={20} /> <i>UPI Lite<small>₹200</small></i>
          </span>
          <span>
            <Icon name="star" size={20} /> <i>Rewards<small>₹40</small></i>
          </span>
        </div>

        <SecHead title="People" />
        <div className="g2-grid">
          <Tile icon="self" label="Self transfer" round />
          {PEOPLE.map(([n, c]) => (
            <div key={n} className="g2-tile">
              <GpAv name={n} color={c} size={52} />
              {n}
            </div>
          ))}
          <Tile icon="down" label="More" round />
        </div>

        <SecHead title="Bills & recharges" link="Manage" />
        <div className="g2-grid">
          <Tile icon="smartphone" label="Mobile recharge" round />
          <Tile icon="cast" label="DTH/Cable TV" round />
          <Tile t="electricity" icon="bulb" label="Electricity" round />
          <Tile icon="card" label="Credit cards" round />
        </div>

        <SecHead title="Businesses" link="Explore" />
        <div className="g2-grid">
          {[
            ['Sunrise General Store', '#5f6368'],
            ['Gupta Medical', '#16a34a'],
            ['Sharma Sweets', '#b06000'],
          ].map(([n, c]) => (
            <div key={n} className="g2-tile">
              <GpAv name={n} color={c} size={52} />
              {n}
            </div>
          ))}
          <Tile icon="down" label="More" round />
        </div>

        <SecHead title="Offers & rewards" />
        <div className="g2-grid">
          <Tile icon="star" label="Rewards" round />
          <Tile icon="tag" label="Offers" round />
          <Tile icon="plus" label="Referrals" round />
        </div>

        <SecHead title="Manage your money" />
        <div className="g2-links">
          <div>
            <Icon name="gauge" size={22} /> <span>Check your CIBIL score for free</span> <Icon name="chevron" size={18} />
          </div>
          <div data-t={links === 'history' ? 'history' : undefined}>
            <Icon name="history" size={22} /> <span>See transaction history</span> <Icon name="chevron" size={18} />
          </div>
          <div data-t={links === 'balance' ? 'balance' : undefined}>
            <Icon name="bank" size={22} /> <span>Check bank balance</span> <Icon name="chevron" size={18} />
          </div>
        </div>
      </div>
      <GpTabs on="home" tap={tab} />

      {request && (
        <>
          <div className="gp-dim" />
          <div className="g2-sheet">
            <div className="g2-sheet-h">Payment request</div>
            <Row av={<GpAv name="R" color="#5f6368" />} title="RAJESH KUMAR">
              <small className="g2-warn-t">Not in your contacts</small>
            </Row>
            <div className="g2-req-amt">₹5,000</div>
            <div className="g2-req-note">"Prize money! Enter PIN to receive"</div>
            <div className="g2-btns">
              <div className="g2-btn outline" data-t="decline">
                Decline
              </div>
              <div className="g2-btn" data-t="pay-scam">
                Pay
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


// ---------- Money tab ----------

const MONEY_TXNS = [
  { n: 'Sunrise General Store', d: '23 October', a: '₹50', c: '#5f6368' },
  { n: 'Ramesh Bhaiya', d: '21 October', a: '₹500', c: '#1e8e3e' },
  { n: 'Gupta Medical', d: '20 October', a: '₹320', c: '#16a34a' },
  { n: 'Sunita Didi', d: '19 October', a: '+ ₹200', c: '#e8710a', inn: true },
  { n: 'State Electricity Board', d: '15 October', a: '₹1,240', c: '#b06000' },
];

// The "Money" tab: bank accounts with "Check balance", a score, offers, and Transaction history with "See all".
// tap: 'sbi' makes "Check balance" next to the first bank the button to tap; 'history' makes "See all" the button.
export function GpMoney({ tap }) {
  return (
    <div className="app gp g2">
      <div className="g2-scroll">
        <div className="g2-money-hero">
          <Status />
          <span className="g2-ic g2-money-more">
            <Icon name="more" size={24} />
          </span>
          <b>Money</b>
        </div>
        {BANKS.map((b, i) => (
          <div key={b.k} className="g2-row">
            <BankBadge bank={b} size={44} />
            <div className="g2-row-t">
              <b>
                {b.name} ••••{b.last4}
              </b>
              <small>Savings account</small>
            </div>
            <span className="g2-link" data-t={i === 0 && tap === 'sbi' ? 'bank-sbi' : undefined}>
              Check balance
            </span>
          </div>
        ))}
        <div className="g2-row">
          <span className="g2-round dark">
            <Icon name="gauge" size={22} color="#fff" />
          </span>
          <div className="g2-row-t">
            <b>CIBIL score</b>
            <small>Tap for full report</small>
          </div>
          <span className="g2-score">
            742<small>Good</small>
          </span>
        </div>
        <SecHead title="Credits for you" />
        <div className="g2-offers">
          <div>
            <span className="g2-offer-ic">💰</span>
            <b>Personal loan</b>
            <span>Up to 10 lakh, instant approval</span>
            <i>Apply</i>
          </div>
          <div>
            <span className="g2-offer-ic">💳</span>
            <em>₹0 joining fee</em>
            <b>Credit card</b>
            <span>Save up to ₹12,000 yearly</span>
            <i>Apply</i>
          </div>
        </div>
        <div className="g2-sec-h">
          <b>Transaction history</b>
          <span data-t={tap === 'history' ? 'history' : undefined}>
            See all <Icon name="chevron" size={16} />
          </span>
        </div>
        {MONEY_TXNS.map((t) => (
          <div key={t.n} className="g2-row">
            <GpAv name={t.n} color={t.c} />
            <div className="g2-row-t">
              <b>{t.n}</b>
              <small>{t.d}</small>
            </div>
            <b className={t.inn ? 'k-green' : ''}>{t.a}</b>
          </div>
        ))}
      </div>
      <GpTabs on="money" />
    </div>
  );
}

// ---------- Scanner ----------

// The camera view at a fruit and vegetable stall: crates of fruit with the shop's QR stand in front.
// gallery: the "Upload from gallery" button is the tap target instead of the QR.
export function GpScan({ gallery }) {
  return (
    <div className="app g2-cam">
      <div className="g2-scene" aria-hidden="true">
        <div className="g2-crate oranges" />
        <div className="g2-crate apples" />
      </div>
      <div className="g2-cam-top">
        <span className="g2-ic">
          <Icon name="close" size={24} color="#fff" />
        </span>
        <span style={{ flex: 1 }} />
        <span className="g2-ic">
          <Icon name="torch" size={22} color="#fff" />
        </span>
        <span className="g2-ic">
          <Icon name="scan" size={22} color="#fff" />
        </span>
        <span className="g2-ic">
          <Icon name="more" size={22} color="#fff" />
        </span>
      </div>
      <div className="g2-frame">
        <i className="c tl" />
        <i className="c tr" />
        <i className="c bl" />
        <i className="c br" />
        <div className="g2-stand" data-t={gallery ? undefined : 'qr'}>
          <div className="g2-stand-band" />
          <b>SUNRISE GENERAL STORE</b>
          <FakeQR size={118} />
          <small>Scan and pay with any UPI app</small>
          <UpiMark />
        </div>
      </div>
      <div className="g2-gal" data-t={gallery ? 'gallery' : undefined}>
        <Icon name="image" size={18} /> Upload from gallery
      </div>
      <div className="g2-cam-sheet">
        <i />
        <b>Scan any QR code to pay</b>
        <small>Google Pay • PhonePe • Paytm • UPI</small>
      </div>
    </div>
  );
}

// ---------- Pay anyone ----------

const RECENT = [
  { t: 'c-sunita', name: 'Sunita Didi', ph: '+91 98110 24567', c: '#e8710a' },
  { name: 'Ramesh Bhaiya', ph: '+91 99023 11845', c: '#1e8e3e' },
];
const ALL = [
  { name: 'Dr. Mehta Clinic', ph: '+91 80412 55620', c: '#9334e6' },
  { name: 'Pinky', ph: '+91 97400 33219', c: '#b3261e' },
  { name: 'Raju (Milk)', ph: '+91 90080 77312', c: '#1967d2' },
  { name: 'Rahul', ph: '+91 99860 41207', c: '#00796b' },
];

// number: what is typed in the box. found: show the person that number belongs to (the name to check).
export function GpPayAnyone({ number, found, tap, keypad }) {
  return (
    <div className="app gp g2">
      <Status />
      <GpTop right={['more']} />
      <div className="g2-scroll">
        <div className="g2-h1">Pay anyone</div>
        <div className="g2-h1-sub">
          Pay any <UpiMark /> app using name, number or UPI ID
        </div>
        <div className="g2-find">
          <div className={`g2-input ${number ? 'on' : ''}`}>
            <span className={number ? '' : 'ph'}>{number || 'Enter UPI ID or number'}</span>
            <i>123</i>
          </div>
          <Icon name="contacts" size={26} color="#0b57d0" />
        </div>
        {found ? (
          <>
            <div className="g2-list-h">Search results</div>
            <Row t={tap ? 'person' : undefined} av={<GpAv name="Ramesh Kumar" color="#ea580c" />} title="Ramesh Kumar" sub={`+91 ${number}`}>
              <BankingName text="Banking name: RAMESH KUMAR" />
            </Row>
          </>
        ) : number ? null : (
          <>
            <div className="g2-list-h">Recent</div>
            {RECENT.map((c) => (
              <Row key={c.name} t={c.t} av={<GpAv name={c.name} color={c.c} />} title={c.name} sub={c.ph} />
            ))}
            <div className="g2-list-h">All people on UPI</div>
            <Row av={<span className="g2-round"><Icon name="self" size={20} /></span>} title="Self transfer" sub="Transfer money between your accounts" />
            <Row av={<span className="g2-round"><Icon name="contacts" size={20} /></span>} title="Split expense" sub="Share expenses with a group" />
            {ALL.map((c) => (
              <Row key={c.name} av={<GpAv name={c.name} color={c.c} />} title={c.name} sub={c.ph} />
            ))}
          </>
        )}
      </div>
      {keypad && <Keypad />}
    </div>
  );
}
export const GpContacts = GpPayAnyone;

// ---------- Chat with a person ----------

function Card({ me, title, amount, date }) {
  return (
    <div className={`g2-pcard ${me ? 'me' : ''}`}>
      <small>{title}</small>
      <b>{amount}</b>
      <span>
        <Icon name="checkCircle" size={15} color="#188038" /> Paid • {date} <Icon name="chevron" size={14} />
      </span>
    </div>
  );
}

export function GpChat({ payee }) {
  const first = payee.name.split(' ')[0];
  return (
    <div className="app gp g2">
      <div className="g2-tint">
        <Status />
        <div className="g2-top tint">
          <span className="g2-ic">
            <Icon name="back" size={24} />
          </span>
          <GpAv name={payee.name} color={payee.color} size={40} />
          <div className="g2-top-t">
            <b>{payee.name}</b>
            {payee.sub && <small>{payee.sub}</small>}
          </div>
          <span className="g2-ic">
            <Icon name="phone" size={22} />
          </span>
          <span className="g2-ic">
            <Icon name="more" size={22} />
          </span>
        </div>
      </div>
      <div className="g2-thread">
        <Card me title={`Payment to ${first}`} amount="₹500" date="12 Sep" />
        <div className="g2-day">
          <span>3 Oct, 9:40 pm</span>
        </div>
        <Card title="Payment to you" amount="₹200" date="3 Oct" />
      </div>
      <div className="g2-chatbar">
        <div className="g2-btn" data-t="pay">
          Pay
        </div>
        <div className="g2-msg">
          <span>Message...</span>
          <Icon name="send" size={20} />
        </div>
      </div>
    </div>
  );
}

// ---------- Amount and choose account ----------

export function GpAmount({ payee, amount, keypad, sheet }) {
  return (
    <div className={`app gp g2 ${keypad ? 'compact' : ''} ${sheet ? 'stack' : ''}`}>
      <Status />
      <GpTop left="close" right={['alert', 'more']} />
      <div className="g2-payee">
        <GpAv name={payee.name} color={payee.color} size={keypad ? 44 : 56} />
        <div className="g2-paying">Paying {payee.name}</div>
        <BankingName text={payee.bank} />
        {payee.sub && <div className="g2-sub">{payee.sub}</div>}
        <div className="g2-amt">
          <span className="rs">₹</span>
          <span className={amount ? '' : 'ph'}>{amount || '0'}</span>
        </div>
        <div className="g2-note">Add note</div>
      </div>
      {!sheet && (
        <div className="g2-go-row">
          <div className={`g2-go ${amount ? '' : 'dis'}`} data-t="next" aria-label="Proceed">
            <Icon name="arrow" size={26} color="#fff" stroke={2.5} />
          </div>
        </div>
      )}
      {keypad && <Keypad />}

      {sheet && (
        <div className="g2-sheet flat">
          <div className="g2-sheet-h">Choose account to pay with</div>
          <div className="g2-acct">
            <BankBadge />
            <div className="g2-row-t">
              <b>
                {BANK.name} ••••{BANK.last4}
              </b>
              <small>Savings account</small>
            </div>
            <Icon name="down" size={22} />
          </div>
          <div className="g2-btn wide" data-t="pay-final">
            Pay {rupees(amount)}
          </div>
          <div className="g2-foot">
            <Icon name="bank" size={16} color={BANK.c} /> <i /> <UpiMark />
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- UPI PIN (the bank's PIN page) ----------

// balance: the PIN asked for a balance check, so nothing is being sent.
export function GpPin({ payee = {}, amount, typed, full, balance }) {
  const lang = useScreenLang();
  const filled = full ? 4 : (typed || '').length;
  return (
    <div className="app g2-pin">
      <Status />
      <div className="g2-pin-head">
        <b>XXXX{BANK.last4}</b>
        <UpiMark />
      </div>
      <div className="g2-pin-band">
        {balance ? (
          <div>
            <span>Account:</span>
            <b>{BANK.name}</b>
          </div>
        ) : (
          <>
            <div>
              <span>To:</span>
              <b>{payee.name}</b>
            </div>
            <div>
              <span>Sending:</span>
              <b>
                {paise(amount)} <Icon name="down" size={14} />
              </b>
            </div>
          </>
        )}
      </div>
      <div className="g2-pin-label">ENTER 4-DIGIT UPI PIN</div>
      <div className="g2-pin-slots">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={i < filled ? 'on' : ''}>
            {i < filled ? '•' : ''}
          </span>
        ))}
      </div>
      {!balance && (
        <div className="g2-pin-info">
          <Icon name="alert" size={18} color="#e37400" />
          <span>
            You are transferring from your account to <b>{payee.name}</b>
          </span>
        </div>
      )}
      <div className="pin-warn">{PIN_NOTE[lang] || PIN_NOTE.en}</div>
      <Keypad tick />
    </div>
  );
}

// ---------- Payment done ----------

// share: the Share button was tapped, so the phone's share sheet is open over the receipt.
export function GpSuccess({ payee, amount, title, share }) {
  return (
    <div className={`app gp g2 ${share ? 'stack' : ''}`}>
      <Status />
      <GpTop left={{ icon: 'close', t: 'done' }} right={['more']} />
      <div className="g2-done">
        <div className="g2-done-tick">
          <Icon name="check" size={50} color="#fff" stroke={3} />
        </div>
        <div className="g2-done-amt">{paise(amount)}</div>
        <small>Paid to</small>
        <div className="g2-done-to">{payee.name}</div>
        <BankingName text={title || payee.bank} />
        <small>Today, 11:30 am</small>
      </div>
      <div className="g2-btns center">
        <div className="g2-btn outline" data-t="share">
          <Icon name="share" size={18} /> Share
        </div>
        <div className="g2-btn">
          <Icon name="scan" size={18} color="#fff" /> Open scanner
        </div>
      </div>
      <div className="g2-foot">
        <UpiMark />
      </div>
      {share && (
        <>
          <div className="gp-dim" />
          <div className="g2-sheet">
            <div className="g2-sheet-h">Share payment details</div>
            <div className="g2-share">
              <div data-t="share-wa">
                <AppIcon app="whatsapp" size={52} />
                WhatsApp
              </div>
              <div>
                <span className="g2-sh-ic" style={{ background: '#1a73e8' }}>
                  <Icon name="chats" size={26} color="#fff" />
                </span>
                Messages
              </div>
              <div>
                <span className="g2-sh-ic" style={{ background: '#d93025' }}>
                  <Icon name="mail" size={26} color="#fff" />
                </span>
                Gmail
              </div>
              <div>
                <span className="g2-sh-ic" style={{ background: '#5f6368' }}>
                  <Icon name="link" size={26} color="#fff" />
                </span>
                Copy
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ---------- Mobile recharge ----------

const OPS = [
  ['Jio Prepaid', '#0a2885', 'Jio'],
  ['Airtel Prepaid', '#e40000', 'A'],
  ['Vi Prepaid', '#ee2e31', 'Vi'],
  ['BSNL Prepaid', '#1a5fb4', 'B'],
];
const Op = ({ i = 0 }) => (
  <span className="g2-op" style={{ background: OPS[i][1] }}>
    {OPS[i][2]}
  </span>
);

export function GpRechargeNumbers() {
  return (
    <div className="app gp g2">
      <Status />
      <GpTop title="Mobile recharge" right={['more']} />
      <div className="g2-scroll">
        <div className="g2-promo">
          <b>Recharge smarter</b>
          <span>Save your numbers for a quick recharge next time</span>
          <i>Recharge now</i>
        </div>
        <div className="g2-label">Enter mobile number</div>
        <div className="g2-find">
          <div className="g2-input">
            <span className="g2-flag" aria-hidden="true" />
            <span className="ph">+91 00000 00000</span>
          </div>
          <Icon name="contacts" size={26} color="#0b57d0" />
        </div>
        <small className="g2-help">Ensure this is a valid mobile number</small>
        <div className="g2-list-h">My recharges</div>
        <Row t="my-number" av={<Op i={0} />} title={`${ME.name} (You)`} sub={`${ME.phone} · Jio Prepaid`} />
        <Row av={<Op i={1} />} title="Ramesh Bhaiya" sub="+91 99023 11845 · Airtel Prepaid" />
        <div className="g2-list-h">Mobile operators</div>
        {OPS.map((o, i) => (
          <Row key={o[0]} av={<Op i={i} />} title={o[0]} />
        ))}
      </div>
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
    <div className="app gp g2">
      <Status />
      <GpTop title={`${ME.name} (You)`} sub={`${ME.phone} · Jio Prepaid`} right={['more']} />
      <div className="g2-pills">
        <span className="on">Recommended</span>
        <span>Unlimited</span>
        <span>Data</span>
        <span>Talktime</span>
      </div>
      <div className="g2-scroll g2-plans">
        {PLANS.map((p, i) => (
          <div key={i} className="g2-plan" data-t={p.t}>
            <div className="g2-plan-top">
              <b>₹{p.price}</b>
              <Icon name="chevron" size={20} />
            </div>
            <div className="g2-plan-mid">
              <span>
                <small>Validity</small>
                {p.days}
              </span>
              <span>
                <small>Data</small>
                {p.data}
              </span>
            </div>
            <div className="g2-plan-extra">{p.extra}</div>
          </div>
        ))}
        <div className="g2-foot-note">Practice prices, not real plans</div>
      </div>
    </div>
  );
}

// ---------- Electricity bill ----------

const BOARDS = [
  { t: 'board-1', name: 'State Electricity Board (Practice)', area: 'Your state' },
  { name: 'City Power Supply Ltd (Practice)', area: 'Metro cities' },
  { name: 'Gramin Vidyut Board (Practice)', area: 'Rural areas' },
  { name: 'Northern Power Co. (Practice)', area: 'North zone' },
];
const Bolt = () => (
  <span className="g2-round amber">
    <Icon name="bulb" size={20} />
  </span>
);

export function GpBoards() {
  return (
    <div className="app gp g2">
      <Status />
      <GpTop title="Electricity" right={['more']} />
      <div className="g2-find">
        <div className="g2-input">
          <Icon name="search" size={20} />
          <span className="ph">Search by biller name</span>
        </div>
      </div>
      <div className="g2-list-h">All billers</div>
      {BOARDS.map((b, i) => (
        <Row key={i} t={b.t} av={<Bolt />} title={b.name} sub={b.area} />
      ))}
    </div>
  );
}

export function GpConsumer({ typed, keypad }) {
  return (
    <div className={`app gp g2 ${keypad ? 'compact' : ''}`}>
      <Status />
      <GpTop title="State Electricity Board" right={['more']} />
      <div className="g2-field">
        <label>Consumer number</label>
        <div className="g2-input on">{typed || <span className="ph">Enter consumer number</span>}</div>
        <small>Printed on your paper bill, near your name</small>
      </div>
      <div className={`g2-btn wide ${typed && typed.length >= 6 ? '' : 'dis'}`} data-t="fetch">
        Link account
      </div>
      {keypad && <Keypad />}
    </div>
  );
}

export function GpBill() {
  return (
    <div className="app gp g2">
      <Status />
      <GpTop title="State Electricity Board" right={['more']} />
      <div className="g2-scroll">
        <div className="g2-billcard">
          <Row av={<Bolt />} title="State Electricity Board" sub="Consumer no. 452187" />
          <div className="g2-bill-row">
            <span>Name</span>
            <b>Kamala Nair</b>
          </div>
          <div className="g2-bill-row">
            <span>Bill date</span>
            <b>5 Oct</b>
          </div>
          <div className="g2-bill-row">
            <span>Due date</span>
            <b>20 Oct</b>
          </div>
          <div className="g2-bill-amt">
            <small>Amount due</small>₹1,240
          </div>
        </div>
      </div>
      <div className="g2-btn wide" data-t="pay-bill">
        Pay ₹1,240
      </div>
    </div>
  );
}
