import Hero       from '@/components/sections/Hero';
import About      from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects   from '@/components/sections/Projects';
import Contact    from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
