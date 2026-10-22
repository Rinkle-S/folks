'use client';
// Settings sheet: language and sound. Labels are bilingual so anyone can find their language.
export default function Settings({ lang, setLang, muted, toggleMute, onClose }) {
  return (
    <div className="settings-wrap" onClick={onClose}>
      <div className="settings" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Settings">
        <div className="settings-h">
          <b>⚙️ Settings / सेटिंग</b>
          <button className="chip" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <label className="settings-row">
          <span>Language / भाषा</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
          </select>
        </label>
        <div className="settings-row">
          <span>Sound / आवाज़</span>
          <button className={`toggle ${muted ? '' : 'on'}`} onClick={toggleMute} aria-pressed={!muted}>
            {muted ? 'Off / बंद' : 'On / चालू'}
          </button>
        </div>
        <button className="btn primary" onClick={onClose}>
          {lang === 'hi' ? 'ठीक है' : 'Done'}
        </button>
      </div>
    </div>
  );
}
