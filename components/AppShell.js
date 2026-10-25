'use client';
// App frame: top bar with the Nook name and settings, and a labelled bottom navigation (like an Android app).
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NookLogo } from './Logo';
import { getProfile } from '@/lib/profile';
import Icon from './Icons';

function navItems(t) {
  return [
    { k: 'learn', href: '/', icon: 'home', label: t.navLearn },
    { k: 'safe', href: '/scams', icon: 'shieldCheck', label: t.navSafe },
    { k: 'help', href: '/help', icon: 'help', label: t.navHelp },
  ];
}

export function AppBar({ onSettings, back, learn = false, t }) {
  const [initial, setInitial] = useState('');
  useEffect(() => {
    const n = getProfile().name;
    setInitial(n ? n.trim()[0].toUpperCase() : '');
  }, []);
  return (
    <header className="appbar">
      {back ? (
        <Link href={back} className={learn ? 'labelled-control' : 'icon-btn'} aria-label={t?.back || 'Back'}>
          <Icon name="back" size={24} />
          {learn && t.back}
        </Link>
      ) : (
        <Link href="/" className="brand" aria-label="Nook home">
          <NookLogo height={40} />
        </Link>
      )}
      <span className="appbar-right">
        {!back && !learn && (
          <Link href="/profile" className="avatar" aria-label="My profile">
            {initial || '👤'}
          </Link>
        )}
        {onSettings && (
          <button className={learn ? 'labelled-control' : 'icon-btn'} onClick={onSettings} aria-label={t?.settingsLabel || 'Settings'}>
            <Icon name="gear" size={24} />
            {learn && t.settingsLabel}
          </button>
        )}
      </span>
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
