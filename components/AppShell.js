'use client';
// App frame: top bar with the Folks name and settings, and a labelled bottom navigation (like an Android app).
import Link from 'next/link';
import Icon from './Icons';

function navItems(t) {
  return [
    { k: 'learn', href: '/', icon: 'home', label: t.navLearn },
    { k: 'safe', href: '/scams', icon: 'shieldCheck', label: t.navSafe },
    { k: 'foryou', href: '/for-you', icon: 'heart', label: t.navForYou },
  ];
}

// On a computer the same three sections sit in the top bar instead of the bottom bar.
export function AppBar({ onSettings, t, active }) {
  return (
    <header className="appbar">
      <Link href="/" className="brand" aria-label="Folks home">
        <span className="brand-mark">F</span>
        Folks
      </Link>
      {t && (
        <nav className="topnav" aria-label="Main">
          {navItems(t).map((it) => (
            <Link key={it.k} href={it.href} className={`topnav-i ${active === it.k ? 'on' : ''}`} aria-current={active === it.k ? 'page' : undefined}>
              <Icon name={it.icon} size={22} stroke={active === it.k ? 2.4 : 2} />
              {it.label}
            </Link>
          ))}
        </nav>
      )}
      {onSettings ? (
        <button className="icon-btn" onClick={onSettings} aria-label="Settings">
          <Icon name="gear" size={24} />
        </button>
      ) : (
        <span className="appbar-gap" />
      )}
    </header>
  );
}

export function BottomNav({ active, t, dot }) {
  const items = navItems(t);
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
