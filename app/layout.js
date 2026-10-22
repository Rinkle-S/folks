import '@fontsource/mukta/400.css';
import '@fontsource/mukta/500.css';
import '@fontsource/mukta/600.css';
import '@fontsource/mukta/700.css';
import '@fontsource/mukta/800.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css';
import './screens.css';
import PwaBoot from '@/components/PwaBoot';

export const metadata = {
  title: 'Folks | Phone help for your folks',
  description: 'Safe, voice-guided practice for everyday phone tasks. No real money, in Hindi and English.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0e6b5c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PwaBoot />
        {children}
      </body>
    </html>
  );
}
