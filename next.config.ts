import type { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    // Don't cache the heavy Studio bundle for offline.
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    navigateFallbackDenylist: [/^\/studio/, /^\/api\//],
    runtimeCaching: [
      {
        urlPattern: /\.(?:jpg|jpeg|png|webp|avif|svg)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        urlPattern: /^https:\/\/cdn\.sanity\.io\/images\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'sanity-images',
          expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        urlPattern: /^https:\/\/api\.fontshare\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'fonts',
          expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
  experimental: {
    optimizePackageImports: ['@portabletext/react'],
  },
};

export default withPWA(nextConfig as Parameters<typeof withPWA>[0]) as NextConfig;
