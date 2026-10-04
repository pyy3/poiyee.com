import { Nav } from '@/components/Nav';
import { MonumentHome } from '@/components/MonumentHome';
import { About } from '@/components/About';
import { Acquire } from '@/components/Acquire';
import { Footer } from '@/components/Footer';
import { getAllWorks } from '@/lib/works';
import { getSiteSettings, hasText } from '@/lib/content';

export const revalidate = 60;

export default async function Home() {
  const [works, settings] = await Promise.all([getAllWorks(), getSiteSettings()]);
  const hero = works.find((w) => w.docId === settings.heroArtworkId) ?? works[0];

  return (
    <main className="relative">
      <Nav />
      <MonumentHome
        works={works}
        hero={hero}
        title={settings.title}
        headline={settings.heroHeadline}
        tags={settings.heroTags}
        intro={hasText(settings.intro) ? settings.intro : undefined}
      />
      <About />
      <Acquire />
      <Footer />
    </main>
  );
}
