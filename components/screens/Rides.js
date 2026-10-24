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

/* ---------- Uber ----------
   Rebuilt from the owner's reference screens (Oct 2026), with made-up places, driver and numbers.
   Reusable parts: UB_DRIVER (one practice driver), UbNav (floating bottom bar), UbPinBar, and UbDriver with details. */

export const UB_DRIVER = { name: 'Rakesh', plate: 'DL 3C AB 1234', car: 'White Swift Dzire', rating: '4.9', trips: '1,420 trips', pin: '4821', ride: 'Go Non AC', fare: '₹186.00', road: 'Main Road' };

function UbNav({ on = 'home' }) {
  const items = [
    ['home', 'home', 'Home'],
    ['services', 'grid', 'Services'],
    ['activity', 'list', 'Activity'],
    ['account', 'user', 'Account'],
  ];
  return (
    <div className="ub-nav">
      {items.map(([k, ic, label]) => (
        <span key={k} className={on === k ? 'on' : ''} data-t={k === 'activity' ? 'activity' : undefined}>
          <Icon name={ic} size={22} />
          {label}
        </span>
      ))}
    </div>
  );
}

export function UbHome() {
  const tiles = [
    ['auto', 'Auto'],
    ['car', 'Trip', '25%'],
    ['box', 'Parcel'],
    ['calendar', 'Reserve', '20%'],
    ['car', 'Intercity', '7%'],
    ['clock', 'Rentals'],
    ['train', 'Bus & Train', 'Promo'],
    ['bike', 'Bike Saver'],
  ];
  return (
    <div className="app ub">
      <div className="ub-loc">
        <span>
          <i className="ub-blue" /> Current location <Icon name="down" size={14} />
        </span>
        <span>
          <Icon name="bell" size={16} /> Inbox
        </span>
      </div>
      <div className="ub-tabs">
        <span className="on">
          <Icon name="car" size={20} /> Uber
        </span>
        <span>
          <Icon name="box" size={20} /> Parcel
        </span>
        <span>
          <Icon name="train" size={20} /> Travel
        </span>
      </div>
      <div className="ub-where" data-t="where">
        <Icon name="search" size={22} stroke={2.6} />
        <b>Where to?</b>
        <span className="ub-now">
          <Icon name="calendar" size={15} /> Later
        </span>
      </div>
      <div className="ub-recent card">
        <div>
          <span className="ub-ic">
            <Icon name="clock" size={18} />
          </span>
          <p>
            <b>Railway Station</b>
            <small>Station Road, Platform 1 gate</small>
          </p>
          <Icon name="chevron" size={16} />
        </div>
      </div>
      <div className="ub-h">For you ›</div>
      <div className="ub-tiles">
        {tiles.map(([ic, label, tag]) => (
          <div key={label}>
            <span>
              {tag && <i className={tag === 'Promo' ? 'promo' : ''}>{tag}</i>}
              <Icon name={ic} size={28} />
            </span>
            {label}
          </div>
        ))}
      </div>
      <UbNav />
    </div>
  );
}

export function UbSearch() {
  const places = [
    { t: 'place', name: 'City Hospital', sub: 'Sector 12, Main Road', km: '4.2 km' },
    { name: 'Railway Station', sub: 'Station Road', km: '6.8 km' },
    { name: 'Sunrise General Store', sub: 'Main Road, Green Park', km: '0.9 km' },
    { name: 'Gurudwara Sahib', sub: 'Ring Road', km: '3.1 km' },
  ];
  return (
    <div className="app ub">
      <div className="ub-bar center">
        <Icon name="back" size={24} />
        <b>Plan your ride</b>
      </div>
      <div className="ub-chips">
        <span>
          <Icon name="clock" size={16} /> Pickup now <Icon name="down" size={14} />
        </span>
        <span>
          <Icon name="user" size={16} /> For me <Icon name="down" size={14} />
        </span>
      </div>
      <div className="ub-fields-row">
        <div className="ub-fields box">
          <div className="ub-field">
            <i className="dot" />
            Gate 2, Green Park
          </div>
          <div className="ub-field">
            <i className="sq" />
            <span className="ph">Where to?</span>
            <span className="caret" />
          </div>
        </div>
        <span className="ub-add">
          <Icon name="plus" size={20} />
        </span>
      </div>
      <div className="ub-saved">
        <span>
          <Icon name="home" size={16} /> Add Home
        </span>
        <span>
          <Icon name="bag" size={16} /> Add Work
        </span>
        <span>
          <Icon name="star" size={16} /> Saved places
        </span>
      </div>
      <div className="ub-places">
        {places.map((p) => (
          <div key={p.name} data-t={p.t}>
            <span className="ub-km">
              <Icon name="clock" size={18} />
              <small>{p.km}</small>
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

export function UbRides({ selected, upi }) {
  const rides = [
    { ic: 'auto', name: 'Auto', seats: 3, time: '11:23 · 2 min', sub: 'No bargaining, doorstep pick-up', price: '₹112.00' },
    { ic: 'car', name: 'Uber Go AC', seats: 4, time: '11:24 · 4 min', sub: 'Affordable compact AC rides', price: '₹199.90' },
    { t: 'ride-go', ic: 'car', name: 'Go Non AC', seats: 4, time: '11:26 · 5 min', sub: 'Everyday affordable rides', price: '₹186.00' },
    { ic: 'car', name: 'UberXL', seats: 6, time: '11:26 · 5 min', sub: 'Affordable rides for groups up to 6', price: '₹312.00' },
  ];
  const on = (r, i) => (selected ? !!r.t : i === 0);
  return (
    <div className="app ub">
      <MapView route />
      <div className="ub-sheet">
        <div className="ub-sheet-h">Choose a ride</div>
        <div className="ub-ride-list">
          {rides.map((r, i) => (
            <div key={r.name} className={`ub-ride ${on(r, i) ? 'on' : ''}`} data-t={r.t}>
              <span className="ub-car">
                <Icon name={r.ic} size={30} />
              </span>
              <p>
                <b>
                  {r.name} <span className="ub-seats">👤{r.seats}</span>
                </b>
                <small>{r.time}</small>
                {on(r, i) && <small>{r.sub}</small>}
              </p>
              <b className="ub-price">{r.price}</b>
            </div>
          ))}
        </div>
        <div className="ub-one">
          <span className="ub-one-ic">₹</span>
          Earn 10% back with Uber One
          <i className="ub-box" />
        </div>
        <div className="ub-pay" data-t="pay">
          {upi ? <span className="ub-upi">UPI</span> : <span className="ub-cash">₹</span>} {upi ? 'UPI' : 'Cash'}
          <Icon name="chevron" size={18} />
        </div>
        <div className="ub-btn-row">
          <div className="ub-btn" data-t="choose">
            Choose {selected ? 'Go Non AC' : 'Auto'}
          </div>
          <span className="ub-cal">
            <Icon name="calendar" size={22} />
          </span>
        </div>
      </div>
    </div>
  );
}

export function UbPickup() {
  return (
    <div className="app ub">
      <div className="ub-maptop">
        <MapView pin tall />
        <span className="ub-mapbtn">
          <Icon name="back" size={20} />
        </span>
      </div>
      <div className="ub-sheet">
        <div className="ub-sheet-h row">
          Confirm the pickup spot <Icon name="search" size={20} />
        </div>
        <div className="ub-addr">
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

function UbPinBar({ focus }) {
  return (
    <div className={`ub-pinbar ${focus ? 'focus-box' : ''}`}>
      Your PIN
      <span>
        {UB_DRIVER.pin.split('').map((d, i) => (
          <i key={i}>{d}</i>
        ))}
      </span>
    </div>
  );
}

// The trip screen while the driver is coming. details: the panel is swiped up ("Ride details").
// cancel: "Cancel ride" is the tap target. focus: plate, dp or pin gets a box (driver-check lesson).
export function UbDriver({ shared, cancel, focus, details }) {
  const d = UB_DRIVER;
  return (
    <div className="app ub">
      <div className="ub-maptop">
        <MapView route car />
        <span className="ub-mapbtn">
          <Icon name="down" size={20} />
        </span>
        <span className="ub-safety">
          <Icon name="shield" size={16} color="#276ef1" /> Safety
        </span>
      </div>
      {details ? (
        <div className="ub-sheet tall">
          <div className="ub-sheet-h">Ride details</div>
          <div className="ub-route">
            <div>
              <i className="dot" />
              <p>Meet at your pick-up spot on {d.road}</p>
              <Icon name="edit" size={18} />
            </div>
            <div>
              <i className="sq" />
              <p>
                City Hospital
                <small>11:42 dropoff</small>
              </p>
              <Icon name="edit" size={18} />
            </div>
          </div>
          <div className="ub-drow">
            <Icon name="dots" size={20} />
            <p>
              <b>Your PIN</b>
              <small>Share PIN with your driver</small>
            </p>
            <span className="ub-pinpill">{d.pin}</span>
          </div>
          <div className="ub-drow">
            <Icon name="user" size={20} />
            <p>
              <b>{d.fare}</b>
              <small>Cash</small>
            </p>
            <span className="ub-chipbtn">Switch</span>
          </div>
          <div className="ub-drow">
            <Icon name="location" size={20} />
            <p>
              <b>Share trip status</b>
              {shared && <small>Shared with Sunita ✓</small>}
            </p>
            <span className="ub-chipbtn" data-t="share">
              Share
            </span>
          </div>
          <div className="ub-cancel" data-t={cancel ? 'cancel' : undefined}>
            Cancel ride
          </div>
          <div className="ub-btn">Close</div>
        </div>
      ) : (
        <div className="ub-sheet">
          <div className="ub-sheet-h">Pick-up in 3 min</div>
          <UbPinBar focus={focus === 'pin'} />
          <div className="ub-card">
            <small>{d.ride} details</small>
            <b>Meet at your pick-up spot on {d.road}</b>
            <span className="ub-tag">₹ Cash</span>
          </div>
          <div className="ub-card ub-drv">
            <div className={`ub-dp ${focus === 'dp' ? 'focus-box' : ''}`}>
              <span>R</span>
              <small>★ {d.rating}</small>
            </div>
            <div className={`ub-plate ${focus === 'plate' ? 'focus-box' : ''}`}>
              <b>{d.plate}</b>
              <small>{d.car}</small>
            </div>
          </div>
          <div className="ub-drvname">
            <b>{d.name.toUpperCase()}</b>
            <small>{d.trips}</small>
          </div>
          <div className="ub-acts">
            <div className="ub-msg">
              <Icon name="chats" size={18} /> Message
            </div>
            <span className="ub-round">
              <Icon name="phone" size={20} />
            </span>
            <span className="ub-round">
              <Icon name="more" size={20} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// "Cancel ride?" pop-up over Ride details (YES, CANCEL is the target).
export function UbCancel() {
  return (
    <div className="app ub stack">
      <UbDriver details />
      <div className="gp-dim" />
      <div className="ub-dialog">
        <div className="ub-dialog-h">
          Cancel ride? <Icon name="close" size={22} />
        </div>
        <div className="ub-dialog-b">
          <div>
            <b>Cancel your ride with {UB_DRIVER.name}?</b>
            <p>Instead, we can find you another nearby driver for no fee.</p>
          </div>
          <span className="ub-dp-sm">R</span>
        </div>
        <div className="ub-dialog-pick">
          <Icon name="pin" size={16} /> Wrong pickup location? <b>Edit pickup</b>
        </div>
        <div className="ub-dbtn red" data-t="yes">
          YES, CANCEL
        </div>
        <div className="ub-dbtn black">FIND ANOTHER DRIVER</div>
        <div className="ub-dbtn plain">NO</div>
      </div>
    </div>
  );
}

// "Cancel trip?" reasons page. Tapping a reason finishes the cancel.
export function UbWhy() {
  const reasons = ['Could not find driver', 'Driver arrived early', 'Wait time was too long', 'Driver asked me to cancel or ride off app', 'Driver not getting closer', 'Other'];
  return (
    <div className="app ub">
      <div className="ub-bar spread">
        <Icon name="back" size={24} />
        <b>Cancel trip?</b>
        <span className="ub-skip">Skip</span>
      </div>
      <div className="ub-h big">Why do you want to cancel?</div>
      <div className="ub-reasons">
        {reasons.map((r, i) => (
          <div key={r} data-t={i === 2 ? 'reason' : undefined}>
            <Icon name={['user', 'car', 'timer', 'user', 'location', 'dots'][i]} size={20} />
            {r}
          </div>
        ))}
      </div>
      <div className="ub-btn" style={{ margin: 'auto 14px 12px' }}>
        Keep my trip
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
      <UbDriver details />
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

export function RpCaptain({ cancel }) {
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
        {cancel !== undefined && (
          <div className="rp-cancel" data-t={cancel ? 'cancel' : undefined}>
            Cancel
          </div>
        )}
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

// ---------- Uber: Activity, ride details, rating, payment ----------
export function UbActivity() {
  const trips = [
    { when: '12 Oct · 6:05 pm', to: 'Railway Station', fare: '₹212.00', ic: 'auto' },
    { when: '3 Oct · 9:40 am', to: 'Gurudwara Sahib', fare: '₹0.00 · Cancelled', ic: 'car' },
    { when: '28 Sept · 5:13 pm', to: 'Sunrise General Store', fare: '₹102.01', ic: 'auto' },
  ];
  return (
    <div className="app ub">
      <div className="ub-title">Activity</div>
      <div className="ub-h">Upcoming</div>
      <div className="ub-upc">
        <p>
          <b>You have no upcoming trips</b>
          <small>Reserve your trip →</small>
        </p>
        <Icon name="calendar" size={30} />
      </div>
      <div className="ub-h row">
        Past <Icon name="filter" size={18} />
      </div>
      <div className="ub-past" data-t="trip">
        <MapView route />
        <b>City Hospital</b>
        <small>Today · 11:20 am</small>
        <small>₹186.00</small>
        <span className="ub-chipbtn">
          <Icon name="refresh" size={14} /> Rebook
        </span>
      </div>
      <div className="ub-recent">
        {trips.map((x) => (
          <div key={x.when}>
            <span className="ub-car">
              <Icon name={x.ic} size={24} />
            </span>
            <p>
              <b>{x.to}</b>
              <small>{x.when}</small>
              <small>{x.fare}</small>
            </p>
            <span className="ub-chipbtn">
              <Icon name="refresh" size={14} /> Rebook
            </span>
          </div>
        ))}
      </div>
      <UbNav on="activity" />
    </div>
  );
}

// Ride details of a past trip: Receipt, tip, Rate, Help & safety, Customer Support.
export function UbTrip({ rated }) {
  return (
    <div className="app ub">
      <div className="ub-bar">
        <Icon name="back" size={24} />
      </div>
      <div className="ub-title sm">Ride details</div>
      <div className="ub-tripmap">
        <MapView route />
      </div>
      <div className="ub-triphead">
        <p>
          <b>Cab ride with {UB_DRIVER.name}</b>
          <small>Today 11:20 AM</small>
          <small>₹186.00</small>
        </p>
        <span className="ub-ic">
          <Icon name="user" size={20} />
        </span>
      </div>
      <div className="ub-chips">
        <span>
          <Icon name="file" size={15} /> Receipt
        </span>
        <span>
          <Icon name="file" size={15} /> Invoice
        </span>
      </div>
      <div className="ub-drow">
        <Icon name="rupee" size={18} />
        <p>No tip added</p>
        <span className="ub-chipbtn">Add tip</span>
      </div>
      <div className="ub-drow">
        <Icon name="star" size={18} />
        <p>{rated ? `You rated ${rated} stars` : 'No rating'}</p>
        <span className="ub-chipbtn" data-t="rate">
          Rate
        </span>
      </div>
      <div className="ub-h">Help & safety</div>
      <div className="ub-drow">
        <Icon name="search" size={18} />
        <p>
          <b>Find lost item</b>
          <small>We can help you get in touch with your driver</small>
        </p>
      </div>
      <div className="ub-drow">
        <Icon name="shield" size={18} />
        <p>
          <b>Report safety issue</b>
          <small>Report any safety related issues to us</small>
        </p>
      </div>
      <div className="ub-support" data-t="help">
        <Icon name="help" size={18} /> Customer Support <Icon name="arrow" size={16} />
      </div>
    </div>
  );
}

export function UbHelp() {
  const rows = [
    ['lost', 'I lost something', 'Contact your driver'],
    [undefined, 'Review my fare or fees', 'Ask about a charge'],
    [undefined, 'My driver or vehicle was not right', 'Tell us what happened'],
  ];
  return (
    <div className="app ub">
      <div className="ub-bar">
        <Icon name="back" size={24} />
        <b>Help</b>
      </div>
      <div className="ub-recent">
        {rows.map(([k, a, b]) => (
          <div key={a} data-t={k}>
            <span className="ub-ic">
              <Icon name="help" size={18} />
            </span>
            <p>
              <b>{a}</b>
              <small>{b}</small>
            </p>
            <Icon name="chevron" size={18} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function UbLost() {
  return (
    <div className="app ub">
      <div className="ub-bar">
        <Icon name="back" size={24} />
        <b>I lost something</b>
      </div>
      <div className="ub-h">What would you like to do?</div>
      <div className="ub-opt" data-t="contact">
        <Icon name="phone" size={20} />
        <p>
          <b>Contact driver about a lost item</b>
          <small>We connect you without showing your number</small>
        </p>
      </div>
    </div>
  );
}

export function UbRate({ rated }) {
  return (
    <div className="app ub">
      <div className="ub-bar">
        <Icon name="close" size={24} />
      </div>
      <div className="ub-rate-h">
        <span className="ub-dp-sm big">R</span>
        <b>How was your trip with {UB_DRIVER.name}?</b>
        <small>Cab ride · Today 11:20 AM · ₹186.00</small>
      </div>
      <div className="ub-stars" data-t="stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={rated && i <= rated ? 'on' : ''}>
            ★
          </span>
        ))}
      </div>
      {rated && rated < 5 && (
        <>
          <div className="ub-h center">What could have been better?</div>
          <div className="ub-tags">
            {['Driving', 'Car condition', 'Route', 'Pickup', 'Driver attitude'].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </>
      )}
      <div className="ub-btn" data-t="submit" style={{ margin: 'auto 14px 12px' }}>
        Done
      </div>
    </div>
  );
}

export function UbPay() {
  const rows = [
    ['cash', 'Cash', 'Pay your driver at the end', '₹'],
    ['upi', 'UPI', 'Pay with a UPI app like Google Pay', 'UPI'],
    [undefined, 'Uber Cash: ₹0.00', 'Add money to pay faster', 'U'],
    [undefined, 'Add payment method', 'Card or UPI ID', '+'],
  ];
  return (
    <div className="app ub">
      <div className="ub-bar">
        <Icon name="back" size={24} />
        <b>Payment options</b>
      </div>
      <div className="ub-recent">
        {rows.map(([k, a, b, c]) => (
          <div key={a} data-t={k}>
            <span className="ub-ic" style={{ fontWeight: 700, fontSize: c.length > 1 ? 10 : 15 }}>
              {c}
            </span>
            <p>
              <b>{a}</b>
              <small>{b}</small>
            </p>
            {k === 'cash' && <Icon name="check" size={18} />}
          </div>
        ))}
      </div>
    </div>
  );
}
