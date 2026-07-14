import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Space_Mono } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'poiyee — paintings',
  description: 'Paintings by poiyee. Acrylic on canvas. Lyrical seascapes and landscapes.',
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
    description:
      'A practice in pigment, weight and water. Acrylic on canvas. Studio in Zurich, Switzerland.',
    type: 'website',
    siteName: 'poiyee',
    url: 'https://poiyee.com',
    locale: 'en_US',
    images: [
      { url: '/icons/og.png', width: 1200, height: 630, alt: 'poiyee — paintings' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'poiyee — paintings',
    description:
      'A practice in pigment, weight and water. Acrylic on canvas. Studio in Zurich, Switzerland.',
    images: ['/icons/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#FCFCFB',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${spaceMono.variable}`}>
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
