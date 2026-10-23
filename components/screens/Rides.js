// Practice look-alikes of Uber and Rapido booking flows. Same layout and labels; no real logos.
import Icon from '../Icons';

// A simple drawn city map, with an optional route between two points.
export function MapView({ route = false, pin = false, car = false, tall = false }) {
  return (
    <div className={`mapv ${tall ? 'tall' : ''}`}>
      <svg viewBox="0 0 360 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="360" height="260" fill="#eef0eb" />
        <path d="M0 70h360M0 170h360M90 0v260M230 0v260M300 0v260" stroke="#fff" strokeWidth="14" />
        <path d="M0 120h360M160 0v260" stroke="#fff" strokeWidth="8" />
        <rect x="20" y="10" width="55" height="45" rx="6" fill="#dfe5d6" />
        <rect x="105" y="85" width="40" height="70" rx="6" fill="#e3e1da" />
        <rect x="245" y="185" width="45" height="60" rx="6" fill="#dfe5d6" />
        <rect x="175" y="10" width="40" height="45" rx="6" fill="#d7e8f3" />
        {route && (
          <>
            <path d="M90 215V170h70V70h140V40" fill="none" stroke="#111" strokeWidth="5" strokeLinejoin="round" />
            <circle cx="90" cy="215" r="8" fill="#111" />
            <circle cx="90" cy="215" r="3" fill="#fff" />
            <rect x="292" y="32" width="16" height="16" fill="#111" />
            <rect x="297" y="37" width="6" height="6" fill="#fff" />
          </>
        )}
        {car && <rect x="150" y="160" width="22" height="12" rx="4" fill="#111" transform="rotate(-8 161 166)" />}
      </svg>
      {pin && (
        <div className="map-pin">
          <span>Gate 2, Green Park</span>
          <Icon name="pin" size={34} stroke={2.4} />
        </div>
      )}
    </div>
  );
}

/* ---------- Uber ---------- */

function UbNav() {
  return (
    <div className="ub-nav">
      <span className="on">
        <Icon name="home" size={22} />
        Home
      </span>
      <span>
        <Icon name="grid" size={22} />
        Services
      </span>
      <span>
        <Icon name="list" size={22} />
        Activity
      </span>
      <span>
        <Icon name="user" size={22} />
        Account
      </span>
    </div>
  );
}

export function UbHome() {
  return (
    <div className="app ub">
      <div className="ub-title">Uber</div>
      <div className="ub-where" data-t="where">
        <Icon name="search" size={22} stroke={2.6} />
        <b>Where to?</b>
        <span className="ub-now">
          <Icon name="history" size={16} /> Now
        </span>
      </div>
      <div className="ub-recent">
        <div>
          <span className="ub-ic">
            <Icon name="history" size={18} />
          </span>
          <p>
            <b>Railway Station</b>
            <small>Station Road</small>
          </p>
        </div>
        <div>
          <span className="ub-ic">
            <Icon name="history" size={18} />
          </span>
          <p>
            <b>Sunrise General Store</b>
            <small>Main Road, Green Park</small>
          </p>
        </div>
      </div>
      <div className="ub-h">Suggestions</div>
      <div className="ub-sugg">
        {[
          ['car', 'Trip'],
          ['auto', 'Auto'],
          ['bike', 'Moto'],
          ['calendar', 'Reserve'],
        ].map(([ic, label]) => (
          <div key={label}>
            <span>
              <Icon name={ic} size={30} />
            </span>
            {label}
          </div>
        ))}
      </div>
      <div className="ub-promo">
        <b>Go anywhere with Uber</b>
        <small>Request a ride, hop in, and go.</small>
      </div>
      <UbNav />
    </div>
  );
}

export function UbSearch() {
  const places = [
    { t: 'place', name: 'City Hospital', sub: 'Sector 12, Main Road · 4.2 km' },
    { name: 'Railway Station', sub: 'Station Road · 6.8 km' },
    { name: 'Sunrise General Store', sub: 'Main Road, Green Park · 0.9 km' },
    { name: 'Gurudwara Sahib', sub: 'Ring Road · 3.1 km' },
  ];
  return (
    <div className="app ub">
      <div className="ub-bar">
        <Icon name="back" size={24} />
        <b>Plan your ride</b>
      </div>
      <div className="ub-fields">
        <div className="ub-line" />
        <div className="ub-field">
          <i className="dot" />
          Current location
        </div>
        <div className="ub-field focus">
          <i className="sq" />
          <span className="ph">Where to?</span>
          <span className="caret" />
        </div>
      </div>
      <div className="ub-places">
        {places.map((p) => (
          <div key={p.name} data-t={p.t}>
            <span className="ub-ic">
              <Icon name="pin" size={18} />
            </span>
            <p>
              <b>{p.name}</b>
              <small>{p.sub}</small>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UbRides({ selected }) {
  const rides = [
    { t: 'ride-go', ic: 'car', name: 'Uber Go', sub: '4 seats · 3 min away', price: '₹186' },
    { ic: 'auto', name: 'Uber Auto', sub: '3 seats · 5 min away', price: '₹112' },
    { ic: 'car', name: 'Premier', sub: 'Comfortable sedans · 6 min', price: '₹245' },
  ];
  return (
    <div className="app ub">
      <MapView route />
      <div className="ub-sheet">
        <div className="ub-sheet-h">Choose a ride</div>
        {rides.map((r) => (
          <div key={r.name} className={`ub-ride ${selected && r.t ? 'on' : ''}`} data-t={r.t}>
            <span className="ub-car">
              <Icon name={r.ic} size={30} />
            </span>
            <p>
              <b>{r.name}</b>
              <small>{r.sub}</small>
            </p>
            <b className="ub-price">{r.price}</b>
          </div>
        ))}
        <div className="ub-pay">
          <span className="ub-cash">₹</span> Cash
          <Icon name="chevron" size={18} />
        </div>
        <div className="ub-btn" data-t="choose">
          Choose Uber Go
        </div>
      </div>
    </div>
  );
}

export function UbPickup() {
  return (
    <div className="app ub">
      <MapView pin tall />
      <div className="ub-sheet">
        <div className="ub-sheet-h">Confirm your pickup spot</div>
        <div className="ub-addr">
          <Icon name="pin" size={20} />
          <p>
            <b>Gate 2, Green Park</b>
            <small>Main Road, near the temple</small>
          </p>
        </div>
        <div className="ub-btn" data-t="confirm">
          Confirm pickup
        </div>
      </div>
    </div>
  );
}

export function UbDriver({ shared, cancel }) {
  return (
    <div className="app ub">
      <MapView route car />
      <div className="ub-sheet">
        <div className="ub-meet">
          <b>Meet at the pickup spot</b>
          <span>3 min</span>
        </div>
        <div className="ub-driver">
          <div className="ub-plate">
            <b>DL 3C AB 1234</b>
            <small>White Swift Dzire</small>
          </div>
          <div className="ub-dp">
            <span>R</span>
            <small>Rakesh · ★ 4.9</small>
          </div>
        </div>
        <div className="ub-pin">
          Your PIN <b>4821</b>
        </div>
        <div className="ub-acts">
          <div className="ub-msg">Send a message</div>
          <span className="ub-round">
            <Icon name="phone" size={20} />
          </span>
        </div>
        <div className="ub-opt" data-t="share">
          <Icon name="share" size={20} />
          <p>
            <b>Share trip status</b>
            <small>{shared ? 'Shared with Sunita ✓' : 'Family can follow your ride'}</small>
          </p>
        </div>
        {cancel !== undefined && (
          <div className="ub-opt" data-t={cancel ? 'cancel' : undefined}>
            <Icon name="close" size={20} />
            <p>
              <b>Cancel trip</b>
              <small>A fee may apply after 3 minutes</small>
            </p>
          </div>
        )}
        <div className="ub-opt">
          <Icon name="shield" size={20} />
          <p>
            <b>Safety</b>
            <small>Emergency help, trusted contacts</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export function UbShare() {
  const people = [
    { t: 'contact', n: 'Sunita', c: '#c2185b' },
    { n: 'Ramesh', c: '#2e7d32' },
    { n: 'Pinky', c: '#6a1b9a' },
    { n: 'Raju', c: '#1565c0' },
  ];
  return (
    <div className="app ub stack">
      <UbDriver />
      <div className="gp-dim" />
      <div className="gp-sheet">
        <div className="gp-sheet-h">Share trip status</div>
        <p className="ub-share-p">They can see your driver, car and live location until you arrive.</p>
        <div className="ub-people">
          {people.map((p) => (
            <div key={p.n} data-t={p.t}>
              <span style={{ background: p.c }}>{p.n[0]}</span>
              {p.n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Rapido ---------- */

export function RpHome() {
  const services = [
    ['bike', 'Bike'],
    ['auto', 'Auto'],
    ['car', 'Cab Economy'],
    ['bag', 'Parcel'],
  ];
  return (
    <div className="app rp">
      <div className="rp-top">
        <div className="rp-loc">
          <Icon name="pin" size={18} /> <b>Green Park, Gate 2</b>
        </div>
        <div className="rp-search" data-t="search">
          <Icon name="search" size={20} stroke={2.4} />
          Where are you going?
        </div>
      </div>
      <div className="rp-h">Services</div>
      <div className="rp-services">
        {services.map(([ic, label]) => (
          <div key={label}>
            <span>
              <Icon name={ic} size={28} />
            </span>
            {label}
          </div>
        ))}
      </div>
      <div className="rp-banner">
        <b>Auto rides at the best price</b>
        <small>No bargaining. Fare shown before you book.</small>
      </div>
      <div className="rp-h">Recent</div>
      <div className="rp-recent">
        <Icon name="history" size={18} /> Vegetable Market, Sector 4
      </div>
      <div className="rp-nav">
        <span className="on">
          <Icon name="home" size={22} />
          Home
        </span>
        <span>
          <Icon name="list" size={22} />
          My Rides
        </span>
        <span>
          <Icon name="user" size={22} />
          Profile
        </span>
      </div>
    </div>
  );
}

export function RpSearch() {
  const places = [
    { t: 'place', name: 'Railway Station', sub: 'Station Road · 6.8 km' },
    { name: 'City Hospital', sub: 'Sector 12, Main Road · 4.2 km' },
    { name: 'Vegetable Market', sub: 'Sector 4 · 1.6 km' },
  ];
  return (
    <div className="app rp">
      <div className="rp-bar">
        <Icon name="back" size={24} />
        <b>Drop location</b>
      </div>
      <div className="rp-fields">
        <div>
          <i className="g" /> Current location
        </div>
        <div className="focus">
          <i className="r" /> <span className="ph">Search drop location</span>
          <span className="caret" />
        </div>
      </div>
      <div className="rp-places">
        {places.map((p) => (
          <div key={p.name} data-t={p.t}>
            <Icon name="pin" size={20} />
            <p>
              <b>{p.name}</b>
              <small>{p.sub}</small>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RpRides({ selected }) {
  const rides = [
    { ic: 'bike', name: 'Bike', sub: '2 min away', price: '₹45' },
    { t: 'auto', ic: 'auto', name: 'Auto', sub: '4 min away', price: '₹78' },
    { ic: 'car', name: 'Cab Economy', sub: '7 min away', price: '₹140' },
  ];
  return (
    <div className="app rp">
      <MapView route />
      <div className="rp-sheet">
        {rides.map((r) => (
          <div key={r.name} className={`rp-ride ${selected && r.t ? 'on' : ''}`} data-t={r.t}>
            <span className="rp-veh">
              <Icon name={r.ic} size={28} />
            </span>
            <p>
              <b>{r.name}</b>
              <small>{r.sub}</small>
            </p>
            <b>{r.price}</b>
          </div>
        ))}
        <div className="rp-foot">
          <span className="rp-cash">
            <b>₹</b> Cash
          </span>
          <div className={`rp-btn ${selected ? '' : 'dis'}`} data-t="book">
            {selected ? 'Book Auto' : 'Book'}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RpCaptain() {
  return (
    <div className="app rp">
      <MapView route car />
      <div className="rp-sheet">
        <div className="rp-coming">
          <b>Captain is on the way</b>
          <span>4 min</span>
        </div>
        <div className="rp-otp">
          <small>Share OTP with captain at the start of the ride</small>
          <b>5 1 7 2</b>
        </div>
        <div className="rp-cap">
          <span className="rp-av">M</span>
          <p>
            <b>Manjunath</b>
            <small>★ 4.8 · Auto</small>
          </p>
          <div className="rp-plate">KA 01 AB 4521</div>
        </div>
        <div className="rp-row2">
          <span>
            <Icon name="phone" size={18} /> Call
          </span>
          <span>
            <Icon name="sos" size={18} /> Safety
          </span>
          <span className="fare">₹78 · Cash</span>
        </div>
      </div>
    </div>
  );
}

export function RpEnd({ rated }) {
  return (
    <div className="app rp rp-end">
      <div className="rp-end-top">
        <span className="rp-done">
          <Icon name="check" size={34} stroke={3} />
        </span>
        <b>You have reached Railway Station</b>
      </div>
      <div className="rp-bill">
        <small>Pay in cash to the captain</small>
        <b>₹78</b>
        <div>
          <span>Ride fare</span>
          <span>₹74</span>
        </div>
        <div>
          <span>Taxes</span>
          <span>₹4</span>
        </div>
      </div>
      <div className="rp-rate">
        <b>How was your ride with Manjunath?</b>
        <div className="rp-stars" data-t="stars">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={rated ? 'on' : ''}>
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
