'use client';
// App frame: top bar with the Folks name and settings, and a labelled bottom navigation (like an Android app).
import Link from 'next/link';
import Icon from './Icons';

export function AppBar({ onSettings }) {
  return (
    <header className="appbar">
      <Link href="/" className="brand" aria-label="Folks home">
        <span className="brand-mark">F</span>
        Folks
      </Link>
      {onSettings && (
        <button className="icon-btn" onClick={onSettings} aria-label="Settings">
          <Icon name="gear" size={24} />
        </button>
      )}
    </header>
  );
}

export function BottomNav({ active, t, dot }) {
  const items = [
    { k: 'learn', href: '/', icon: 'home', label: t.navLearn },
    { k: 'safe', href: '/scams', icon: 'shieldCheck', label: t.navSafe },
    { k: 'foryou', href: '/for-you', icon: 'heart', label: t.navForYou },
  ];
  return (
    <nav className="bottomnav" aria-label="Main">
      <div className="bottomnav-in">
        {items.map((it) => (
          <Link key={it.k} href={it.href} className={`navi ${active === it.k ? 'on' : ''}`} aria-current={active === it.k ? 'page' : undefined}>
            <span className={`navi-pill ${dot === it.k ? 'navi-dot' : ''}`}>
              <Icon name={it.icon} size={24} stroke={active === it.k ? 2.4 : 2} />
            </span>
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
