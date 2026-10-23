// Generic practice screen, drawn from data. A lesson step says what the screen contains
// (a bar, rows, tiles, buttons, a camera...) and which piece to tap. This lets us add a lesson
// for a new phone setting or app in minutes, and lets the AI build one on the fly.
// Anything tappable carries data-t="<id>"; keypad keys carry data-key.
import Icon from '../Icons';
import AppIcon from '../AppIcon';

const KNOWN = new Set(
  'search back more scan contacts phone bank upi self bill recharge camera video mic attach emoji pencil palette send chats updates check chevron history balance arrow backspace plus text gauge shield bulb rupee home heart gear close play pause prev next hand list volume share car auto bike pin star bag expand cast bell calendar users sos grid sparkle download image'.split(' ')
);

function Glyph({ e, icon, size = 24 }) {
  if (icon && KNOWN.has(icon)) return <Icon name={icon} size={size} />;
  return (
    <span className="g-emoji" style={{ fontSize: size * 0.95 }}>
      {e || icon || ''}
    </span>
  );
}

const AV = ['#7e57c2', '#26a69a', '#ef6c00', '#5c6bc0', '#c2185b', '#00897b', '#6d4c41', '#3949ab', '#d84315', '#039be5'];
function Avatar({ name = '?', e, size = 44 }) {
  let h = 0;
  for (const ch of String(name)) h = (h * 31 + ch.charCodeAt(0)) % 997;
  const bg = AV[h % AV.length];
  return (
    <span className="g-av" style={{ width: size, height: size, background: e ? '#e9eef6' : bg, fontSize: size * 0.42 }}>
      {e ? <span style={{ fontSize: size * 0.55 }}>{e}</span> : String(name).replace(/[^\p{L}\p{N}]/gu, '').slice(0, 1).toUpperCase()}
    </span>
  );
}

function Switch({ on }) {
  return (
    <span className={`g-switch ${on ? 'on' : ''}`}>
      <i />
    </span>
  );
}

function Block({ b, typed, inputHere }) {
  switch (b.t) {
    case 'status':
      return (
        <div className="g-status">
          <span>{b.time || '10:30'}</span>
          <span>
            {b.on ? b.on : ''} 4G ▮▮▮ 82%
          </span>
        </div>
      );
    case 'handle':
      return (
        <div className="g-handle" data-t={b.id}>
          <i />
          <span>{b.label || 'Swipe down from the top'}</span>
        </div>
      );
    case 'bar':
      return (
        <div className={`g-bar ${b.tone || ''}`}>
          {b.back && (
            <span className="g-bar-ic" data-t={b.backId}>
              <Icon name="back" size={22} />
            </span>
          )}
          <b>{b.title}</b>
          {(b.right || []).map((r, i) => (
            <span key={i} className="g-bar-ic" data-t={r.id}>
              <Glyph e={r.e} icon={r.icon} size={22} />
            </span>
          ))}
        </div>
      );
    case 'search':
      return (
        <div className="g-search" data-t={b.id}>
          <Icon name="search" size={18} />
          <span className={b.text ? 'typed' : ''}>{b.text || b.ph || 'Search'}</span>
          {b.mic && <Icon name="mic" size={18} />}
        </div>
      );
    case 'text':
      return <p className={`g-text ${b.tone || ''}`}>{b.text}</p>;
    case 'hero':
      return (
        <div className={`g-hero ${b.tone || ''}`} data-t={b.id}>
          <span className="g-hero-ic">
            <Glyph e={b.e} icon={b.icon} size={40} />
          </span>
          <b>{b.title}</b>
          {b.sub && <small>{b.sub}</small>}
        </div>
      );
    case 'rows':
      return (
        <div className="g-rows">
          {b.title && <div className="g-sec">{b.title}</div>}
          {b.items.map((it, i) => (
            <div key={it.id || i} className="g-row" data-t={it.id}>
              {!it.e && !it.icon && !it.app && it.av !== false ? (
                <Avatar name={it.title} size={44} />
              ) : (
                <span className="g-row-ic" style={it.bg ? { background: it.bg } : undefined}>
                  {it.app ? <AppIcon app={it.app} size={30} /> : <Glyph e={it.e} icon={it.icon} size={22} />}
                </span>
              )}
              <p>
                <b>{it.title}</b>
                {it.sub && <small>{it.sub}</small>}
              </p>
              {it.on !== undefined && <Switch on={it.on} />}
              {it.right && <em>{it.right}</em>}
              {it.on === undefined && !it.right && !it.noChev && <Icon name="chevron" size={18} />}
            </div>
          ))}
        </div>
      );
    case 'tiles':
      return (
        <div className="g-tiles">
          {b.items.map((it, i) => (
            <div key={it.id || i} className={`g-tile ${it.on ? 'on' : ''}`} data-t={it.id}>
              <span>
                <Glyph e={it.e} icon={it.icon} size={26} />
              </span>
              <small>{it.label}</small>
            </div>
          ))}
        </div>
      );
    case 'grid':
      return (
        <div className="g-grid">
          {b.items.map((it, i) => (
            <div key={it.id || i} className="g-cell" data-t={it.id}>
              <span style={it.bg ? { background: it.bg } : undefined}>
                {it.app ? <AppIcon app={it.app} size={46} /> : <Glyph e={it.e} icon={it.icon} size={28} />}
              </span>
              <small>{it.label}</small>
            </div>
          ))}
        </div>
      );
    case 'chips':
      return (
        <div className="g-chips">
          {b.items.map((it, i) => (
            <span key={it.id || i} className={`g-chip ${it.on ? 'on' : ''}`} data-t={it.id}>
              {it.label}
            </span>
          ))}
        </div>
      );
    case 'cards':
      return (
        <div className="g-cards">
          {b.title && <div className="g-sec">{b.title}</div>}
          {b.items.map((it, i) => (
            <div key={it.id || i} className={`g-card ${it.tone || ''}`} data-t={it.id}>
              <span className="g-card-img" style={it.bg ? { background: it.bg } : undefined}>
                {it.e}
              </span>
              <p>
                <b>{it.title}</b>
                {it.sub && <small>{it.sub}</small>}
                {it.price && <strong>{it.price}</strong>}
              </p>
              {it.tag && <i className="g-tag">{it.tag}</i>}
            </div>
          ))}
        </div>
      );
    case 'post':
      return (
        <div className="g-post">
          <div className="g-post-h">
            <span>{b.author[0]}</span>
            <b>{b.author}</b>
          </div>
          <div className="g-post-img" data-t={b.photoId}>
            {b.e}
          </div>
          <div className="g-post-bar">
            <span data-t={b.likeId} className={b.liked ? 'liked' : ''}>
              <Icon name="heart" size={28} />
            </span>
            <span data-t={b.commentId}>
              <Icon name="chats" size={26} />
            </span>
            <span data-t={b.shareId}>
              <Icon name="send" size={26} />
            </span>
          </div>
          <p className="g-post-cap">
            <b>{b.author}</b> {b.caption}
          </p>
          {b.comment && (
            <p className="g-post-cap">
              <b>You</b> {b.comment}
            </p>
          )}
        </div>
      );
    case 'player':
      return (
        <div className="g-player">
          <div className="g-player-art">{b.e || '🎵'}</div>
          <b>{b.title}</b>
          <small>{b.artist}</small>
          <div className="g-progress">
            <i style={{ width: b.playing ? '34%' : '0%' }} />
          </div>
          <div className="g-player-ctl">
            <span data-t={b.prevId}>
              <Icon name="prev" size={28} />
            </span>
            <span className="g-play" data-t={b.playId}>
              <Icon name={b.playing ? 'pause' : 'play'} size={30} />
            </span>
            <span data-t={b.nextId}>
              <Icon name="next" size={28} />
            </span>
          </div>
        </div>
      );
    case 'view':
      return (
        <div className={`g-view ${b.front ? 'front' : ''}`}>
          <div className="g-view-pic">{b.e}</div>
          <div className="g-view-top">
            {(b.top || []).map((r, i) => (
              <span key={i} data-t={r.id}>
                <Glyph e={r.e} icon={r.icon} size={22} />
              </span>
            ))}
          </div>
          <div className="g-view-bar">
            <span className="g-view-thumb" data-t={b.galleryId}>
              {b.thumb || '🖼️'}
            </span>
            <span className="g-shutter" data-t={b.shutter} />
            <span className="g-flip" data-t={b.flip}>
              <Glyph e="🔄" size={24} />
            </span>
          </div>
        </div>
      );
    case 'field':
      return (
        <div className={`g-field ${b.value ? 'filled' : ''}`} data-t={b.id}>
          <small>{b.label}</small>
          <b>{b.value || b.ph || ''}</b>
        </div>
      );
    case 'slider':
      return (
        <div className="g-slider">
          <div className="g-slider-sample" style={{ fontSize: b.sample || 16 }}>
            {b.preview || 'This is how the words will look.'}
          </div>
          <div className="g-slider-track">
            {b.stops.map((s, i) => (
              <span key={s.id} className={`g-stop ${b.value === i ? 'on' : ''}`} data-t={s.id}>
                <i />
                <em style={{ fontSize: 12 + i * 3 }}>A</em>
              </span>
            ))}
          </div>
        </div>
      );
    case 'buttons':
      return (
        <div className={`g-buttons ${b.row ? 'row' : ''}`}>
          {b.items.map((it, i) => (
            <span key={it.id || i} className={`g-btn ${it.tone || 'primary'}`} data-t={it.id}>
              {it.e && <Glyph e={it.e} size={18} />} {it.label}
            </span>
          ))}
        </div>
      );
    case 'dots':
      return (
        <div className="g-dots">
          {Array.from({ length: b.total || 4 }).map((_, i) => (
            <i key={i} className={i < (typed || '').length ? 'on' : ''} />
          ))}
        </div>
      );
    case 'keypad':
      return (
        <div className="keypad g-keypad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((k) => (
            <span className="key" data-key={k} key={k}>
              {k}
            </span>
          ))}
          <span className="key blank" />
          <span className="key" data-key="0">
            0
          </span>
          <span className="key" data-key="back">
            <Icon name="backspace" size={22} />
          </span>
        </div>
      );
    case 'nav':
      return (
        <div className="g-nav">
          {b.items.map((it, i) => (
            <span key={it.id || i} className={it.on ? 'on' : ''} data-t={it.id}>
              <Glyph e={it.e} icon={it.icon} size={22} />
              <small>{it.label}</small>
            </span>
          ))}
        </div>
      );
    case 'dialog':
      return (
        <div className="g-dim">
          <div className="g-dialog">
            <b>{b.title}</b>
            {b.body && <p>{b.body}</p>}
            <div className="g-dialog-act">
              {b.actions.map((a) => (
                <span key={a.id} className={a.tone || ''} data-t={a.id}>
                  {a.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    case 'toast':
      return <div className="g-toast">{b.text}</div>;
    case 'gap':
      return <div style={{ flex: b.grow ? 1 : undefined, height: b.h || 8 }} />;
    case 'chatlist':
      return (
        <div className="g-chatlist">
          {b.items.map((it, i) => (
            <div key={it.id || i} className="g-chat" data-t={it.id}>
              <Avatar name={it.title} e={it.e} size={50} />
              <p>
                <b>{it.title}</b>
                <small>
                  {it.tick ? <i className="g-tick">✓✓</i> : null}
                  {it.sub}
                </small>
              </p>
              <span className="g-chat-meta">
                <em>{it.time || ''}</em>
                {it.unread ? <i className="g-badge">{it.unread}</i> : null}
              </span>
            </div>
          ))}
        </div>
      );
    case 'bubbles':
      return (
        <div className="g-bubbles">
          {b.items.map((it, i) => (
            <div key={it.id || i} className={`g-bub ${it.me ? 'me' : 'them'} ${it.sel ? 'sel' : ''}`} data-t={it.id}>
              {it.quote && <div className="g-quote">{it.quote}</div>}
              {it.img && <div className="g-bub-img">{it.img}</div>}
              {it.text && <span>{it.text}</span>}
              <small>
                {it.time || '4:12 pm'}
                {it.me ? <i className="g-tick"> ✓✓</i> : ''}
              </small>
            </div>
          ))}
        </div>
      );
    case 'composer':
      return (
        <div className="g-composer">
          <div className="g-input">
            <span data-t={b.emojiId}>😊</span>
            <em data-t={b.textId} className={b.text ? 'typed' : ''}>
              {b.text || b.ph || 'Message'}
            </em>
            <span data-t={b.clipId}>
              <Icon name="attach" size={20} />
            </span>
            {!b.noCam && (
              <span data-t={b.camId}>
                <Icon name="camera" size={20} />
              </span>
            )}
          </div>
          <span className="g-send" data-t={b.sendId || b.micId}>
            <Icon name={b.text ? 'send' : 'mic'} size={22} />
          </span>
        </div>
      );
    case 'video':
      return (
        <div className="g-video">
          <div className="g-video-pic" data-t={b.id}>
            <span className="g-video-e">{b.e || '🙏'}</span>
            {b.paused !== false && <span className="g-video-play">▶</span>}
            {b.top && (
              <div className="g-video-top">
                {b.top.map((r, i) => (
                  <span key={i} data-t={r.id}>
                    {r.e}
                  </span>
                ))}
              </div>
            )}
            <div className="g-video-bar">
              <i style={{ width: '34%' }} />
            </div>
            <div className="g-video-bot">
              <small>0:42 / 9:30</small>
              <span data-t={b.fsId}>⛶</span>
            </div>
          </div>
          <div className="g-video-meta">
            <b>{b.title}</b>
            <small>{b.sub}</small>
          </div>
        </div>
      );
    case 'channel':
      return (
        <div className="g-channel">
          <Avatar name={b.name} e={b.e} size={40} />
          <p>
            <b>{b.name}</b>
            <small>{b.sub}</small>
          </p>
          <span className={`g-sub ${b.subscribed ? 'on' : ''}`} data-t={b.id}>
            {b.subscribed ? 'Subscribed 🔔' : 'Subscribe'}
          </span>
        </div>
      );
    case 'people':
      return (
        <div className="g-people">
          {b.items.map((it, i) => (
            <div key={it.id || i} data-t={it.id}>
              <Avatar name={it.title} e={it.e} size={54} />
              <small>{it.title}</small>
            </div>
          ))}
        </div>
      );
    case 'tabs':
      return (
        <div className="g-tabs">
          {b.items.map((it, i) => (
            <span key={it.id || i} className={it.on ? 'on' : ''} data-t={it.id}>
              {it.label}
            </span>
          ))}
        </div>
      );
    case 'map':
      return (
        <div className="g-map" data-t={b.id} style={{ height: b.h || 200 }}>
          <i className="r1" />
          <i className="r2" />
          <i className="r3" />
          <span className="g-pin">{b.pin || '📍'}</span>
          {b.label && <em>{b.label}</em>}
        </div>
      );
    case 'amount':
      return (
        <div className="g-amount" data-t={b.id}>
          <Avatar name={b.name} e={b.e} size={64} />
          <b>{b.name}</b>
          {b.sub && <small>{b.sub}</small>}
          <h2>{b.value}</h2>
          {b.note && <em>{b.note}</em>}
        </div>
      );
    case 'qrscan':
      return (
        <div className="g-scan">
          <div className="g-scan-frame">
            <span>▦</span>
          </div>
          <small>Point your camera at the QR code</small>
          <div className="g-scan-top">
            {(b.top || []).map((r, i) => (
              <span key={i} data-t={r.id}>
                {r.e}
              </span>
            ))}
          </div>
        </div>
      );
    case 'popup':
      return (
        <div className="g-scrim">
          <div className={`g-pop ${b.at || 'tr'}`}>
            {b.items.map((it, i) => (
              <span key={it.id || i} data-t={it.id}>
                {it.label}
              </span>
            ))}
          </div>
        </div>
      );
    case 'sheet':
      return (
        <div className="g-dim sheet">
          <div className="g-sheet">
            <i className="g-sheet-h" />
            {b.title && <b>{b.title}</b>}
            {b.rows ? (
              b.rows.map((it, i) => (
                <div key={it.id || i} className="g-sheet-row" data-t={it.id}>
                  <span className="g-sheet-ic" style={{ background: it.bg || '#e8f0fe' }}>
                    {it.e}
                  </span>
                  {it.label}
                </div>
              ))
            ) : (
              <div className="g-sheet-grid">
                {b.items.map((it, i) => (
                  <div key={it.id || i} data-t={it.id}>
                    <span style={{ background: it.bg || '#7e57c2' }}>{it.e}</span>
                    <small>{it.label}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    case 'fab':
      return (
        <span className={`g-fab ${b.low ? 'low' : ''} ${b.label ? 'ext' : ''}`} data-t={b.id}>
          {b.e || '＋'} {b.label}
        </span>
      );
    default:
      return null;
  }
}

export default function GenScreen({ ui, typed, inputHere }) {
  const skin = ui.skin || {};
  const style = {
    '--g-brand': skin.brand || '#1a73e8',
    '--g-ink': skin.ink || '#ffffff',
    '--g-bg': skin.bg || '#ffffff',
    '--g-soft': skin.soft || '#f1f3f4',
    '--g-text': skin.text || '#202124',
  };
  // Pinned bars (nav, keypad) sit at the bottom; the rest scrolls above them.
  const pinned = ui.blocks.filter((b) => b.t === 'nav' || b.t === 'keypad');
  const body = ui.blocks.filter((b) => b.t !== 'nav' && b.t !== 'keypad' && b.t !== 'dialog' && b.t !== 'toast' && b.t !== 'popup' && b.t !== 'sheet' && b.t !== 'fab');
  const over = ui.blocks.filter((b) => b.t === 'dialog' || b.t === 'toast' || b.t === 'popup' || b.t === 'sheet' || b.t === 'fab');
  return (
    <div className={`app gen ${skin.dark ? 'dark' : ''}`} style={style}>
      <div className="g-body">
        {body.map((b, i) => (
          <Block key={i} b={b} typed={typed} inputHere={inputHere} />
        ))}
      </div>
      {pinned.map((b, i) => (
        <Block key={`p${i}`} b={b} typed={typed} inputHere={inputHere} />
      ))}
      {over.map((b, i) => (
        <Block key={`o${i}`} b={b} />
      ))}
    </div>
  );
}
