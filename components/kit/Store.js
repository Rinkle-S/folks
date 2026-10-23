// Google Play Store look-alike (2024 design: search pill with account picture, tab strip, Install buttons in
// search results, "Data safety" on the app page, "Manage apps & device") and the icon-meaning screens.
import Icon from '../Icons';
import AppIcon from '../AppIcon';
import { Av, Status } from './ui';

const REAL = { name: 'PhonePe UPI, Payment, Recharge', dev: 'PhonePe Private Limited', rating: '4.4★', reviews: '1 Cr reviews', downloads: '100 Cr+', size: '78 MB' };
const FAKE = { name: 'Phone Pay Recharge Offers', dev: 'QuickApps Studio', rating: '2.1★', reviews: '3K reviews', downloads: '10K+', size: '31 MB' };

function Nav({ on = 'apps' }) {
  return (
    <div className="k-play-nav">
      {[
        ['games', 'grid', 'Games'],
        ['apps', 'apps', 'Apps'],
        ['search', 'search', 'Search'],
        ['books', 'library', 'Books'],
      ].map(([k, ic, l]) => (
        <span key={k} className={on === k ? 'on' : ''}>
          <Icon name={ic} size={20} />
          {l}
        </span>
      ))}
    </div>
  );
}

function Tabs({ on = 'foryou' }) {
  const tabs = [
    ['foryou', 'For you', undefined],
    ['charts', 'Top charts', 'tab-charts'],
    ['kids', 'Kids', undefined],
    ['events', 'Events', undefined],
    ['premium', 'Premium', undefined],
  ];
  return (
    <div className="k-play-tabs">
      {tabs.map(([k, l, t]) => (
        <span key={k} className={on === k ? 'on' : ''} data-t={t}>
          {l}
        </span>
      ))}
    </div>
  );
}

const CARDS = [
  ['whatsapp', 'WhatsApp Messenger', '4.3★'],
  ['youtube', 'YouTube', '4.2★'],
  ['gpay', 'Google Pay', '4.5★'],
  ['maps', 'Google Maps', '4.3★'],
];

export function PlayStore({ view = 'home', query = '', fake, installing, installed, updating }) {
  const A = fake ? FAKE : REAL;
  if (view === 'app')
    return (
      <div className="app k-play">
        <Status />
        <div className="k-play-bar">
          <Icon name="back" size={22} />
          <span />
          <Icon name="search" size={22} />
          <Icon name="more" size={22} />
        </div>
        <div className="k-play-app">
          {fake ? <span className="k-fakeicon">P</span> : <AppIcon app="phonepe" size={72} />}
          <div>
            <b>{A.name}</b>
            <small className="dev" data-t="developer">
              {A.dev}
            </small>
            <small>Contains ads · In-app purchases</small>
          </div>
        </div>
        <div className="k-play-stats">
          <span data-t="rating">
            <b>{A.rating}</b>
            <small>{A.reviews}</small>
          </span>
          <span>
            <b>{A.size}</b>
            <small>Size</small>
          </span>
          <span data-t="downloads">
            <b>{A.downloads}</b>
            <small>Downloads</small>
          </span>
        </div>
        {installed ? (
          <div className="k-play-btns">
            <span className="k-play-btn ghost" data-t="uninstall">
              Uninstall
            </span>
            <span className="k-play-btn" data-t="open">
              Open
            </span>
          </div>
        ) : installing ? (
          <div className="k-play-prog">
            <i />
            <small>Installing… 64%</small>
            <span className="k-play-btn ghost cancel">Cancel</span>
          </div>
        ) : (
          <div className="k-play-btns">
            <span className="k-play-btn full" data-t="install">
              Install
            </span>
          </div>
        )}
        <div className="k-play-sec">
          <b>About this app</b>
          <small>{fake ? 'Get free recharge offers and cashback. Install now and win rewards!' : 'India’s payments app. Pay with UPI, recharge your phone and pay bills.'}</small>
        </div>
        <div className="k-play-sec" data-t="data-safety">
          <b>Data safety</b>
          <small>
            {fake
              ? 'This app may share these data types with third parties: Location, Contacts, Photos and videos.'
              : 'Safety starts with understanding how developers collect and share your data. This app may collect Personal info and Financial info.'}
          </small>
        </div>
        <Nav />
      </div>
    );

  if (view === 'manage')
    return (
      <div className="app k-play">
        <Status />
        <div className="k-play-bar">
          <Icon name="back" size={22} />
          <b className="k-play-title">Manage apps &amp; device</b>
          <span />
        </div>
        <div className="k-play-tabs">
          <span className="on">Overview</span>
          <span>Manage</span>
        </div>
        <div className="k-play-card">
          <div>
            <b>{updating ? 'Updating 3 apps…' : 'Updates available'}</b>
            <small>{updating ? 'This takes a minute' : '3 apps'}</small>
          </div>
          {updating ? <i className="k-play-spin" /> : <span className="k-play-btn" data-t="update-all">Update all</span>}
        </div>
        {[
          ['whatsapp', 'WhatsApp Messenger', '48 MB'],
          ['gpay', 'Google Pay', '35 MB'],
          ['youtube', 'YouTube', '62 MB'],
        ].map(([a, n, s]) => (
          <div key={a} className="k-play-res">
            <AppIcon app={a} size={48} />
            <span className="k-res-t">
              <b>{n}</b>
              <small>{updating ? 'Waiting…' : `Update · ${s}`}</small>
            </span>
          </div>
        ))}
        <Nav />
      </div>
    );

  return (
    <div className="app k-play">
      <Status />
      <div className="k-play-search" data-t={view === 'home' || view === 'charts' ? 'search' : undefined}>
        {view === 'search' ? <Icon name="back" size={20} /> : <Icon name="search" size={20} />}
        <span className={query ? 'typed' : ''}>{query || 'Search apps & games'}</span>
        <Icon name="mic" size={20} />
        <Av name="K" size={30} color="#1a73e8" t="profile" />
      </div>
      {view === 'home' && (
        <>
          <Tabs />
          <div className="k-play-h">
            <small className="k-ad">Sponsored</small> Suggested for you
          </div>
          <div className="k-play-row">
            {CARDS.slice(0, 3).map(([a, n, r]) => (
              <div key={a} className="k-play-card2">
                <AppIcon app={a} size={60} />
                <small>{n}</small>
                <small>{r}</small>
              </div>
            ))}
          </div>
          <div className="k-play-h">Recommended for you</div>
          <div className="k-play-row">
            {CARDS.map(([a, n, r]) => (
              <div key={a} className="k-play-card2">
                <AppIcon app={a} size={60} />
                <small>{n}</small>
                <small>{r}</small>
              </div>
            ))}
          </div>
        </>
      )}
      {view === 'charts' && (
        <>
          <Tabs on="charts" />
          <div className="k-play-chips">
            <span className="on">Top free</span>
            <span>Top paid</span>
            <span>Top grossing</span>
          </div>
          {CARDS.map(([a, n, r], i) => (
            <div key={a} className="k-play-res">
              <b className="k-rank">{i + 1}</b>
              <AppIcon app={a} size={48} />
              <span className="k-res-t">
                <b>{n}</b>
                <small>
                  {r} · Free
                </small>
              </span>
            </div>
          ))}
        </>
      )}
      {view === 'search' && (
        <div className="k-play-results">
          <div className="k-play-res ad" data-t="ad">
            <span className="k-fakeicon">₹</span>
            <span className="k-res-t">
              <small className="k-ad">Sponsored · Ad</small>
              <b>Fast Loan 5 Minutes</b>
              <small>QuickCash Finance</small>
            </span>
            <span className="k-play-mini">Install</span>
          </div>
          <div className="k-play-res" data-t="result">
            <AppIcon app="phonepe" size={56} />
            <span className="k-res-t">
              <b>{REAL.name}</b>
              <small>{REAL.dev}</small>
              <small>
                {REAL.rating} · {REAL.downloads} · {REAL.size}
              </small>
            </span>
            <span className="k-play-mini">Install</span>
          </div>
          <div className="k-play-res" data-t="fake">
            <span className="k-fakeicon">P</span>
            <span className="k-res-t">
              <b>{FAKE.name}</b>
              <small>{FAKE.dev}</small>
              <small>
                {FAKE.rating} · {FAKE.downloads} · {FAKE.size}
              </small>
            </span>
            <span className="k-play-mini">Install</span>
          </div>
        </div>
      )}
      <Nav on={view === 'search' ? 'search' : 'apps'} />
    </div>
  );
}

// "Which icon means search?" A board of common icons; the lesson says which one to tap.
const ICONS = [
  ['search', 'search'],
  ['back', 'back'],
  ['home', 'home'],
  ['share', 'share'],
  ['settings', 'gear'],
  ['menu', 'menu'],
  ['more', 'more'],
  ['camera', 'camera'],
  ['mic', 'mic'],
];
export function IconBoard({ done }) {
  return (
    <div className="app k-icons">
      <Status />
      <div className="k-icons-h">Common icons</div>
      <div className="k-icons-grid">
        {ICONS.map(([id, ic]) => (
          <div key={id} className={`k-icon-tile ${done === id ? 'ok' : ''}`} data-t={id}>
            <Icon name={ic} size={44} stroke={2} />
          </div>
        ))}
      </div>
    </div>
  );
}

// The same icon in three different apps: it means the same thing everywhere.
export function IconSame({ icon = 'search', what = 'Search' }) {
  const bars = [
    ['youtube', 'YouTube'],
    ['phonepe', 'Play Store'],
    ['whatsapp', 'WhatsApp'],
  ];
  return (
    <div className="app k-icons">
      <Status />
      <div className="k-icons-h">The same icon, in every app</div>
      {bars.map(([a, n]) => (
        <div key={a} className="k-same-row">
          {a === 'phonepe' ? (
            <span className="k-play-logo">
              <Icon name="play" size={20} />
            </span>
          ) : (
            <AppIcon app={a} size={36} />
          )}
          <b>{n}</b>
          <span className="k-same-ic">
            <Icon name={icon} size={26} stroke={2} />
          </span>
        </div>
      ))}
      <div className="k-same-note">
        <Icon name={icon} size={22} stroke={2} /> = {what}
      </div>
    </div>
  );
}
