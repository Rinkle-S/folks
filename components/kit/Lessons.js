// Templates for the original app lessons (shopping, social, banks, trains, maps).
import Icon from '../Icons';
import AppIcon from '../AppIcon';
import { Av, Status, Keys, PinDots } from './ui';
import { MapView } from '../screens/Rides';

const t = (cond, key) => (cond ? key : undefined);

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
