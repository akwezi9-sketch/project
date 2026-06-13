/** @type {import('next').NextConfig} */
const galleryslugs = [
  'studio-photography','sports-photography','everything-music','sports-videography',
  'corporate-events-photos','branding-clothing-and-more','ads-commercials','corporate-event-videos',
];
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/work.html', destination: '/work', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      ...galleryslugs.map((s) => ({ source: `/${s}.html`, destination: `/work/${s}`, permanent: true })),
      ...galleryslugs.map((s) => ({ source: `/${s}`, destination: `/work/${s}`, permanent: true })),
    ];
  },
};
export default nextConfig;
