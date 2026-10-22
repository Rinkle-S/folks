import './globals.css';
import './screens.css';

export const metadata = {
  title: 'Folks — phone help for your folks',
  description: 'Safe, voice-guided practice for everyday phone tasks. No real money, in Hindi and English.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#c2410c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Roboto:wght@400;500;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
