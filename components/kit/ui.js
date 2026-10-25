// Shared pieces for the practice app screens (the "kit"). Each app's screens are templates that take
// props, so a lesson step is just { kit: 'wa-chats', p: {...}, target: 'fab' }.
// Anything tappable carries data-t; the lesson's target is one of those keys.
import Icon from '../Icons';
import { useScreenLang } from '../LangCtx';

const COLORS = ['#7c3aed', '#0891b2', '#ea580c', '#2563eb', '#db2777', '#16a34a', '#b45309', '#4f46e5', '#dc2626', '#0d9488'];
export function colorFor(name = '') {
  let h = 0;
  for (const ch of String(name)) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return COLORS[h % COLORS.length];
}

export function Av({ name = '?', size = 44, color, img, t }) {
  return (
    <span className="k-av" data-t={t} style={{ width: size, height: size, background: img ? '#dfe5ec' : color || colorFor(name), fontSize: size * 0.42 }}>
      {img ? <span style={{ fontSize: size * 0.6 }}>{img}</span> : String(name).replace(/[^\p{L}\p{N}]/gu, '').slice(0, 1).toUpperCase()}
    </span>
  );
}

export function Status({ dark, time = '10:30' }) {
  return (
    <div className={`k-status ${dark ? 'dark' : ''}`}>
      <span>{time}</span>
      <span className="k-status-r">
        <Icon name="wifi" size={13} stroke={2.4} /> 4G <Icon name="battery" size={15} stroke={2} /> 82%
      </span>
    </div>
  );
}

// Overlays drawn over any screen: a popup menu, a bottom sheet, a dialog or a toast.
// Items: { t, label, icon?, color?, sub? }
export function Overlay({ ov }) {
  if (!ov) return null;
  return (
    <>
      {ov.menu && (
        <div className="k-scrim">
          <div className={`k-menu ${ov.menu.at || 'tr'}`}>
            {ov.menu.items.map((it, i) => (
              <div key={i} className="k-menu-i" data-t={it.t}>
                {it.icon && <Icon name={it.icon} size={20} />}
                {it.label}
              </div>
            ))}
          </div>
        </div>
      )}
      {ov.sheet && (
        <div className="k-dim end">
          <div className="k-sheet">
            <i className="k-sheet-h" />
            {ov.sheet.title && <div className="k-sheet-t">{ov.sheet.title}</div>}
            {ov.sheet.top}
            {ov.sheet.grid ? (
              <div className="k-sheet-grid">
                {ov.sheet.grid.map((it, i) => (
                  <div key={i} data-t={it.t}>
                    <span style={{ background: it.color || '#5f6368' }}>
                      <Icon name={it.icon} size={24} color="#fff" />
                    </span>
                    <small>{it.label}</small>
                  </div>
                ))}
              </div>
            ) : (
              (ov.sheet.items || []).map((it, i) => (
                <div key={i} className={`k-sheet-i ${it.on ? 'on' : ''}`} data-t={it.t}>
                  {it.icon && <Icon name={it.icon} size={22} />}
                  {it.radio !== undefined && <span className={`k-radio ${it.radio ? 'on' : ''}`} />}
                  <span className="k-sheet-l">
                    {it.label}
                    {it.sub && <small>{it.sub}</small>}
                  </span>
                </div>
              ))
            )}
            {ov.sheet.button && (
              <div className="k-sheet-btn" data-t={ov.sheet.button.t} style={ov.sheet.button.color ? { background: ov.sheet.button.color } : undefined}>
                {ov.sheet.button.label}
              </div>
            )}
          </div>
        </div>
      )}
      {ov.dialog && (
        <div className="k-dim">
          <div className="k-dialog">
            {ov.dialog.icon && (
              <div className="k-dialog-ic">
                <Icon name={ov.dialog.icon} size={26} />
              </div>
            )}
            <b>{ov.dialog.title}</b>
            {ov.dialog.body && <p>{ov.dialog.body}</p>}
            {ov.dialog.check && (
              <div className="k-check">
                <span className="on">✓</span>
                {ov.dialog.check}
              </div>
            )}
            <div className={`k-dialog-act ${ov.dialog.stack ? 'stack' : ''}`}>
              {ov.dialog.actions.map((a, i) => (
                <span key={i} data-t={a.t} className={a.danger ? 'danger' : ''} style={ov.dialog.color ? { color: ov.dialog.color } : undefined}>
                  {a.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      {ov.toast && <div className="k-toast">{ov.toast}</div>}
      {ov.side && (
        <div className="k-side">
          <span className="k-side-b up" />
          <span className="k-side-b down" data-t={ov.side === 'both' ? 'both' : undefined} />
          <span className="k-side-b pow" data-t={ov.side === 'power' ? 'power' : undefined} />
          <em data-t={ov.side === 'both' ? 'both' : undefined}>{ov.sideLabel || 'Volume down + Power'}</em>
        </div>
      )}
    </>
  );
}

// A plain Material list row used by several apps.
export function Row({ t, icon, color, title, sub, right, toggle, av, chevron, radio, big }) {
  return (
    <div className={`k-row ${big ? 'big' : ''}`} data-t={t}>
      {radio !== undefined && <span className={`k-radio ${radio ? 'on' : ''}`} />}
      {av && <Av name={av.name || title} size={av.size || 44} color={av.color} img={av.img} />}
      {icon && (
        <span className="k-row-ic" style={color ? { background: color, color: '#fff' } : undefined}>
          <Icon name={icon} size={20} />
        </span>
      )}
      <span className="k-row-tx">
        <b>{title}</b>
        {sub && <small>{sub}</small>}
      </span>
      {right && <em>{right}</em>}
      {toggle !== undefined && (
        <span className={`k-switch ${toggle ? 'on' : ''}`}>
          <i />
        </span>
      )}
      {chevron && <Icon name="chevron" size={18} />}
    </div>
  );
}

export function Keys({ dark }) {
  return (
    <div className={`k-keys ${dark ? 'dark' : ''}`}>
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((k, i) => (
        <span key={i} className={k ? '' : 'blank'} data-key={k === '⌫' ? 'back' : k || undefined}>
          {k}
        </span>
      ))}
    </div>
  );
}

export function PinDots({ n = 4, filled = 0, color }) {
  return (
    <div className="k-dots">
      {Array.from({ length: n }).map((_, i) => (
        <i key={i} className={i < filled ? 'on' : ''} style={color ? { borderColor: color, background: i < filled ? color : undefined } : undefined} />
      ))}
    </div>
  );
}

// End-of-lesson and "be careful" cards, drawn like a phone screen.
export function Done({ title = 'Well done', sub = 'Now try it once on your real phone.', warn }) {
  const lang = useScreenLang();
  const text = (value) => typeof value === 'object' ? value[lang] || value.en : value;
  return (
    <div className={`app k-done ${warn ? 'warn' : ''}`}>
      <span className="k-done-ic">
        <Icon name={warn ? 'alert' : 'checkCircle'} size={48} />
      </span>
      <b>{text(title)}</b>
      {sub && <small>{text(sub)}</small>}
    </div>
  );
}
