// Practice look-alike of Google Drive's scan flow. Same layout and labels; no Google logos.
import Icon from '../Icons';

const FILES = [
  { name: 'Pension papers.pdf', c: '#e5252a', kind: 'PDF' },
  { name: 'Family photo.jpg', c: '#1a73e8', kind: 'IMG' },
  { name: 'Gas booking.pdf', c: '#e5252a', kind: 'PDF' },
];

export function DriveHome({ saved }) {
  const files = saved ? [{ name: 'Medical report.pdf', c: '#e5252a', kind: 'PDF', isNew: true }, ...FILES] : FILES;
  return (
    <div className="app dv">
      <div className="dv-search">
        <Icon name="search" size={18} />
        <span>Search in Drive</span>
        <span className="dv-me">K</span>
      </div>
      <div className="dv-chips">
        <span className="on">Suggested</span>
        <span>Activity</span>
      </div>
      <div className="dv-list">
        {files.map((f, i) => (
          <div key={i} className={`dv-file ${f.isNew ? 'new' : ''}`}>
            <span className="dv-ic" style={{ background: f.c }}>
              {f.kind}
            </span>
            <div>
              <b>{f.name}</b>
              <small>{f.isNew ? 'Saved just now' : 'You opened · Last week'}</small>
            </div>
            <Icon name="more" size={20} />
          </div>
        ))}
      </div>
      <div className="dv-fab" data-t="new">
        <span className="dv-plus">+</span> New
      </div>
      <div className="dv-nav">
        <span className="on">Home</span>
        <span>Starred</span>
        <span>Shared</span>
        <span>Files</span>
      </div>
    </div>
  );
}

export function DriveNew() {
  const items = [
    { icon: 'bills', label: 'Folder' },
    { icon: 'arrow', label: 'Upload' },
    { t: 'scan', icon: 'camera', label: 'Scan' },
    { icon: 'text', label: 'Google Docs' },
    { icon: 'balance', label: 'Google Sheets' },
    { icon: 'video', label: 'Google Slides' },
  ];
  return (
    <div className="app dv stack">
      <DriveHome />
      <div className="gp-dim" />
      <div className="gp-sheet">
        <div className="gp-sheet-h">Create new</div>
        <div className="dv-grid">
          {items.map((it, i) => (
            <div key={i} className="dv-new" data-t={it.t}>
              <span>
                <Icon name={it.icon} size={22} />
              </span>
              {it.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Paper() {
  return (
    <div className="dv-paper">
      <b>CITY DIAGNOSTICS (PRACTICE)</b>
      <small>Blood test report</small>
      <i />
      <i />
      <i className="short" />
      <i />
      <i className="short" />
    </div>
  );
}

export function DriveScanner() {
  return (
    <div className="app dv-cam">
      <div className="dv-cam-top">
        <span>✕</span>
        <span>Auto</span>
      </div>
      <div className="dv-cam-view">
        <div className="dv-frame">
          <Paper />
        </div>
      </div>
      <div className="dv-cam-foot">
        <span className="dv-gal">🖼️</span>
        <span className="dv-shutter" data-t="shutter" />
        <span className="dv-gal" />
      </div>
    </div>
  );
}

export function DriveReview() {
  return (
    <div className="app dv-cam light">
      <div className="dv-cam-top dark">
        <span>✕</span>
        <span>1 page</span>
      </div>
      <div className="dv-cam-view">
        <Paper />
      </div>
      <div className="dv-review-bar">
        <span data-t="retake">Retake</span>
        <span data-t="add-page">+ Add page</span>
        <span className="dv-done" data-t="done">
          Done
        </span>
      </div>
    </div>
  );
}

export function DriveSave() {
  return (
    <div className="app dv stack">
      <DriveHome />
      <div className="gp-dim" />
      <div className="dv-dialog">
        <div className="gp-sheet-h">Save to Drive</div>
        <label>File name</label>
        <div className="dv-input">Medical report</div>
        <label>Location</label>
        <div className="dv-input">My Drive</div>
        <div className="dv-dialog-btns">
          <span>Cancel</span>
          <span className="dv-save" data-t="save">
            Save
          </span>
        </div>
      </div>
    </div>
  );
}
