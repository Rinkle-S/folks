'use client';
export default function LangPicker({ onPick }) {
  return (
    <div className="page lang-page">
      <div className="brand big">Folks</div>
      <p className="lang-q">
        भाषा चुनिए
        <br />
        Choose language
      </p>
      <button className="btn lang" onClick={() => onPick('hi')}>
        हिंदी
      </button>
      <button className="btn lang" onClick={() => onPick('en')}>
        English
      </button>
    </div>
  );
}
