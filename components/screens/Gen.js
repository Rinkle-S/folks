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
              <span className="g-row-ic" style={it.bg ? { background: it.bg } : undefined}>
                <Glyph e={it.e} icon={it.icon} size={22} />
              </span>
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
  const body = ui.blocks.filter((b) => b.t !== 'nav' && b.t !== 'keypad' && b.t !== 'dialog' && b.t !== 'toast');
  const over = ui.blocks.filter((b) => b.t === 'dialog' || b.t === 'toast');
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
