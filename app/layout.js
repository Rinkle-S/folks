// Noto Sans + Noto Sans Devanagari: the same type family Android uses for Hindi, designed as a matched pair,
// with a large x-height for older eyes and sister fonts for other Indian scripts when more languages are added.
import '@fontsource/noto-sans/latin-400.css';
import '@fontsource/noto-sans/latin-500.css';
import '@fontsource/noto-sans/latin-600.css';
import '@fontsource/noto-sans/latin-700.css';
import '@fontsource/noto-sans/latin-800.css';
import '@fontsource/noto-sans-devanagari/devanagari-400.css';
import '@fontsource/noto-sans-devanagari/devanagari-500.css';
import '@fontsource/noto-sans-devanagari/devanagari-600.css';
import '@fontsource/noto-sans-devanagari/devanagari-700.css';
import '@fontsource/noto-sans-devanagari/devanagari-800.css';
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
