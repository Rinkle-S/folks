export default function manifest() {
  return {
    name: 'Folks',
    short_name: 'Folks',
    description: 'Phone help for your folks',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff8f0',
    theme_color: '#c2410c',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
