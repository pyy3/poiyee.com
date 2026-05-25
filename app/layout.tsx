import type { Metadata, Viewport } from 'next';
import { Fraunces, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'poiyee — paintings',
  description: 'Paintings by poiyee. Oil on canvas. Lyrical seascapes and landscapes.',
  metadataBase: new URL('https://poiyee.com'),
  manifest: '/manifest.webmanifest',
  applicationName: 'poiyee',
  appleWebApp: {
    capable: true,
    title: 'poiyee',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/icons/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/icons/icon-180.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'poiyee — paintings',
    description: 'Oil on canvas. Mumbai.',
    type: 'website',
    images: [{ url: '/icons/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'poiyee — paintings',
    description: 'Oil on canvas. Mumbai.',
    images: ['/icons/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#1A2230',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=neue-montreal@400,500&display=swap"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
