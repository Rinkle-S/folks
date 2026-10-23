'use client';
// Lets any screen offer "Add Folks to home screen" once Chrome says the app can be installed.
import { useEffect, useState } from 'react';

export default function useInstall() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const check = () => setReady(!!window.__folksInstall);
    check();
    window.addEventListener('folks-installable', check);
    return () => window.removeEventListener('folks-installable', check);
  }, []);
  const install = async () => {
    const e = window.__folksInstall;
    if (!e) return;
    e.prompt();
    try {
      await e.userChoice;
    } catch {}
    window.__folksInstall = null;
    setReady(false);
  };
  return [ready, install];
}
