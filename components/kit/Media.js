// YouTube, Instagram and Spotify templates.
import Icon from '../Icons';
import { Av, Status } from './ui';
import { YtResults } from '../screens/YouTube';
import { useScreenText } from '../LangCtx';

export { YtResults };

function YtLogo() {
  return (
    <span className="yt-logo">
      <span className="yt-play">
        <Icon name="play" size={12} />
      </span>
      YouTube
    </span>
  );
}

function YtNav({ tap }) {
  return (
    <div className="k-yt-nav">
      {[
        ['home', 'home', 'Home'],
        ['shorts', 'video', 'Shorts'],
        ['add', 'plusCircle', ''],
        ['subs', 'list', 'Subscriptions'],
        ['you', 'user', 'You'],
      ].map(([k, ic, l]) => (
        <span key={k} className={k === 'home' ? 'on' : ''} data-t={tap === k ? `nav-${k}` : undefined}>
          <Icon name={ic} size={k === 'add' ? 30 : 22} />
          {l}
        </span>
      ))}
    </div>
  );
}

export function YtHomeK({ search, nav }) {
  return (
    <div className="app yt">
      <div className="yt-top">
        <YtLogo />
        <span className="yt-icons">
          <Icon name="cast" size={22} />
          <Icon name="bell" size={22} />
          <span data-t={search ? 'search' : undefined} className="yt-search-btn">
            <Icon name="search" size={24} />
          </span>
        </span>
      </div>
      <div className="yt-chips">
        <span className="on">All</span>
        <span>Music</span>
        <span>Relaxing</span>
        <span>News</span>
        <span>Cooking</span>
      </div>
      {[
        ['Morning yoga for beginners', 'Healthy Living · 2.1M views', '20:14', '#7a4b1e'],
        ['Easy masala dosa at home', 'Ghar Ka Khana · 890K views', '12:40', '#1e4a6b'],
      ].map(([t, c, tm, bg]) => (
        <div key={t} className="yt-card">
          <div className="yt-thumb" style={{ background: `linear-gradient(135deg, ${bg}, #111)` }}>
            <span className="yt-thumb-t">{t}</span>
            <span className="yt-time">{tm}</span>
          </div>
          <div className="yt-meta">
            <span className="yt-ch-av" style={{ background: bg }} />
            <p>
              <b>{t}</b>
              <small>{c}</small>
            </p>
          </div>
        </div>
      ))}
      <YtNav tap={nav} />
    </div>
  );
}

// The watch page. tapVideo: the video itself is the target. controls: buttons showing on the video.
// cc / more: those buttons are targets. captions: words shown at the bottom. sub: 'btn' | 'bell' target; subscribed.
export function YtWatch({ tapVideo, controls, cc, more, captions, sub, subscribed, save }) {
  const tx = useScreenText();
  return (
    <div className="app yt">
      <div className="yt-video k-yt-video" data-t={tapVideo ? 'video' : undefined} style={{ background: 'linear-gradient(135deg,#7a2e0e,#e0892b)' }}>
        <div className="yt-now">
          <span>🙏</span>
          Evergreen Old Songs
        </div>
        {controls && (
          <div className="k-yt-ctl">
            <div className="k-yt-ctl-top">
              <Icon name="chevron" size={22} color="#fff" />
              <span style={{ flex: 1 }} />
              <Icon name="cast" size={20} color="#fff" />
              <span data-t={cc ? 'cc' : undefined} className={`k-yt-cc ${captions ? 'on' : ''}`}>
                CC
              </span>
              <span data-t={more ? 'more' : undefined}>
                <Icon name="gear" size={20} color="#fff" />
              </span>
            </div>
            <div className="k-yt-ctl-mid">
              <Icon name="prev" size={30} color="#fff" />
              <span className="k-yt-pp">
                <Icon name="pause" size={34} color="#fff" />
              </span>
              <Icon name="next" size={30} color="#fff" />
            </div>
          </div>
        )}
        {captions && <div className="k-yt-caption">{tx('Every morning brings a new song')}</div>}
        <div className="yt-controls">
          <span className="yt-progress">
            <i />
          </span>
          <span className="yt-ctrl-row">
            <small>0:42 / 9:41</small>
            <span className="yt-fs">
              <Icon name="expand" size={20} stroke={2.4} />
            </span>
          </span>
        </div>
      </div>
      <div className="yt-below">
        <b>Evergreen Old Songs, full</b>
        <small>3.4B views · 6 years ago</small>
        <div className="k-yt-ch">
          <Av name="Music Garden" size={36} color="#b45309" />
          <span>
            <b>Music Garden</b>
            <small>48.2M</small>
          </span>
          {subscribed ? (
            <span className="k-yt-subbed" data-t={sub === 'bell' ? 'bell' : undefined}>
              <Icon name="bell" size={18} /> Subscribed ▾
            </span>
          ) : (
            <span className="k-yt-sub" data-t={sub === 'btn' ? 'subscribe' : undefined}>
              Subscribe
            </span>
          )}
        </div>
        <div className="k-yt-acts">
          <span>
            <Icon name="thumb" size={18} /> 2.1M
          </span>
          <span>
            <Icon name="share" size={18} /> Share
          </span>
          <span>
            <Icon name="download" size={18} /> Download
          </span>
          <span data-t={save ? 'save' : undefined}>
            <Icon name="bookmark" size={18} /> Save
          </span>
        </div>
      </div>
    </div>
  );
}

export function YtYou({ tap }) {
  return (
    <div className="app yt">
      <div className="yt-top">
        <span />
        <span className="yt-icons">
          <Icon name="cast" size={22} />
          <Icon name="search" size={22} />
          <Icon name="gear" size={22} />
        </span>
      </div>
      <div className="k-yt-me">
        <Av name="Kamla Devi" size={64} color="#0b57d0" />
        <span>
          <b>Kamla Devi</b>
          <small>@kamladevi · View channel ›</small>
        </span>
      </div>
      <div className="k-yt-h">Playlists</div>
      <div className="k-yt-pl">
        <div data-t={tap ? 'watch-later' : undefined}>
          <span style={{ background: 'linear-gradient(135deg,#7a2e0e,#e0892b)' }}>
            <Icon name="clock" size={26} color="#fff" />
          </span>
          <b>Watch later</b>
          <small>1 video</small>
        </div>
        <div>
          <span style={{ background: 'linear-gradient(135deg,#1e4a6b,#111)' }}>
            <Icon name="thumb" size={26} color="#fff" />
          </span>
          <b>Liked videos</b>
          <small>24 videos</small>
        </div>
      </div>
      <YtNav />
    </div>
  );
}

export function YtSearchK({ mic, listening }) {
  if (listening)
    return (
      <div className="app yt k-yt-listen">
        <Icon name="close" size={24} />
        <div>
          <b>Listening…</b>
          <span className="k-yt-mic-big">
            <Icon name="mic" size={40} color="#fff" />
          </span>
          <small>"Old Songs"</small>
        </div>
      </div>
    );
  return (
    <div className="app yt">
      <div className="yt-sbar">
        <Icon name="back" size={22} />
        <div className="yt-sfield">Search YouTube</div>
        <span className="yt-mic" data-t={mic ? 'mic' : undefined}>
          <Icon name="mic" size={20} />
        </span>
      </div>
      <div className="yt-sugg">
        {['old songs', 'news today', 'yoga for seniors'].map((s) => (
          <div key={s}>
            <Icon name="history" size={18} />
            <b>{s}</b>
            <Icon name="arrow" size={16} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Instagram ----------
function IgNav({ tap }) {
  return (
    <div className="k-ig-nav">
      {[
        ['home', 'home'],
        ['search', 'search'],
        ['add', 'plusCircle'],
        ['reels', 'video'],
        ['profile', 'user'],
      ].map(([k, ic]) => (
        <span key={k} data-t={tap === k ? `nav-${k}` : undefined}>
          {k === 'profile' ? <Av name="Kamla" size={26} color="#c13584" /> : <Icon name={ic} size={25} />}
        </span>
      ))}
    </div>
  );
}

export function IgHome({ nav }) {
  return (
    <div className="app k-ig">
      <div className="k-ig-top">
        <b className="k-ig-word">Instagram</b>
        <Icon name="heart" size={24} />
        <Icon name="send" size={24} />
      </div>
      <div className="k-ig-stories">
        {['Your story', 'rahul', 'pinky', 'sunita'].map((n, i) => (
          <span key={n}>
            <i className={i ? 'ring' : ''}>
              <Av name={n} size={58} />
            </i>
            <small>{n}</small>
          </span>
        ))}
      </div>
      <div className="k-ig-post">
        <div className="k-ig-ph">
          <Av name="rahul" size={32} />
          <b>rahul_sharma</b>
          <Icon name="more" size={20} />
        </div>
        <div className="k-ig-img">🎂</div>
        <div className="k-ig-acts">
          <Icon name="heart" size={24} />
          <Icon name="chats" size={24} />
          <Icon name="send" size={24} />
        </div>
      </div>
      <IgNav tap={nav} />
    </div>
  );
}

export function IgSearch({ typed, tap }) {
  return (
    <div className="app k-ig">
      <div className="k-ig-search">
        <Icon name="search" size={18} />
        <span className={typed ? 'typed' : ''}>{typed || 'Search'}</span>
      </div>
      {typed ? (
        [
          ['ramesh_kumar', 'Ramesh Kumar · Followed by rahul_sharma'],
          ['ramesh.official', 'Ramesh · 12K followers'],
          ['ramesh_photography', 'Ramesh Photos'],
        ].map(([u, s], i) => (
          <div key={u} className="k-ig-res" data-t={tap && i === 0 ? 'user' : undefined}>
            <Av name={u} size={48} />
            <span>
              <b>{u}</b>
              <small>{s}</small>
            </span>
          </div>
        ))
      ) : (
        <div className="k-ig-grid">
          {['🌅', '🍛', '🏞️', '🎂', '🪔', '🌺', '🐕', '🏠', '🌸'].map((e, i) => (
            <span key={i}>{e}</span>
          ))}
        </div>
      )}
      <IgNav />
    </div>
  );
}

export function IgProfile({ me, follow, menu, followed }) {
  const name = me ? 'kamla_devi' : 'ramesh_kumar';
  return (
    <div className="app k-ig">
      <div className="k-ig-top">
        {!me && <Icon name="back" size={22} />}
        <b style={{ flex: 1 }}>{name}</b>
        {me ? (
          <>
            <Icon name="plusCircle" size={24} />
            <span data-t={menu ? 'menu' : undefined}>
              <Icon name="menu" size={24} />
            </span>
          </>
        ) : (
          <Icon name="more" size={22} />
        )}
      </div>
      <div className="k-ig-prof">
        <Av name={name} size={84} color={me ? '#c13584' : '#ea580c'} />
        <span>
          <b>{me ? 12 : 120}</b>
          <small>posts</small>
        </span>
        <span>
          <b>{me ? 48 : 340}</b>
          <small>followers</small>
        </span>
        <span>
          <b>{me ? 61 : 210}</b>
          <small>following</small>
        </span>
      </div>
      <div className="k-ig-bio">
        <b>{me ? 'Kamla Devi' : 'Ramesh Kumar'}</b>
        <small>{me ? 'Kochi 🌴' : 'Family · Travel · Food'}</small>
      </div>
      <div className="k-ig-btns">
        {me ? (
          <>
            <span>Edit profile</span>
            <span>Share profile</span>
          </>
        ) : (
          <>
            <span className={followed ? '' : 'blue'} data-t={follow ? 'follow' : undefined}>
              {followed ? 'Following ▾' : 'Follow'}
            </span>
            <span>Message</span>
          </>
        )}
      </div>
      <div className="k-ig-grid">
        {['🌅', '🍛', '🏞️', '🎂', '🪔', '🌺'].map((e, i) => (
          <span key={i}>{e}</span>
        ))}
      </div>
      <IgNav />
    </div>
  );
}

export function IgList({ title, items, tap }) {
  return (
    <div className="app k-ig">
      <div className="k-ig-top">
        <Icon name="back" size={22} />
        <b style={{ flex: 1 }}>{title}</b>
      </div>
      {items.map(([k, ic, l, s, tog]) => (
        <div key={k} className="k-ig-row" data-t={tap === k ? k : undefined}>
          <Icon name={ic} size={22} />
          <span>
            <b>{l}</b>
            {s && <small>{s}</small>}
          </span>
          {tog !== undefined ? (
            <span className={`k-switch ${tog ? 'on' : ''}`}>
              <i />
            </span>
          ) : (
            <Icon name="chevron" size={18} />
          )}
        </div>
      ))}
    </div>
  );
}

// ---------- Spotify ----------
function SpNav({ tap }) {
  return (
    <div className="k-sp-nav">
      {[
        ['home', 'home', 'Home'],
        ['search', 'search', 'Search'],
        ['library', 'library', 'Your Library'],
        ['create', 'plus', 'Create'],
      ].map(([k, ic, l]) => (
        <span key={k} data-t={tap === k ? `nav-${k}` : undefined} className={k === 'home' ? 'on' : ''}>
          <Icon name={ic} size={22} />
          {l}
        </span>
      ))}
    </div>
  );
}

export function SpHome({ nav }) {
  return (
    <div className="app k-sp">
      <div className="k-sp-top">
        <Av name="K" size={32} color="#f59e0b" />
        <span className="on">All</span>
        <span>Music</span>
        <span>Podcasts</span>
      </div>
      <div className="k-sp-tiles">
        {['Liked Songs', 'Evergreen Hits', 'Old Classics', 'Evergreen Mix', 'Malayalam Melodies', 'Morning Calm'].map((t, i) => (
          <span key={t}>
            <i style={{ background: ['#5038a0', '#b45309', '#0e7490', '#be123c', '#15803d', '#1d4ed8'][i] }} />
            {t}
          </span>
        ))}
      </div>
      <div className="k-sp-h">Made for Kamla</div>
      <div className="k-sp-row">
        {['#b45309', '#0e7490', '#be123c'].map((c) => (
          <i key={c} style={{ background: c }} />
        ))}
      </div>
      <SpNav tap={nav} />
    </div>
  );
}

export function SpLibrary({ plus, empty = false }) {
  return (
    <div className="app k-sp">
      <div className="k-sp-top">
        <Av name="K" size={32} color="#f59e0b" />
        <b style={{ flex: 1 }}>Your Library</b>
        <Icon name="search" size={22} />
        <span data-t={plus ? 'plus' : undefined}>
          <Icon name="plus" size={26} />
        </span>
      </div>
      <div className="k-sp-chips">
        <span>Playlists</span>
        <span>Artists</span>
        <span>Albums</span>
      </div>
      <div className="k-sp-item">
        <i style={{ background: 'linear-gradient(135deg,#4f2bd8,#9ca3db)' }}>
          <Icon name="heart" size={20} color="#fff" />
        </i>
        <span>
          <b>Liked Songs</b>
          <small>Playlist · 32 songs</small>
        </span>
      </div>
      {!empty && (
        <div className="k-sp-item">
          <i style={{ background: '#b45309' }} />
          <span>
            <b>Evergreen Hits</b>
            <small>Playlist · Spotify</small>
          </span>
        </div>
      )}
      <SpNav />
    </div>
  );
}

export function SpPlaylist({ add, search, plusTap }) {
  return (
    <div className="app k-sp">
      <div className="k-sp-top">
        <Icon name="back" size={22} />
      </div>
      {search ? (
        <>
          <div className="k-sp-search">
            <Icon name="search" size={18} /> suprabhatam
          </div>
          {[
            ['Venkateswara Suprabhatam', 'M.S. Subbulakshmi'],
            ['Morning Melodies', 'Music Garden'],
            ['Gayatri Mantra', 'Anuradha Paudwal'],
          ].map(([t, a], i) => (
            <div key={t} className="k-sp-item">
              <i style={{ background: ['#b45309', '#0e7490', '#be123c'][i] }} />
              <span>
                <b>{t}</b>
                <small>{a}</small>
              </span>
              <span className="k-sp-add" data-t={plusTap && i === 0 ? 'add-song' : undefined}>
                <Icon name="plusCircle" size={24} />
              </span>
            </div>
          ))}
        </>
      ) : (
        <div className="k-sp-pl">
          <span className="k-sp-cover">
            <Icon name="music" size={50} />
          </span>
          <b>Morning songs</b>
          <small>Kamla Devi · 0 songs</small>
          <span className="k-sp-btn" data-t={add ? 'add-songs' : undefined}>
            Add to this playlist
          </span>
        </div>
      )}
    </div>
  );
}
