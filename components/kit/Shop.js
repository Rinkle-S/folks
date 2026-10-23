// Swiggy, Blinkit and Flipkart templates.
import Icon from '../Icons';
import { Av, Status } from './ui';

// ---------- Swiggy ----------
function SwNav({ tap }) {
  return (
    <div className="k-sw-nav">
      {[
        ['home', 'home', 'Home'],
        ['dineout', 'star', 'Dineout'],
        ['instamart', 'cart', 'Instamart'],
        ['account', 'user', 'Account'],
      ].map(([k, ic, l]) => (
        <span key={k} className={k === 'home' ? 'on' : ''} data-t={tap === k ? `nav-${k}` : undefined}>
          <Icon name={ic} size={22} />
          {l}
        </span>
      ))}
    </div>
  );
}

export function SwHomeK({ address, bar, nav }) {
  return (
    <div className="app k-sw">
      <div className="k-sw-top">
        <div className="k-sw-addr" data-t={address ? 'address' : undefined}>
          <span>
            <Icon name="navigate" size={18} color="#fc8019" /> <b>Home ▾</b>
          </span>
          <small>12B, MG Road, Kochi</small>
        </div>
        <Av name="K" size={34} color="#3d4152" />
      </div>
      <div className="k-sw-search">
        <Icon name="search" size={18} /> Search for "biryani"
        <Icon name="mic" size={18} color="#fc8019" />
      </div>
      <div className="k-sw-cats">
        {['🍛 Biryani', '🥘 Thali', '🥞 Dosa', '🍕 Pizza'].map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      <div className="k-sw-h">Restaurants near you</div>
      {[
        ['Biryani House', '4.3 · 25-30 mins', 'Biryani, North Indian', '#7c2d12'],
        ['Sri Krishna Tiffins', '4.4 · 20-25 mins', 'South Indian', '#a1622b'],
      ].map(([n, r, c, bg]) => (
        <div key={n} className="k-sw-rest">
          <i style={{ background: `linear-gradient(135deg, ${bg}, #111)` }} />
          <span>
            <b>{n}</b>
            <small>★ {r}</small>
            <small>{c}</small>
          </span>
        </div>
      ))}
      {bar && (
        <div className="k-sw-bar" data-t="order-bar">
          <span className="k-sw-bar-ic">🛵</span>
          <span>
            <b>Order is on the way</b>
            <small>Arriving in 14 mins</small>
          </span>
          <Icon name="chevron" size={20} />
        </div>
      )}
      <SwNav tap={nav} />
    </div>
  );
}

export function SwTrack({ call, cancel, help, cooking }) {
  return (
    <div className="app k-sw">
      <div className="k-sw-trk-top">
        <Icon name="back" size={22} />
        <span>
          <b>Biryani House</b>
          <small>Order #4521 · 2 items · ₹320</small>
        </span>
        <span data-t={help ? 'help' : undefined} className="k-sw-help">
          HELP
        </span>
      </div>
      <div className="k-sw-map">
        <i className="r1" />
        <i className="r2" />
        <span className="k-sw-rider">🛵</span>
        <span className="k-sw-home">🏠</span>
      </div>
      <div className="k-sw-status">
        <b>{cooking ? 'Your food is being prepared' : 'Arriving in 14 mins'}</b>
        <small>{cooking ? 'Biryani House has accepted your order' : 'Suresh is on the way with your order'}</small>
      </div>
      {!cooking && (
        <div className="k-sw-rider-row">
          <Av name="Suresh" size={44} color="#3d4152" />
          <span>
            <b>Suresh</b>
            <small>Your delivery partner</small>
          </span>
          <span className="k-sw-call" data-t={call ? 'call' : undefined}>
            <Icon name="phone" size={20} color="#1ba672" />
          </span>
        </div>
      )}
      {cooking && (
        <div className="k-sw-cancel" data-t={cancel ? 'cancel' : undefined}>
          Cancel order
        </div>
      )}
    </div>
  );
}

export function SwPage({ title, items, tap, button, buttonT }) {
  return (
    <div className="app k-sw">
      <div className="k-sw-bar2">
        <Icon name="back" size={22} />
        <b>{title}</b>
      </div>
      {items.map(([k, ic, t, s]) => (
        <div key={k} className="k-sw-row" data-t={tap === k ? k : undefined}>
          <span className="k-sw-ic">
            <Icon name={ic} size={20} />
          </span>
          <span>
            <b>{t}</b>
            {s && <small>{s}</small>}
          </span>
          <Icon name="chevron" size={18} />
        </div>
      ))}
      {button && (
        <div className="k-sw-btn" data-t={buttonT}>
          {button}
        </div>
      )}
    </div>
  );
}

export function SwAddressMap({ save }) {
  return (
    <div className="app k-sw">
      <div className="k-sw-bar2">
        <Icon name="back" size={22} />
        <b>Add address</b>
      </div>
      <div className="k-sw-map tall">
        <i className="r1" />
        <i className="r2" />
        <span className="k-sw-pin">📍</span>
        <em>Move the pin to your house</em>
      </div>
      <div className="k-sw-form">
        <div>
          <small>House / Flat / Floor No.</small>
          <b>12B, 2nd floor</b>
        </div>
        <div>
          <small>Landmark (optional)</small>
          <b>Near Shiva temple</b>
        </div>
        <div className="k-sw-tags">
          <span className="on">Home</span>
          <span>Work</span>
          <span>Other</span>
        </div>
      </div>
      <div className="k-sw-btn" data-t={save ? 'save' : undefined}>
        Save address and proceed
      </div>
    </div>
  );
}

export function SwIssue({ upload }) {
  return (
    <div className="app k-sw">
      <div className="k-sw-bar2">
        <Icon name="back" size={22} />
        <b>Items missing or wrong</b>
      </div>
      <div className="k-sw-form">
        <small>Which item had a problem?</small>
        <div className="k-sw-check on">✓ Veg Biryani x1</div>
        <div className="k-sw-check">Raita x1</div>
        <div className="k-sw-upload" data-t={upload ? 'upload' : undefined}>
          <Icon name="camera" size={22} /> Upload a photo of the item
        </div>
      </div>
      <div className="k-sw-btn">Submit</div>
    </div>
  );
}

// ---------- Blinkit ----------
export function BlHome({ nav }) {
  return (
    <div className="app k-bl">
      <div className="k-bl-top">
        <span>
          <small>Blinkit in</small>
          <b>10 minutes</b>
          <small>Home · MG Road ▾</small>
        </span>
        <span data-t={nav === 'profile' ? 'profile' : undefined}>
          <Av name="K" size={36} color="#000" />
        </span>
      </div>
      <div className="k-bl-search">
        <Icon name="search" size={18} /> Search "milk"
      </div>
      <div className="k-bl-grid">
        {['🥛 Dairy', '🍞 Bakery', '🍎 Fruits', '🥬 Vegetables', '🍚 Atta & Rice', '🧴 Personal care'].map((c) => (
          <span key={c}>
            <i>{c.split(' ')[0]}</i>
            {c.split(' ').slice(1).join(' ')}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BlProfile({ tap }) {
  return (
    <div className="app k-bl">
      <div className="k-sw-bar2">
        <Icon name="back" size={22} />
        <b>Profile</b>
      </div>
      <div className="k-bl-card">
        <b>Kamla Devi</b>
        <small>+91 98450 12345</small>
      </div>
      {[
        ['orders', 'box', 'Your orders'],
        ['address', 'location', 'Address book'],
        ['refunds', 'rupee', 'Refunds'],
        ['help', 'help', 'Help & support'],
      ].map(([k, ic, l]) => (
        <div key={k} className="k-sw-row" data-t={tap === k ? k : undefined}>
          <span className="k-sw-ic">
            <Icon name={ic} size={20} />
          </span>
          <span>
            <b>{l}</b>
          </span>
          <Icon name="chevron" size={18} />
        </div>
      ))}
    </div>
  );
}

export function BlOrders({ again }) {
  return (
    <div className="app k-bl">
      <div className="k-sw-bar2">
        <Icon name="back" size={22} />
        <b>Your orders</b>
      </div>
      <div className="k-bl-order">
        <div className="k-bl-oh">
          <b>Delivered</b>
          <small>21 Oct, 8:12 am · ₹214</small>
        </div>
        <div className="k-bl-items">
          <span>🥛</span>
          <span>🍞</span>
          <span>🥚</span>
        </div>
        <div className="k-bl-again" data-t={again ? 'again' : undefined}>
          Order again
        </div>
      </div>
      <div className="k-bl-order dim">
        <div className="k-bl-oh">
          <b>Delivered</b>
          <small>14 Oct · ₹520</small>
        </div>
        <div className="k-bl-items">
          <span>🍎</span>
          <span>🥬</span>
        </div>
      </div>
    </div>
  );
}

export function BlCart() {
  return (
    <div className="app k-bl">
      <div className="k-sw-bar2">
        <Icon name="back" size={22} />
        <b>Checkout</b>
      </div>
      {[
        ['🥛', 'Amul Taaza Milk 500 ml', '₹28'],
        ['🍞', 'Brown Bread', '₹45'],
        ['🥚', 'Eggs (6 pcs)', '₹54'],
      ].map(([e, n, p]) => (
        <div key={n} className="k-bl-line">
          <i>{e}</i>
          <b>{n}</b>
          <span className="k-bl-qty">− 1 +</span>
          <small>{p}</small>
        </div>
      ))}
      <div className="k-bl-pay">
        <span>
          <small>To pay</small>
          <b>₹127</b>
        </span>
        <span className="k-bl-paybtn">Proceed to pay</span>
      </div>
    </div>
  );
}

// ---------- Flipkart ----------
function FkNav({ tap }) {
  return (
    <div className="k-fk-nav">
      {[
        ['home', 'home', 'Home'],
        ['play', 'play', 'Play'],
        ['cat', 'grid', 'Categories'],
        ['account', 'user', 'Account'],
        ['cart', 'cart', 'Cart'],
      ].map(([k, ic, l]) => (
        <span key={k} className={k === 'home' ? 'on' : ''} data-t={tap === k ? `nav-${k}` : undefined}>
          <Icon name={ic} size={22} />
          {l}
        </span>
      ))}
    </div>
  );
}

export function FkHome({ nav, search }) {
  return (
    <div className="app k-fk">
      <div className="k-fk-top">
        <b className="k-fk-word">Flipkart</b>
        <div className="k-fk-search" data-t={search ? 'search' : undefined}>
          <Icon name="search" size={18} /> Search for products
        </div>
      </div>
      <div className="k-fk-banner">Big Diwali Sale · Up to 70% off</div>
      <div className="k-fk-grid">
        {['📱 Mobiles', '🏠 Home', '👕 Fashion', '🧴 Beauty', '🍳 Kitchen', '📺 TVs'].map((c) => (
          <span key={c}>
            <i>{c.split(' ')[0]}</i>
            {c.split(' ')[1]}
          </span>
        ))}
      </div>
      <FkNav tap={nav} />
    </div>
  );
}

export function FkAccount({ tap }) {
  return (
    <div className="app k-fk light">
      <div className="k-fk-acc">
        <b>Hey! Kamla</b>
        <span className="k-fk-plus">Plus Silver</span>
      </div>
      <div className="k-fk-quick">
        {[
          ['orders', 'box', 'Orders'],
          ['wishlist', 'heart', 'Wishlist'],
          ['coupons', 'tag', 'Coupons'],
          ['help', 'help', 'Help Center'],
        ].map(([k, ic, l]) => (
          <span key={k} data-t={tap === k ? k : undefined}>
            <Icon name={ic} size={20} color="#2874f0" />
            {l}
          </span>
        ))}
      </div>
      <div className="k-fk-sec">Account Settings</div>
      {[
        ['profile', 'user', 'Edit Profile'],
        ['addresses', 'location', 'Saved Addresses'],
        ['language', 'globe', 'Select Language'],
        ['notifications', 'bell', 'Notification Settings'],
      ].map(([k, ic, l]) => (
        <div key={k} className="k-fk-row" data-t={tap === k ? k : undefined}>
          <Icon name={ic} size={20} color="#2874f0" />
          <b>{l}</b>
          <Icon name="chevron" size={18} />
        </div>
      ))}
      <FkNav />
    </div>
  );
}

export function FkOrders({ status = 'Delivered on 20 Oct', tap }) {
  return (
    <div className="app k-fk light">
      <div className="k-fk-bar">
        <Icon name="back" size={22} />
        <b>My Orders</b>
      </div>
      <div className="k-fk-search in">
        <Icon name="search" size={18} /> Search your order here
      </div>
      {[
        ['bottle', '🍶', 'Milton Steel Water Bottle, 1 L', status],
        ['kurta', '👗', 'Cotton Kurta, Blue', 'Delivered on 2 Oct'],
      ].map(([k, e, n, s]) => (
        <div key={k} className="k-fk-order" data-t={tap && k === 'bottle' ? 'item' : undefined}>
          <i>{e}</i>
          <span>
            <b className={s.startsWith('Delivered') ? 'k-green' : 'k-blue'}>{s}</b>
            <small>{n}</small>
          </span>
          <Icon name="chevron" size={18} />
        </div>
      ))}
    </div>
  );
}

// stage: 'ordered' | 'shipped' | 'delivered'
export function FkOrder({ stage = 'shipped', act }) {
  const steps = ['Order Confirmed', 'Shipped', 'Out for delivery', 'Delivered'];
  const n = { ordered: 1, shipped: 2, delivered: 4 }[stage];
  return (
    <div className="app k-fk light">
      <div className="k-fk-bar">
        <Icon name="back" size={22} />
        <b>Order Details</b>
      </div>
      <div className="k-fk-prod">
        <i>🍶</i>
        <span>
          <b>Milton Steel Water Bottle, 1 L</b>
          <small>Silver · ₹349</small>
        </span>
      </div>
      <div className="k-fk-track">
        {steps.map((s, i) => (
          <div key={s} className={i < n ? 'done' : ''}>
            <em className="k-fk-dot" />
            <span>
              {s}
              <small>{i < n ? ['Mon, 20 Oct', 'Tue, 21 Oct', 'Thu, 23 Oct', 'Thu, 23 Oct'][i] : i === n ? 'Expected by Sun, 26 Oct' : ''}</small>
            </span>
          </div>
        ))}
      </div>
      <div className="k-fk-acts">
        {stage === 'delivered' ? (
          <span data-t={act === 'return' ? 'return' : undefined}>Return</span>
        ) : (
          <span data-t={act === 'cancel' ? 'cancel' : undefined}>Cancel</span>
        )}
        <span>Need help?</span>
      </div>
    </div>
  );
}

export function FkAddresses({ add }) {
  return (
    <div className="app k-fk light">
      <div className="k-fk-bar">
        <Icon name="back" size={22} />
        <b>My Addresses</b>
      </div>
      <div className="k-fk-add" data-t={add ? 'add' : undefined}>
        <Icon name="plus" size={20} color="#2874f0" /> Add a new address
      </div>
      <div className="k-fk-addr">
        <b>Kamla Devi</b>
        <small>12B, MG Road, Ernakulam, Kochi 682016</small>
        <small>98450 12345</small>
      </div>
    </div>
  );
}

export function FkAddressForm({ save }) {
  return (
    <div className="app k-fk light">
      <div className="k-fk-bar">
        <Icon name="back" size={22} />
        <b>Add delivery address</b>
      </div>
      <div className="k-fk-form">
        {[
          ['Full Name (Required)', 'Kamla Devi'],
          ['Phone number (Required)', '98450 12345'],
          ['Pincode (Required)', '682016'],
          ['House No., Building Name (Required)', '12B, Lakshmi Apartments'],
          ['Road name, Area, Colony (Required)', 'MG Road, Ernakulam'],
        ].map(([l, v]) => (
          <div key={l}>
            <small>{l}</small>
            <b>{v}</b>
          </div>
        ))}
      </div>
      <div className="k-fk-save" data-t={save ? 'save' : undefined}>
        Save Address
      </div>
    </div>
  );
}
