'use client';
// Registers the service worker and keeps Chrome's install prompt for later (Settings → Add to home screen).
import { useEffect } from 'react';
import { flushOutbox } from '@/lib/client';
import { logVoiceServices } from '@/lib/voice';

export default function PwaBoot() {
  useEffect(() => {
    logVoiceServices();
    flushOutbox(); // send feedback that was waiting for the database
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
    const onPrompt = (e) => {
      e.preventDefault();
      window.__folksInstall = e;
      window.dispatchEvent(new Event('folks-installable'));
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);
  return null;
}
