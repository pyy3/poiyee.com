import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Space_Mono } from 'next/font/google';
import './globals.css';
import { getSiteSettings } from '@/lib/content';

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

/* Title, description and share image come from Site settings in Sanity.
   Icons and the manifest are site assets and stay in /public. */
export async function generateMetadata(): Promise<Metadata> {
  const { title, seoTitle, seoDescription, ogImage } = await getSiteSettings();
  const images = ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: seoTitle }] : undefined;
  return {
    title: seoTitle,
    description: seoDescription,
    metadataBase: new URL('https://poiyee.com'),
    manifest: '/manifest.webmanifest',
    applicationName: title,
    appleWebApp: {
      capable: true,
      title,
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
      title: seoTitle,
      description: seoDescription,
      type: 'website',
      siteName: title,
      url: 'https://poiyee.com',
      locale: 'en_US',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

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
