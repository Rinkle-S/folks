/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: '/about', destination: '/about/index.html' }];
  },
  // Dynamic lesson previews read the existing icon at runtime. Public files
  // are otherwise served separately and are absent from Vercel's function.
  outputFileTracingIncludes: {
    '/lesson/*/opengraph-image': ['./public/icons/icon-192.png'],
  },
};
export default nextConfig;
