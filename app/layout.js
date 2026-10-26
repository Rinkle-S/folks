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
import '@fontsource/noto-sans-malayalam/malayalam-400.css';
import '@fontsource/noto-sans-malayalam/malayalam-500.css';
import '@fontsource/noto-sans-malayalam/malayalam-600.css';
import '@fontsource/noto-sans-malayalam/malayalam-700.css';
import '@fontsource/noto-sans-malayalam/malayalam-800.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css';
import './screens.css';
import './kit.css';
import './scam-help.css';
import './yono.css';
import PwaBoot from '@/components/PwaBoot';
import PhoneApp from '@/components/PhoneApp';

export const metadata = {
  metadataBase: new URL('https://nook-learn.vercel.app'),
  title: 'Nook | Your cozy corner for everyday learning',
  description: 'Learn everyday phone tasks with safe practice, step-by-step guidance and scam checks. English, Hindi and Malayalam.',
  openGraph: { type:'website', url:'/', siteName:'Nook', title:'Nook | Learn everyday phone tasks safely', description:'Practise on a pretend phone, watch a lesson or read the steps. English, Hindi and Malayalam.' },
  twitter: { card:'summary_large_image', title:'Nook | Learn everyday phone tasks safely', description:'Safe practice and step-by-step help for everyday phone tasks.' },
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
        <PhoneApp />
      </body>
    </html>
  );
}
