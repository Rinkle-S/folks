'use client';
// Registers the service worker. Installation uses the browser's normal menu.
import { useEffect } from 'react';
import { flushOutbox } from '@/lib/client';
import { logVoiceServices } from '@/lib/voice';

export default function PwaBoot() {
  useEffect(() => {
    logVoiceServices();
    flushOutbox(); // send feedback that was waiting for the database
    const retry = () => flushOutbox();
    const onVisible = () => { if (document.visibilityState === 'visible') retry(); };
    window.addEventListener('online', retry);
    document.addEventListener('visibilitychange', onVisible);
    const retryTimer = setInterval(retry, 30000);
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
    return () => {
      window.removeEventListener('online', retry);
      document.removeEventListener('visibilitychange', onVisible);
      clearInterval(retryTimer);
    };
  }, []);
  return null;
}
