import { Nav } from '@/components/Nav';
import { MonumentHome } from '@/components/MonumentHome';
import { About } from '@/components/About';
import { Acquire } from '@/components/Acquire';
import { Footer } from '@/components/Footer';
import { getAllWorks } from '@/lib/works';

export const revalidate = 60;

export default async function Home() {
  const works = await getAllWorks();

  return (
    <main className="relative">
      <Nav />
      <MonumentHome works={works} />
      <About />
      <Acquire />
      <Footer />
    </main>
  );
}
