'use client';
export default function LangPicker({ onPick }) {
  return (
    <div className="page lang-page">
      <div className="brand big">Folks</div>
      <p className="lang-q">
        Choose language
        <br />
        भाषा चुनिए
      </p>
      <button className="btn lang" onClick={() => onPick('en')}>
        English
      </button>
      <button className="btn lang" onClick={() => onPick('hi')}>
        हिंदी
      </button>
    </div>
  );
}
