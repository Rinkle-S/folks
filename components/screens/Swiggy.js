// Practice look-alike of Swiggy food ordering: search, restaurant, menu, cart, order placed.
import Icon from '../Icons';

function Veg() {
  return (
    <span className="sw-veg">
      <i />
    </span>
  );
}

export function SwHome() {
  const cats = ['Idli', 'Dosa', 'Thali', 'Biryani'];
  return (
    <div className="app sw">
      <div className="sw-top">
        <div className="sw-loc">
          <Icon name="pin" size={20} />
          <p>
            <b>Home</b>
            <small>Gate 2, Green Park, Main Road</small>
          </p>
          <span className="sw-me">K</span>
        </div>
        <div className="sw-search" data-t="search">
          <span>Search for &apos;dishes&apos;</span>
          <Icon name="search" size={20} />
          <Icon name="mic" size={20} />
        </div>
      </div>
      <div className="sw-banner">
        <b>Breakfast near you</b>
        <small>Hot idli and dosa in 30 minutes</small>
      </div>
      <div className="sw-h">What&apos;s on your mind?</div>
      <div className="sw-cats">
        {cats.map((c, i) => (
          <div key={c}>
            <span style={{ background: ['#f6e7c8', '#fde3cf', '#e6efd8', '#f7dcd2'][i] }}>{['🍥', '🥞', '🍛', '🍲'][i]}</span>
            {c}
          </div>
        ))}
      </div>
      <div className="sw-nav">
        <span className="on">
          <Icon name="home" size={22} />
          Swiggy
        </span>
        <span>
          <Icon name="bag" size={22} />
          Food
        </span>
        <span>
          <Icon name="history" size={22} />
          Reorder
        </span>
      </div>
    </div>
  );
}

export function SwSearch() {
  const items = [
    { t: 'suggest', n: 'Idli', s: 'Dish' },
    { n: 'Idli Vada', s: 'Dish' },
    { n: 'Sri Krishna Tiffins', s: 'Restaurant' },
  ];
  return (
    <div className="app sw">
      <div className="sw-sbar">
        <Icon name="back" size={22} />
        <div className="sw-sfield">
          idli<span className="caret" />
        </div>
      </div>
      <div className="sw-sugg">
        {items.map((it) => (
          <div key={it.n} data-t={it.t}>
            <span className="sw-sq">{it.s === 'Dish' ? '🍥' : '🏪'}</span>
            <p>
              <b>{it.n}</b>
              <small>{it.s}</small>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SwResults() {
  const list = [
    { t: 'restaurant', n: 'Sri Krishna Tiffins', r: '4.4', time: '25-30 mins', c: 'South Indian · Green Park', bg: '#a1622b' },
    { n: 'Annapoorna Bhavan', r: '4.2', time: '35-40 mins', c: 'South Indian, Thali · 2.8 km', bg: '#5c7a2b' },
  ];
  return (
    <div className="app sw">
      <div className="sw-sbar">
        <Icon name="back" size={22} />
        <div className="sw-sfield small">idli</div>
      </div>
      <div className="sw-tabs">
        <span className="on">Restaurants</span>
        <span>Dishes</span>
      </div>
      {list.map((r) => (
        <div key={r.n} className="sw-rest" data-t={r.t}>
          <div className="sw-img" style={{ background: `linear-gradient(135deg, ${r.bg}, #2b1a0d)` }}>
            🍥
          </div>
          <div>
            <b>{r.n}</b>
            <span className="sw-rate">
              <i>★</i> {r.r} · {r.time}
            </span>
            <small>{r.c}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SwMenu({ added }) {
  return (
    <div className="app sw stack">
      <div className="sw-sbar">
        <Icon name="back" size={22} />
        <span className="sw-rname">Sri Krishna Tiffins</span>
      </div>
      <div className="sw-rhead">
        <b>Sri Krishna Tiffins</b>
        <span className="sw-rate">
          <i>★</i> 4.4 (2K+ ratings) · ₹150 for two
        </span>
        <small>25-30 mins · Green Park</small>
      </div>
      <div className="sw-menu-h">Recommended</div>
      <div className="sw-item">
        <div>
          <Veg />
          <b>Idli (2 pcs)</b>
          <span>₹60</span>
          <small>Soft idlis with sambar and coconut chutney</small>
        </div>
        <div className="sw-item-r">
          <div className="sw-dish">🍥</div>
          <div className={`sw-add ${added ? 'qty' : ''}`} data-t="add">
            {added ? '−  1  +' : 'ADD'}
          </div>
        </div>
      </div>
      <div className="sw-item">
        <div>
          <Veg />
          <b>Masala Dosa</b>
          <span>₹90</span>
          <small>Crispy dosa with potato masala</small>
        </div>
        <div className="sw-item-r">
          <div className="sw-dish">🥞</div>
          <div className="sw-add">ADD</div>
        </div>
      </div>
      {added && (
        <div className="sw-cartbar" data-t="cart">
          <span>1 item added</span>
          <b>View Cart</b>
        </div>
      )}
    </div>
  );
}

export function SwCart() {
  return (
    <div className="app sw">
      <div className="sw-sbar">
        <Icon name="back" size={22} />
        <span className="sw-rname">Sri Krishna Tiffins</span>
      </div>
      <div className="sw-box">
        <div className="sw-line">
          <Veg /> <span>Idli (2 pcs)</span>
          <span className="sw-qty">− 1 +</span>
          <b>₹60</b>
        </div>
      </div>
      <div className="sw-box">
        <div className="sw-bill-h">Bill details</div>
        <div className="sw-bl">
          <span>Item total</span>
          <span>₹60</span>
        </div>
        <div className="sw-bl">
          <span>Delivery fee</span>
          <span>₹25</span>
        </div>
        <div className="sw-bl">
          <span>Platform fee and taxes</span>
          <span>₹12</span>
        </div>
        <div className="sw-bl total">
          <span>To pay</span>
          <span>₹97</span>
        </div>
      </div>
      <div className="sw-payrow">
        <div>
          <small>PAY USING</small>
          <b>Cash on Delivery</b>
        </div>
        <div className="sw-place" data-t="place">
          <span>₹97</span>
          <b>Place Order</b>
        </div>
      </div>
    </div>
  );
}

export function SwPlaced() {
  return (
    <div className="app sw sw-placed">
      <div className="sw-ok">
        <span>
          <Icon name="check" size={40} stroke={3} />
        </span>
        <b>Order placed!</b>
        <small>Arriving in 28 mins</small>
      </div>
      <div className="sw-box">
        <div className="sw-track">
          <i className="on" />
          <i />
          <i />
        </div>
        <p className="sw-track-t">Sri Krishna Tiffins is preparing your food</p>
        <div className="sw-line">
          <span>Idli (2 pcs)</span>
          <b>₹97 · Cash</b>
        </div>
      </div>
      <div className="sw-help">
        <Icon name="phone" size={18} /> Need help? Use Help in the app only
      </div>
    </div>
  );
}
