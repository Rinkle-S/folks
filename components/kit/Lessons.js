// Templates for the original app lessons (shopping, social, banks, trains, maps).
import Icon from '../Icons';
import AppIcon from '../AppIcon';
import { Av, Status, Keys, PinDots } from './ui';
import { MapView } from '../screens/Rides';

const t = (cond, key) => (cond ? key : undefined);

// ---------- Flipkart order ----------
export function FkSearch({ tap }) {
  return (
    <div className="app k-fk">
      <div className="k-fk-top">
        <div className="k-fk-search">
          <Icon name="back" size={18} />
          <span style={{ color: '#212121' }}>steel water bottle</span>
        </div>
      </div>
      {['steel water bottle', 'steel water bottle 1 litre', 'steel water bottle for kids', 'steel bottle set'].map((s, i) => (
        <div key={s} className="k-fk-sugg" data-t={t(tap && i === 0, 'sugg')}>
          <Icon name="search" size={18} />
          <b>{s}</b>
          <Icon name="arrow" size={16} />
        </div>
      ))}
    </div>
  );
}

export function FkResults({ tap }) {
  return (
    <div className="app k-fk light">
      <div className="k-fk-top">
        <div className="k-fk-search">
          <Icon name="back" size={18} />
          <span style={{ color: '#212121' }}>steel water bottle</span>
        </div>
      </div>
      <div className="k-fk-sortbar">
        <span>Sort</span>
        <span>Filter</span>
        <span>Brand</span>
        <span>Price</span>
      </div>
      {[
        ['🍶', 'Milton Steel Water Bottle, 1 L', '4.3 ★ (12,840)', '₹299', '₹499', '40% off'],
        ['🧴', 'Cello Steel Bottle Set of 3', '4.1 ★ (3,210)', '₹649', '₹999', '35% off'],
      ].map(([e, n, r, p, mrp, off], i) => (
        <div key={n} className="k-fk-res" data-t={t(tap && i === 0, 'prod')}>
          <i>{e}</i>
          <span>
            <b>{n}</b>
            <small className="k-fk-rate">{r}</small>
            <span className="k-fk-price">
              <s>{mrp}</s> <b>{p}</b> <em>{off}</em>
            </span>
            <small>Free delivery by Sun</small>
          </span>
        </div>
      ))}
    </div>
  );
}

export function FkProduct({ buy }) {
  return (
    <div className="app k-fk">
      <div className="k-fk-bar">
        <Icon name="back" size={22} />
        <b style={{ flex: 1 }} />
        <Icon name="search" size={22} />
        <Icon name="cart" size={22} />
      </div>
      <div className="k-fk-pimg">🍶</div>
      <div className="k-fk-pinfo">
        <b>Milton Steel Water Bottle, 1 L (Silver)</b>
        <small className="k-fk-rate">4.3 ★ · 12,840 ratings</small>
        <span className="k-fk-price big">
          <em>40% off</em> <s>₹499</s> <b>₹299</b>
        </span>
        <small>Free delivery by Sun, 26 Oct · 7 days return</small>
      </div>
      <div className="k-fk-buyrow">
        <span>Add to cart</span>
        <span className="buy" data-t={t(buy, 'buy')}>
          Buy now
        </span>
      </div>
    </div>
  );
}

const STEPS3 = (n) => (
  <div className="k-fk-steps">
    {['Address', 'Order Summary', 'Payment'].map((s, i) => (
      <span key={s} className={i < n ? 'on' : ''}>
        <i>{i + 1}</i>
        {s}
      </span>
    ))}
  </div>
);

export function FkAddressPick({ tap }) {
  return (
    <div className="app k-fk light">
      <div className="k-fk-bar">
        <Icon name="back" size={22} />
        <b>Select delivery address</b>
      </div>
      {STEPS3(1)}
      <div className="k-fk-addr sel">
        <b>Kamala Nair</b>
        <small>12B, MG Road, Ernakulam, Kochi 682016</small>
        <small>98450 12345</small>
      </div>
      <div className="k-fk-save" data-t={t(tap, 'continue')}>
        Deliver here
      </div>
    </div>
  );
}

export function FkSummary() {
  return (
    <div className="app k-fk light">
      <div className="k-fk-bar">
        <Icon name="back" size={22} />
        <b>Order Summary</b>
      </div>
      {STEPS3(2)}
      <div className="k-fk-prod">
        <i>🍶</i>
        <span>
          <b>Milton Steel Water Bottle, 1 L</b>
          <small>Qty: 1</small>
        </span>
      </div>
      <div className="k-fk-bill">
        <b>Price Details</b>
        <span>
          Price (1 item) <b>₹499</b>
        </span>
        <span>
          Discount <b className="k-green">− ₹200</b>
        </span>
        <span>
          Delivery Charges <b className="k-green">FREE</b>
        </span>
        <span className="tot">
          Total Amount <b>₹ ?</b>
        </span>
      </div>
    </div>
  );
}

export function FkPayment({ tap, place }) {
  return (
    <div className="app k-fk light">
      <div className="k-fk-bar">
        <Icon name="back" size={22} />
        <b>Payments</b>
      </div>
      {STEPS3(3)}
      {[
        ['upi', 'UPI', 'Pay by any UPI app'],
        ['card', 'Credit / Debit / ATM Card', ''],
        ['cod', 'Cash on Delivery', 'Pay when the bottle comes'],
      ].map(([k, l, s]) => (
        <div key={k} className="k-fk-pay" data-t={t(tap === k, k)}>
          <span className={`k-radio ${place && k === 'cod' ? 'on' : ''}`} />
          <span>
            <b>{l}</b>
            {s && <small>{s}</small>}
          </span>
        </div>
      ))}
      <div className="k-fk-total">
        <span>
          <b>₹299</b>
          <small>Total</small>
        </span>
        <span className="k-fk-place" data-t={t(place, 'place')}>
          Place Order
        </span>
      </div>
    </div>
  );
}

export function FkPlaced() {
  return (
    <div className="app k-fk">
      <div className="k-fk-done">
        <span>
          <Icon name="check" size={46} color="#fff" stroke={3} />
        </span>
        <b>Order placed!</b>
        <small>Milton Steel Water Bottle will reach you by Sun, 26 Oct. Pay ₹299 in cash when it comes.</small>
      </div>
    </div>
  );
}

// ---------- Instagram ----------
export function IgPost({ tap, liked, comment }) {
  return (
    <div className="app k-ig">
      <div className="k-ig-top">
        <b className="k-ig-word">Instagram</b>
        <Icon name="heart" size={24} />
        <Icon name="send" size={24} />
      </div>
      <div className="k-ig-ph">
        <Av name="rahul" size={32} />
        <b>rahul_nair</b>
        <Icon name="more" size={20} />
      </div>
      <div className="k-ig-img">👨‍👩‍👧</div>
      <div className="k-ig-acts">
        <span data-t={t(tap === 'like', 'like')} className={liked ? 'k-liked' : ''}>
          <Icon name={liked ? 'heartFill' : 'heart'} size={26} />
        </span>
        <span data-t={t(tap === 'comment', 'comment')}>
          <Icon name="chats" size={25} />
        </span>
        <Icon name="send" size={25} />
      </div>
      <div className="k-ig-cap">
        <b>{liked ? '43 likes' : '42 likes'}</b>
        <span>
          <b>rahul_nair</b> Sunday with the family ❤️
        </span>
        {comment && (
          <span>
            <b>kamla_devi</b> {comment}
          </span>
        )}
      </div>
      <div className="k-ig-nav">
        <Icon name="home" size={25} />
        <Icon name="search" size={25} />
        <span data-t={t(tap === 'plus', 'plus')}>
          <Icon name="plusCircle" size={25} />
        </span>
        <Icon name="video" size={25} />
        <Av name="Kamala" size={26} color="#c13584" />
      </div>
    </div>
  );
}

export function IgComments({ post }) {
  return (
    <div className="app k-ig">
      <div className="k-ig-top">
        <Icon name="back" size={22} />
        <b style={{ flex: 1 }}>Comments</b>
      </div>
      <div className="k-ig-res">
        <Av name="rahul" size={36} />
        <span>
          <b>rahul_nair</b>
          <small>Sunday with the family ❤️</small>
        </span>
      </div>
      <div style={{ flex: 1 }} />
      <div className="k-ig-emoji">❤️ 🙌 🔥 👏 😢 😍 😮 😂</div>
      <div className="k-ig-input">
        <Av name="Kamala" size={32} color="#c13584" />
        <span>Very nice! Take care, beta</span>
        <b data-t={t(post, 'send-c')}>Post</b>
      </div>
    </div>
  );
}

export function IgPicker({ tap, picked }) {
  return (
    <div className="app k-ig">
      <div className="k-ig-top">
        <Icon name="close" size={22} />
        <b style={{ flex: 1 }}>New post</b>
        <span className="k-ig-next" data-t={t(tap === 'next', 'next-ic')}>
          Next
        </span>
      </div>
      <div className="k-ig-big">{picked ? '🌺' : '🏞️'}</div>
      <div className="k-ig-h">Recents ▾</div>
      <div className="k-ig-grid">
        {['🏞️', '🌺', '🐕', '🎂', '🪔', '🏠'].map((e, i) => (
          <span key={i} data-t={t(tap === 'pic' && i === 1, 'pic1')} className={picked && i === 1 ? 'k-ig-sel' : ''}>
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}

export function IgCaption({ share }) {
  return (
    <div className="app k-ig">
      <div className="k-ig-top">
        <Icon name="back" size={22} />
        <b style={{ flex: 1 }}>New post</b>
      </div>
      <div className="k-ig-capbox">
        <i>🌺</i>
        <span>My garden in bloom 🌸</span>
      </div>
      <div className="k-ig-row">
        <Icon name="user" size={22} />
        <span>
          <b>Tag people</b>
        </span>
        <Icon name="chevron" size={18} />
      </div>
      <div className="k-ig-row">
        <Icon name="location" size={22} />
        <span>
          <b>Add location</b>
        </span>
        <Icon name="chevron" size={18} />
      </div>
      <div className="k-ig-share" data-t={t(share, 'share-btn')}>
        Share
      </div>
    </div>
  );
}

// ---------- Spotify ----------
export function SpSearch({ tap, typed }) {
  return (
    <div className="app k-sp">
      <div className="k-sp-top">
        <b style={{ flex: 1 }}>Search</b>
        <Icon name="camera" size={22} />
      </div>
      <div className="k-sp-search">
        <Icon name="search" size={18} /> {typed ? 'lag ja gale' : 'What do you want to listen to?'}
      </div>
      {typed &&
        [
          ['Lag Ja Gale', 'Song · Lata Mangeshkar', '#7c2d12'],
          ['Lag Ja Gale (From "Woh Kaun Thi")', 'Song · Lata Mangeshkar', '#334155'],
          ['Lata Mangeshkar', 'Artist', '#be123c'],
        ].map(([n, s, c], i) => (
          <div key={n} className="k-sp-item" data-t={t(tap && i === 0, 'result')}>
            <i style={{ background: c, borderRadius: i === 2 ? '50%' : 4 }} />
            <span>
              <b>{n}</b>
              <small>{s}</small>
            </span>
          </div>
        ))}
      {!typed && (
        <div className="k-sp-tiles">
          {['Bollywood', 'Devotional', 'Malayalam', 'Retro'].map((g, i) => (
            <span key={g} style={{ background: ['#e13300', '#8d67ab', '#1e3264', '#148a08'][i], height: 70, padding: 10, alignItems: 'flex-start' }}>
              {g}
            </span>
          ))}
        </div>
      )}
      <div className="k-sp-nav">
        <span>
          <Icon name="home" size={22} />
          Home
        </span>
        <span className="on" data-t={t(tap === 'tab', 'search-tab')}>
          <Icon name="search" size={22} />
          Search
        </span>
        <span>
          <Icon name="library" size={22} />
          Your Library
        </span>
      </div>
    </div>
  );
}

export function SpPlayer({ playing, tap, ad }) {
  return (
    <div className="app k-sp k-sp-player">
      <div className="k-sp-top">
        <Icon name="chevron" size={22} />
        <b style={{ flex: 1, fontSize: 13, textAlign: 'center' }}>PLAYING FROM SEARCH</b>
        <Icon name="more" size={22} />
      </div>
      <div className="k-sp-art">{ad ? <span className="k-sp-ad">Advertisement · Get Premium</span> : '🎵'}</div>
      <div className="k-sp-meta">
        <span>
          <b>{ad ? 'Spotify Premium' : 'Lag Ja Gale'}</b>
          <small>{ad ? 'Tap to buy now' : 'Lata Mangeshkar'}</small>
        </span>
        <Icon name="plusCircle" size={24} />
      </div>
      <div className="k-sp-prog">
        <i style={{ width: playing ? '30%' : '0%' }} />
      </div>
      <div className="k-sp-ctl">
        <Icon name="refresh" size={20} />
        <Icon name="prev" size={30} />
        <span className="k-sp-play" data-t={t(tap, 'play')}>
          <Icon name={playing ? 'pause' : 'play'} size={30} color="#000" />
        </span>
        <Icon name="next" size={30} />
        <Icon name="rotate" size={20} />
      </div>
    </div>
  );
}

// ---------- Bank accounts ----------
export function BkAccount({ bank = 'sbi', shown, tap }) {
  const sbi = bank === 'sbi';
  const c = sbi ? '#2a5caa' : '#ae282e';
  const tx = sbi
    ? [
        ['Pension credit', '20 Oct', '+ ₹18,500'],
        ['UPI/Sunrise General Store', '19 Oct', '- ₹50'],
        ['ATM withdrawal', '17 Oct', '- ₹2,000'],
      ]
    : [
        ['UPI/Quick Win Casino', '22 Oct', '- ₹4,999'],
        ['Salary/Pension credit', '20 Oct', '+ ₹18,500'],
        ['UPI/Gupta Medical', '19 Oct', '- ₹320'],
        ['Electricity bill', '15 Oct', '- ₹1,240'],
      ];
  return (
    <div className="app k-bk">
      <div className="k-bk-bar" style={{ background: c }}>
        <Icon name="back" size={22} color="#fff" />
        <b>{sbi ? 'Savings A/c ••5234' : 'Savings A/c ••6612'}</b>
      </div>
      <div className="k-bk-acct2">
        <small>Available balance</small>
        <b>{shown ? (sbi ? '₹ 24,350.00' : '₹ 31,180.50') : '₹ ••••••'}</b>
        {!shown && (
          <span data-t={t(tap === 'balance', 'balance')} style={{ color: c }}>
            View balance
          </span>
        )}
      </div>
      {!sbi && !shown && (
        <div className="k-bk-btnrow">
          <span className="k-bk-btn sm" style={{ background: c }} data-t={t(tap === 'tx', 'tx')}>
            <Icon name="list" size={18} color="#fff" /> Transactions
          </span>
        </div>
      )}
      {shown && (
        <>
          <div className="k-bk-h">Recent transactions</div>
          {tx.map(([n, d, a]) => (
            <div key={n} className="k-bk-item">
              <span className="k-bk-tx">
                <b style={n.includes('Casino') ? { color: '#b3261e' } : undefined}>{n}</b>
                <small>{d}</small>
              </span>
              <b className={a.startsWith('+') ? 'k-green' : ''}>{a}</b>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export function BkLoginTyped({ bank = 'sbi', n = 6, typed = '' }) {
  const c = bank === 'sbi' ? ['#2a5caa', '#1b3f78'] : ['#ae282e', '#f37e20'];
  return (
    <div className="app k-bk login" style={{ background: `linear-gradient(170deg, ${c[0]}, ${c[1]})` }}>
      <div className="k-bk-logo">
        <AppIcon app={bank === 'sbi' ? 'yono' : 'icici'} size={64} />
        <b>{bank === 'sbi' ? 'YONO SBI' : 'iMobile Pay'}</b>
      </div>
      <small>Welcome back, Kamala</small>
      <div className="k-bk-pinlabel">{n === 6 ? 'Enter your 6-digit MPIN' : 'Enter your 4-digit login PIN'}</div>
      <PinDots n={n} filled={(typed || '').length} color="#fff" />
      <div className="k-bk-alt">
        <Icon name="touch" size={20} color="#fff" /> Use fingerprint
      </div>
      <Keys />
    </div>
  );
}

// ---------- Blinkit / Zepto ----------
const GROC = {
  blinkit: { c: '#0c831f', bar: '#0c831f', name: 'Blinkit' },
  zepto: { c: '#5b21b6', bar: '#5b21b6', name: 'Zepto' },
};
export function GroSearch({ app = 'blinkit', query = 'milk', items, added = [], qty = {}, tap, bar }) {
  const g = GROC[app];
  return (
    <div className={`app k-gro ${app}`}>
      <div className="k-gro-search" data-t={t(tap === 'search', 'search')}>
        <Icon name={query ? 'back' : 'search'} size={18} />
        <span className={query ? 'typed' : ''}>{query || `Search "${app === 'zepto' ? 'banana' : 'milk'}"`}</span>
      </div>
      <div className="k-gro-grid">
        {items.map(([k, e, n, w, p]) => {
          const isAdded = added.includes(k);
          return (
            <div key={k} className="k-gro-card">
              <i>{e}</i>
              <small className="k-gro-time">⏱ {app === 'zepto' ? '8 mins' : '10 mins'}</small>
              <b>{n}</b>
              <small>{w}</small>
              <span className="k-gro-row">
                <b>{p}</b>
                {isAdded ? (
                  <span className="k-gro-qty" style={{ background: g.c }}>
                    <i>−</i>
                    {qty[k] || 1}
                    <i data-t={t(tap === `plus-${k}`, 'plus')}>+</i>
                  </span>
                ) : (
                  <span className="k-gro-add" style={{ color: g.c, borderColor: g.c }} data-t={t(tap === `add-${k}`, app === 'zepto' ? 'add' : `add-${k}`)}>
                    ADD
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
      {bar && (
        <div className="k-gro-bar" style={{ background: g.bar }} data-t={t(tap === 'cart', 'cart-bar')}>
          <span>
            <b>{bar}</b>
          </span>
          <span>View cart ›</span>
        </div>
      )}
    </div>
  );
}

export function GroCart({ app = 'blinkit', lines, bill, tap, pay = 'cod' }) {
  const g = GROC[app];
  return (
    <div className={`app k-gro ${app}`}>
      <div className="k-sw-bar2">
        <Icon name="back" size={22} />
        <b>Checkout</b>
      </div>
      {lines.map(([e, n, q, p]) => (
        <div key={n} className="k-bl-line">
          <i>{e}</i>
          <b>{n}</b>
          <span className="k-bl-qty" style={{ background: g.c }}>
            − {q} +
          </span>
          <small>{p}</small>
        </div>
      ))}
      <div className="k-gro-bill">
        <b>Bill details</b>
        {bill.map(([l, v]) => (
          <span key={l} className={l === 'Grand total' ? 'tot' : ''}>
            {l} <b>{v}</b>
          </span>
        ))}
      </div>
      {tap !== undefined && (
        <div className="k-gro-pay">
          {(pay === 'cod'
            ? [
                ['upi', 'Pay with UPI'],
                ['cod', 'Cash on Delivery'],
              ]
            : [
                ['upi', 'Pay with UPI'],
                ['card', 'Cards'],
              ]
          ).map(([k, l]) => (
            <div key={k} data-t={t(tap === k, k)} className={tap === 'place' && k === pay ? 'on' : ''}>
              <span className={`k-radio ${tap === 'place' && k === pay ? 'on' : ''}`} />
              {l}
            </div>
          ))}
          <span className="k-gro-place" style={{ background: g.c }} data-t={t(tap === 'place', 'place')}>
            Place order
          </span>
        </div>
      )}
    </div>
  );
}

export function GroDone({ app = 'blinkit', title, sub }) {
  const g = GROC[app];
  return (
    <div className="app k-done">
      <span className="k-done-ic" style={{ background: g.c, color: '#fff' }}>
        <Icon name="check" size={48} color="#fff" stroke={3} />
      </span>
      <b>{title}</b>
      <small>{sub}</small>
    </div>
  );
}

// ---------- IRCTC booking ----------
function IrBar({ title }) {
  return (
    <div className="k-ir-top">
      <Icon name="back" size={22} color="#fff" />
      <b>{title}</b>
    </div>
  );
}
export function IrLoginBtn() {
  return (
    <div className="app k-ir light">
      <IrBar title="Login" />
      <div className="k-ir-form">
        <div>
          <small>User Name</small>
          <b>kamla_devi</b>
        </div>
        <div>
          <small>Password</small>
          <b>••••••••</b>
        </div>
        <span className="k-ir-btn" data-t="login">
          LOGIN
        </span>
      </div>
    </div>
  );
}

export function IrSearch({ to, tap }) {
  return (
    <div className="app k-ir light">
      <IrBar title="Book Ticket" />
      <div className="k-ir-form">
        <div>
          <small>From</small>
          <b>ERNAKULAM JN - ERS</b>
        </div>
        <div data-t={t(tap === 'to', 'to')}>
          <small>To</small>
          <b X>{to || 'Select destination'}</b>
        </div>
        <div>
          <small>Journey date</small>
          <b>Fri, 24 Oct</b>
        </div>
        <div className="k-bk-chips">
          <span className="on" style={{ background: '#213d77', color: '#fff' }}>
            Sleeper (SL)
          </span>
          <span>3A</span>
          <span>2A</span>
        </div>
        <span className="k-ir-btn" data-t={t(tap === 'search', 'search')}>
          Search Trains
        </span>
      </div>
    </div>
  );
}

export function IrStations() {
  return (
    <div className="app k-ir light">
      <IrBar title="Select station" />
      <div className="k-mp-bar">
        <Icon name="search" size={18} />
        <span className="typed">chennai</span>
      </div>
      {[
        ['mas', 'CHENNAI CENTRAL - MAS', 'Chennai'],
        ['ms', 'CHENNAI EGMORE - MS', 'Chennai'],
        ['cgl', 'CHENGALPATTU - CGL', 'Near Chennai'],
      ].map(([k, n, s]) => (
        <div key={k} className="k-bk-item" data-t={t(k === 'mas', 'mas')}>
          <span className="k-bk-ic" style={{ color: '#213d77' }}>
            <Icon name="train" size={20} />
          </span>
          <span className="k-bk-tx">
            <b>{n}</b>
            <small>{s}</small>
          </span>
        </div>
      ))}
    </div>
  );
}

export function IrTrains() {
  return (
    <div className="app k-ir light">
      <IrBar title="ERS → MAS · 24 Oct" />
      {[
        ['train1', '12624 · Chennai Mail', '18:40 → 05:10 · 10h 30m', 'AVAILABLE-23', '₹520', 'good'],
        ['t2', '22640 · Alleppey Exp', '21:05 → 07:30', 'WL 12', '₹520', 'wl'],
        ['t3', '12626 · Kerala Exp', '10:30 → 23:50', 'RAC 4', '₹495', 'rac'],
      ].map(([k, n, tm, av, p, cls]) => (
        <div key={k} className="k-ir-ticket" data-t={t(k === 'train1', 'train1')}>
          <div className="k-ir-tt">
            <b>{n}</b>
            <small>{tm}</small>
          </div>
          <div className="k-ir-cls">
            <span>SL</span>
            <b className={cls}>{av}</b>
            <span>{p}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function IrBook() {
  return (
    <div className="app k-ir light">
      <IrBar title="12624 · Chennai Mail" />
      <div className="k-ir-ticket big">
        <div className="k-ir-route">
          <span>
            <b>ERS</b>
            <small>18:40 · Fri 24 Oct</small>
          </span>
          <i />
          <span>
            <b>MAS</b>
            <small>05:10 · Sat 25 Oct</small>
          </span>
        </div>
        <div className="k-ir-cls">
          <span>Sleeper (SL)</span>
          <b className="good">AVAILABLE-23</b>
          <span>₹520</span>
        </div>
      </div>
      <span className="k-ir-btn" data-t="book" style={{ marginTop: 'auto' }}>
        Book Now
      </span>
    </div>
  );
}

export function IrPassenger() {
  return (
    <div className="app k-ir light">
      <IrBar title="Passenger Details" />
      <div className="k-ir-form">
        <div>
          <small>Name · Age · Gender</small>
          <b>Kamala Nair · 63 · Female</b>
        </div>
        <small>Berth preference</small>
        <div className="k-bk-chips">
          {['Lower', 'Middle', 'Upper', 'Side Lower', 'No preference'].slice(0, 4).map((b, i) => (
            <span key={b} data-t={t(i === 0, 'lower')}>
              {b}
            </span>
          ))}
        </div>
        <small>Senior citizens are often given lower berths first.</small>
      </div>
    </div>
  );
}

export function IrPay() {
  return (
    <div className="app k-ir light">
      <IrBar title="Payment" />
      <div className="k-ir-refund" style={{ margin: 12 }}>
        <span>
          Ticket fare <b>₹520</b>
        </span>
        <span>
          Convenience fee <b>₹20</b>
        </span>
        <span className="tot">
          Total <b>₹540</b>
        </span>
      </div>
      {[
        ['upi', 'upi', 'Pay with UPI', 'Google Pay, PhonePe, Paytm'],
        ['card', 'card', 'Cards', ''],
        ['nb', 'bank', 'Net Banking', ''],
      ].map(([k, ic, l, s]) => (
        <div key={k} className="k-bk-item" data-t={t(k === 'upi', 'upi')}>
          <span className="k-bk-ic" style={{ color: '#213d77' }}>
            <Icon name={ic} size={20} />
          </span>
          <span className="k-bk-tx">
            <b>{l}</b>
            {s && <small>{s}</small>}
          </span>
          <Icon name="chevron" size={18} />
        </div>
      ))}
    </div>
  );
}

export function IrPnr({ result }) {
  return (
    <div className="app k-ir light">
      <IrBar title="PNR Enquiry" />
      <div className="k-ir-form">
        <div>
          <small>PNR number</small>
          <b>4521878899</b>
        </div>
        {!result && (
          <span className="k-ir-btn" data-t="check">
            Check Status
          </span>
        )}
        {result && (
          <div className="k-ir-ticket" style={{ margin: 0 }}>
            <div className="k-ir-tt">
              <b>12624 · Chennai Mail</b>
              <span className="k-ir-cnf">CNF</span>
            </div>
            <div className="k-ir-pax">
              <span>Passenger 1</span>
              <b>CNF / S5 / 32</b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Paytm scan & pay ----------
export function PtPay({ typed = '', amount, keypad, proceed }) {
  const val = keypad ? typed : amount;
  return (
    <div className="app k-pt">
      <div className="k-pt-bar">
        <Icon name="back" size={22} />
        <Av name="Sunrise General Store" size={34} color="#5f6368" />
        <b>
          SUNRISE GENERAL STORE
          <small>Verified merchant ✓</small>
        </b>
      </div>
      <div className="k-pt-amt">
        <b>₹ {val || '0'}</b>
        <small>Add a message (optional)</small>
      </div>
      <div className={`k-pt-pay ${val ? '' : 'dis'}`} data-t={t(proceed, 'proceed')}>
        Proceed to Pay
      </div>
      {keypad && <Keys />}
    </div>
  );
}

export function PtDone() {
  return (
    <div className="app k-pt-done">
      <span>
        <Icon name="check" size={52} color="#fff" stroke={3} />
      </span>
      <b>₹50</b>
      <small>Paid to SUNRISE GENERAL STORE</small>
      <em>23 Oct, 10:32 am · UPI Ref No. 4521 8800 1122</em>
    </div>
  );
}

// ---------- Maps ----------
export function MpSearch() {
  return (
    <div className="app k-mp">
      <div className="k-mp-bar">
        <Icon name="back" size={22} />
        <span className="typed">city hospital</span>
        <Icon name="mic" size={20} />
      </div>
      {[
        ['City Hospital', 'Sector 12, Main Road · 4.2 km'],
        ['City Hospital Pharmacy', 'MG Road · 4.5 km'],
        ['City Eye Hospital', 'Station Road · 6.1 km'],
      ].map(([n, s], i) => (
        <div key={n} className="k-mp-list" data-t={t(i === 0, 'sugg')}>
          <i>
            <Icon name="location" size={20} />
          </i>
          <span>
            <b>{n}</b>
            <small>{s}</small>
          </span>
        </div>
      ))}
    </div>
  );
}

export function MpPlaceH({ dir }) {
  return (
    <div className="app k-mp">
      <div className="k-mp-mapbg short">
        <MapView />
        <span className="k-mp-pin">📍</span>
      </div>
      <div className="k-mp-sheet">
        <b>City Hospital</b>
        <small>4.2 ★ (8,104) · Hospital · 4.2 km</small>
        <small className="k-green">Open 24 hours</small>
        <div className="k-mp-btns">
          <span className="pri" data-t={t(dir, 'directions')}>
            <Icon name="navigate" size={18} /> Directions
          </span>
          <span>
            <Icon name="phone" size={18} /> Call
          </span>
          <span>
            <Icon name="share" size={18} /> Share
          </span>
        </div>
      </div>
    </div>
  );
}

export function MpRoute({ car, start }) {
  return (
    <div className="app k-mp">
      <div className="k-mp-route">
        <div>
          <span>● Your location</span>
          <span>📍 City Hospital</span>
        </div>
        <div className="k-mp-modes">
          {[
            ['car', 'car', '12 min'],
            ['bike', 'bike', '10 min'],
            ['walk', 'user', '52 min'],
            ['bus', 'train', '25 min'],
          ].map(([k, ic, tm]) => (
            <span key={k} className={!car && k === 'car' ? '' : start && k === 'car' ? 'on' : ''} data-t={t(car && k === 'car', 'car')}>
              <Icon name={ic} size={18} />
              {tm}
            </span>
          ))}
        </div>
      </div>
      <div className="k-mp-mapbg">
        <MapView route />
      </div>
      <div className="k-mp-eta">
        <b className="k-green">12 min</b>
        <small>4.2 km · Fastest route</small>
        <span className="k-mp-start" data-t={t(start, 'start')}>
          ▲ Start
        </span>
      </div>
    </div>
  );
}

export function MpShare({ dot, share, hour, person }) {
  return (
    <div className="app k-mp">
      <div className="k-mp-mapbg">
        <MapView tall />
        <span className="k-mp-dot" data-t={t(dot, 'dot')} />
      </div>
      {share && (
        <div className="k-dim end">
          <div className="k-sheet">
            <i className="k-sheet-h" />
            <div className="k-sheet-t">Your location</div>
            <small style={{ color: '#5f6368' }}>Near MG Road, Kochi</small>
            <div className="k-mp-btns">
              <span className="pri" data-t="share">
                <Icon name="share" size={18} /> Share location
              </span>
              <span>Save parking</span>
            </div>
          </div>
        </div>
      )}
      {(hour || person) && (
        <div className="k-dim end">
          <div className="k-sheet">
            <i className="k-sheet-h" />
            <div className="k-sheet-t">Share location</div>
            <div className="k-bk-chips" style={{ margin: '4px 0 12px' }}>
              <span data-t={t(hour, 'hour')} className={person ? 'on' : ''} style={person ? { background: '#0b57d0', color: '#fff' } : undefined}>
                For 1 hour
              </span>
              <span>Until you turn this off</span>
            </div>
            <div className="k-share-row">
              {['Sunita Didi', 'Rahul (Beta)', 'Ramesh'].map((n, i) => (
                <div key={n} data-t={t(person && i === 0, 'sunita')}>
                  <Av name={n} size={50} />
                  <small>{n}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
