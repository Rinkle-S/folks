// IRCTC Rail Connect and Google Maps templates. (Uber and Rapido reuse components/screens/Rides.js.)
import Icon from '../Icons';
import { useScreenText } from '../LangCtx';
import { Av, Status, Keys } from './ui';
import { UbHome, UbSearch, UbRides, UbPickup, UbDriver, UbShare, RpHome, RpSearch, RpRides, RpCaptain, MapView } from '../screens/Rides';

export { UbHome, UbSearch, UbRides, UbPickup, UbDriver, UbShare, RpHome, RpSearch, RpRides, RpCaptain };

// ---------- IRCTC ----------
export function IrHome({ tap }) {
  const tx = useScreenText();
  return (
    <div className="app k-ir">
      <div className="k-ir-top">
        <Icon name="menu" size={22} color="#fff" />
        <b>IRCTC Rail Connect</b>
        <Icon name="bell" size={22} color="#fff" />
      </div>
      <div className="k-ir-hero">
        <Icon name="train" size={40} color="#fff" />
        <small>{tx('Namaste, Kamla')}</small>
      </div>
      <div className="k-ir-grid">
        {[
          ['book', 'train', 'Book Ticket'],
          ['bookings', 'ticket', 'My Bookings'],
          ['pnr', 'search', 'PNR Enquiry'],
          ['running', 'location', 'Train Running Status'],
          ['cancel', 'close', 'Cancel Ticket'],
          ['food', 'star', 'Order Food'],
        ].map(([k, ic, l]) => (
          <span key={k} data-t={tap === k ? k : undefined}>
            <i>
              <Icon name={ic} size={24} />
            </i>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export function IrLogin() {
  return (
    <div className="app k-ir light">
      <div className="k-ir-top">
        <Icon name="back" size={22} color="#fff" />
        <b>Login</b>
      </div>
      <div className="k-ir-form">
        <div>
          <small>User Name</small>
          <b>kamla_devi</b>
        </div>
        <div>
          <small>Password</small>
          <b>••••••••</b>
        </div>
        <div className="k-ir-cap">
          <span>8 x 4 y Q</span>
          <b>8x4yQ</b>
        </div>
        <span className="k-ir-btn">LOGIN</span>
      </div>
    </div>
  );
}

export function IrBookings({ tap }) {
  return (
    <div className="app k-ir light">
      <div className="k-ir-top">
        <Icon name="back" size={22} color="#fff" />
        <b>My Bookings</b>
      </div>
      <div className="k-ir-tabs">
        <span className="on">Upcoming</span>
        <span>Completed</span>
        <span>Cancelled</span>
      </div>
      <div className="k-ir-ticket" data-t={tap ? 'ticket' : undefined}>
        <div className="k-ir-tt">
          <b>12624 · Chennai Mail</b>
          <span className="k-ir-cnf">CNF</span>
        </div>
        <div className="k-ir-route">
          <span>
            <b>ERS</b>
            <small>18:40 · 24 Oct</small>
          </span>
          <i />
          <span>
            <b>MAS</b>
            <small>05:10 · 25 Oct</small>
          </span>
        </div>
        <small>PNR 4521878899 · 1 Adult · SL</small>
      </div>
    </div>
  );
}

export function IrTicket({ cancel }) {
  return (
    <div className="app k-ir light">
      <div className="k-ir-top">
        <Icon name="back" size={22} color="#fff" />
        <b>Ticket Details</b>
        <Icon name="share" size={20} color="#fff" />
      </div>
      <div className="k-ir-ticket big">
        <div className="k-ir-tt">
          <b>12624 · Chennai Mail</b>
          <span className="k-ir-cnf">CONFIRMED</span>
        </div>
        <div className="k-ir-route">
          <span>
            <b>Ernakulam Jn</b>
            <small>18:40 · Fri 24 Oct</small>
          </span>
          <i />
          <span>
            <b>Chennai Central</b>
            <small>05:10 · Sat 25 Oct</small>
          </span>
        </div>
        <div className="k-ir-pax">
          <span>Kamla Devi, F, 62</span>
          <b>S5 / 32 / LB</b>
        </div>
        <small>PNR 4521878899 · Fare ₹520</small>
      </div>
      {cancel !== undefined && (
        <div className="k-ir-btn red" data-t={cancel ? 'cancel' : undefined}>
          Cancel Ticket
        </div>
      )}
    </div>
  );
}

export function IrCancel({ confirm }) {
  return (
    <div className="app k-ir light">
      <div className="k-ir-top">
        <Icon name="back" size={22} color="#fff" />
        <b>Cancel Ticket</b>
      </div>
      <div className="k-ir-form">
        <small>Select passenger(s) to cancel</small>
        <div className="k-ir-chk">
          <span>✓</span> Kamla Devi, F, 62 · S5/32/LB
        </div>
        <div className="k-ir-refund">
          <span>
            Fare paid <b>₹520</b>
          </span>
          <span>
            Cancellation charge <b>− ₹60</b>
          </span>
          <span className="tot">
            Refund to you <b>₹460</b>
          </span>
        </div>
        <span className="k-ir-btn" data-t={confirm ? 'confirm' : undefined}>
          Cancel Ticket
        </span>
      </div>
    </div>
  );
}

export function IrOtp() {
  return (
    <div className="app k-ir light">
      <div className="k-ir-top">
        <Icon name="back" size={22} color="#fff" />
        <b>Enter OTP</b>
      </div>
      <div className="k-ir-form center">
        <small>OTP sent to +91 98xxx xx345 and your email</small>
        <div className="k-ir-otp">
          <span>4</span>
          <span>8</span>
          <span>2</span>
          <span />
          <span />
          <span />
        </div>
      </div>
      <Keys />
    </div>
  );
}

export function IrRunning({ result }) {
  return (
    <div className="app k-ir light">
      <div className="k-ir-top">
        <Icon name="back" size={22} color="#fff" />
        <b>Train Running Status</b>
      </div>
      <div className="k-ir-form">
        <div>
          <small>Train number</small>
          <b>12624</b>
        </div>
        {result && (
          <>
            <div className="k-bk-chips">
              <span className="on" style={{ background: '#213d77', color: '#fff' }}>
                Today
              </span>
              <span>Yesterday</span>
            </div>
            <div className="k-ir-live">
              <div className="done">
                <i />
                Ernakulam Jn <small>Left 18:52 · 12 min late</small>
              </div>
              <div className="now">
                <i />
                Thrissur <small>Last seen 20:10 · 12 min late</small>
              </div>
              <div>
                <i />
                Palakkad <small>Expected 21:35</small>
              </div>
            </div>
          </>
        )}
      </div>
      {!result && <Keys />}
    </div>
  );
}

// ---------- Google Maps ----------
function MpNav({ tap }) {
  return (
    <div className="k-mp-nav">
      {[
        ['explore', 'location', 'Explore'],
        ['you', 'bookmark', 'You'],
        ['contribute', 'plusCircle', 'Contribute'],
      ].map(([k, ic, l]) => (
        <span key={k} className={k === 'explore' ? 'on' : ''} data-t={tap === k ? `nav-${k}` : undefined}>
          <i>
            <Icon name={ic} size={21} />
          </i>
          {l}
        </span>
      ))}
    </div>
  );
}

export function MpHome({ chip, me, nav, search }) {
  return (
    <div className="app k-mp">
      <div className="k-mp-mapbg">
        <MapView tall />
        <span className="k-mp-dot" />
      </div>
      <div className="k-mp-over">
        <div className="k-mp-search" data-t={search ? 'search' : undefined}>
          <Icon name="location" size={20} color="#d93025" />
          <span>Search here</span>
          <Icon name="mic" size={20} />
          <span data-t={me ? 'me' : undefined}>
            <Av name="K" size={32} color="#0b57d0" />
          </span>
        </div>
        <div className="k-mp-chips">
          {[
            ['restaurants', '🍴 Restaurants'],
            ['hospitals', '🏥 Hospitals'],
            ['atms', '🏧 ATMs'],
            ['petrol', '⛽ Petrol'],
          ].map(([k, l]) => (
            <span key={k} data-t={chip === k ? `chip-${k}` : undefined}>
              {l}
            </span>
          ))}
        </div>
      </div>
      <MpNav tap={nav} />
    </div>
  );
}

export function MpList({ tap }) {
  return (
    <div className="app k-mp">
      <div className="k-mp-bar">
        <Icon name="back" size={22} />
        <span>Hospitals</span>
        <Icon name="close" size={20} />
      </div>
      {[
        ['amrita', 'Amrita Hospital', '4.3 ★ · 1.2 km', 'Open 24 hours'],
        ['city', 'City Clinic', '4.1 ★ · 2.0 km', 'Open · Closes 8 pm'],
        ['general', 'General Hospital', '3.9 ★ · 3.4 km', 'Open 24 hours'],
      ].map(([k, n, r, o]) => (
        <div key={k} className="k-mp-place" data-t={tap && k === 'amrita' ? 'place' : undefined}>
          <span>
            <b>{n}</b>
            <small>{r}</small>
            <small className="k-green">{o}</small>
          </span>
          <i>🏥</i>
        </div>
      ))}
    </div>
  );
}

export function MpPlace({ dir }) {
  return (
    <div className="app k-mp">
      <div className="k-mp-mapbg short">
        <MapView />
        <span className="k-mp-pin">📍</span>
      </div>
      <div className="k-mp-sheet">
        <b>Amrita Hospital</b>
        <small>4.3 ★ (12,431) · Hospital · 1.2 km</small>
        <small className="k-green">Open 24 hours</small>
        <div className="k-mp-btns">
          <span className="pri" data-t={dir ? 'directions' : undefined}>
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

export function MpSaved({ home, typed }) {
  if (typed)
    return (
      <div className="app k-mp">
        <div className="k-mp-bar">
          <Icon name="back" size={22} />
          <span className="typed">12B MG Road, Kochi</span>
        </div>
        <div className="k-mp-place">
          <span>
            <b>12B, MG Road</b>
            <small>Ernakulam, Kochi, Kerala 682016</small>
          </span>
          <i>📍</i>
        </div>
      </div>
    );
  return (
    <div className="app k-mp">
      <div className="k-mp-bar">
        <span>You</span>
      </div>
      <div className="k-mp-h">Your lists</div>
      {[
        ['home', 'home', 'Home', 'Set once and go'],
        ['work', 'box', 'Work', 'Set once and go'],
        ['fav', 'heart', 'Favourites', 'Private · 3 places'],
      ].map(([k, ic, l, s]) => (
        <div key={k} className="k-mp-list" data-t={home && k === 'home' ? 'home' : undefined}>
          <i>
            <Icon name={ic} size={20} />
          </i>
          <span>
            <b>{l}</b>
            <small>{s}</small>
          </span>
        </div>
      ))}
      <MpNav />
    </div>
  );
}

export function MpNavigate({ sound }) {
  return (
    <div className="app k-mp">
      <div className="k-mp-turn">
        <Icon name="back" size={34} color="#fff" />
        <span>
          <b>200 m</b>
          <small>Turn left onto MG Road</small>
        </span>
      </div>
      <div className="k-mp-mapbg">
        <MapView route />
      </div>
      <div className="k-mp-side">
        <span data-t={sound ? 'sound' : undefined}>
          <Icon name="volume" size={22} />
        </span>
        <span>
          <Icon name="search" size={22} />
        </span>
      </div>
      <div className="k-mp-eta">
        <b className="k-green">12 min</b>
        <small>4.3 km · 10:42 am</small>
        <span>Exit</span>
      </div>
    </div>
  );
}

export function MpOffline({ select, download }) {
  if (download)
    return (
      <div className="app k-mp">
        <div className="k-mp-mapbg">
          <MapView />
          <span className="k-mp-box" />
        </div>
        <div className="k-mp-dl">
          <b>Download this map?</b>
          <small>Downloading the area shown in the box uses up to 120 MB</small>
          <span data-t="download">Download</span>
        </div>
      </div>
    );
  return (
    <div className="app k-mp">
      <div className="k-mp-bar">
        <Icon name="back" size={22} />
        <span>Offline maps</span>
      </div>
      <div className="k-mp-list" data-t={select ? 'select' : undefined}>
        <i>
          <Icon name="plusCircle" size={20} />
        </i>
        <span>
          <b>Select your own map</b>
        </span>
      </div>
      <div className="k-mp-h">Recommended</div>
      <div className="k-mp-list">
        <i>
          <Icon name="location" size={20} />
        </i>
        <span>
          <b>Kochi</b>
          <small>110 MB</small>
        </span>
      </div>
    </div>
  );
}
