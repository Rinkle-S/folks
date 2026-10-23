// Practice look-alike of YouTube on Android: home, search, results, player with a skippable ad.
import Icon from '../Icons';

const THUMBS = ['#7a4b1e', '#1e4a6b', '#4a2a6b', '#2f5d3a'];

function Logo() {
  return (
    <span className="yt-logo">
      <span className="yt-play">
        <Icon name="play" size={12} />
      </span>
      YouTube
    </span>
  );
}

function Thumb({ i, label, time }) {
  return (
    <div className="yt-thumb" style={{ background: `linear-gradient(135deg, ${THUMBS[i % 4]}, #111)` }}>
      <span className="yt-thumb-t">{label}</span>
      <span className="yt-time">{time}</span>
    </div>
  );
}

export function YtHome() {
  const vids = [
    { title: 'Morning yoga for beginners, 20 minutes', ch: 'Healthy Living · 2.1M views', time: '20:14' },
    { title: 'Easy masala dosa at home', ch: 'Ghar Ka Khana · 890K views', time: '12:40' },
  ];
  return (
    <div className="app yt">
      <div className="yt-top">
        <Logo />
        <span className="yt-icons">
          <Icon name="cast" size={22} />
          <Icon name="bell" size={22} />
          <span data-t="search" className="yt-search-btn">
            <Icon name="search" size={24} />
          </span>
        </span>
      </div>
      <div className="yt-chips">
        <span className="on">All</span>
        <span>Music</span>
        <span>Bhakti</span>
        <span>News</span>
        <span>Cooking</span>
      </div>
      {vids.map((v, i) => (
        <div key={i} className="yt-card">
          <Thumb i={i} label={v.title.split(',')[0]} time={v.time} />
          <div className="yt-meta">
            <span className="yt-ch-av" style={{ background: THUMBS[i] }} />
            <p>
              <b>{v.title}</b>
              <small>{v.ch}</small>
            </p>
          </div>
        </div>
      ))}
      <div className="yt-nav">
        <span>
          <Icon name="home" size={22} />
          Home
        </span>
        <span>
          <Icon name="video" size={22} />
          Shorts
        </span>
        <span>
          <Icon name="plus" size={26} />
        </span>
        <span>
          <Icon name="list" size={22} />
          Subscriptions
        </span>
        <span>
          <Icon name="user" size={22} />
          You
        </span>
      </div>
    </div>
  );
}

export function YtSearch() {
  const sugg = ['hanuman chalisa', 'hanuman chalisa fast', 'hanuman chalisa with lyrics', 'hanuman aarti'];
  return (
    <div className="app yt">
      <div className="yt-sbar">
        <Icon name="back" size={22} />
        <div className="yt-sfield">
          hanuman chalisa<span className="caret" />
        </div>
        <span className="yt-mic">
          <Icon name="mic" size={20} />
        </span>
      </div>
      <div className="yt-sugg">
        {sugg.map((s, i) => (
          <div key={s} data-t={i === 0 ? 'suggest' : undefined}>
            <Icon name="search" size={18} />
            <b>{s}</b>
            <Icon name="arrow" size={16} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function YtResults() {
  const res = [
    { title: 'Shree Hanuman Chalisa, full', ch: 'Bhakti Sagar · 3.4B views', time: '9:41' },
    { title: 'Hanuman Chalisa with lyrics', ch: 'Mandir Live · 120M views', time: '10:02' },
  ];
  return (
    <div className="app yt">
      <div className="yt-sbar">
        <Icon name="back" size={22} />
        <div className="yt-sfield small">hanuman chalisa</div>
        <span className="yt-mic">
          <Icon name="mic" size={20} />
        </span>
      </div>
      {res.map((v, i) => (
        <div key={i} className="yt-card" data-t={i === 0 ? 'video' : undefined}>
          <Thumb i={i + 2} label={v.title.split(',')[0]} time={v.time} />
          <div className="yt-meta">
            <span className="yt-ch-av" style={{ background: THUMBS[i + 2] }} />
            <p>
              <b>{v.title}</b>
              <small>{v.ch}</small>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function YtPlayer({ ad, full }) {
  return (
    <div className={`app yt ${full ? 'yt-full' : ''}`}>
      <div className="yt-video" style={{ background: ad ? 'linear-gradient(135deg,#0d47a1,#26c6da)' : 'linear-gradient(135deg,#7a2e0e,#e0892b)' }}>
        {ad ? (
          <>
            <div className="yt-ad-text">
              <b>Super Clean Phone Cleaner</b>
              <span>Make your phone fast in 1 tap!</span>
            </div>
            <div className="yt-ad-tag">Sponsored · 0:05</div>
            <div className="yt-install">Install now</div>
            <div className="yt-skip" data-t="skip">
              Skip <Icon name="next" size={14} />
            </div>
          </>
        ) : (
          <>
            <div className="yt-now">
              <span>🙏</span>
              Shree Hanuman Chalisa
            </div>
            <div className="yt-controls">
              <span className="yt-progress">
                <i />
              </span>
              <span className="yt-ctrl-row">
                <small>0:42 / 9:41</small>
                <span data-t="fullscreen" className="yt-fs">
                  <Icon name="expand" size={22} stroke={2.4} />
                </span>
              </span>
            </div>
          </>
        )}
      </div>
      {!full && (
        <div className="yt-below">
          <b>Shree Hanuman Chalisa, full</b>
          <small>Bhakti Sagar · 3.4B views</small>
          <div className="yt-acts">
            <span>👍 2.1M</span>
            <span>Share</span>
            <span>Download</span>
            <span>Save</span>
          </div>
          <div className="yt-upnext">Up next</div>
          <div className="yt-mini">
            <Thumb i={1} label="Hanuman Aarti" time="5:12" />
          </div>
        </div>
      )}
    </div>
  );
}
