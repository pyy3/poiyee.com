import type { Metadata } from 'next';
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
  openGraph: {
    title: 'poiyee — paintings',
    description: 'Oil on canvas. Mumbai.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* PP Neue Montreal (body sans) — Fontshare CDN. Self-host in a later pass. */}
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
