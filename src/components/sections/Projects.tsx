'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProjectCard from '@/components/shared/ProjectCard';
import ProjectCarousel from '@/components/shared/ProjectCarousel';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { projects, type ProjectCategory } from '@/data/projects';

const tabs: { value: 'all' | ProjectCategory; label: string }[] = [
  { value: 'all',    label: 'All' },
  { value: 'app',    label: 'Apps' },
  { value: 'game',   label: 'Games' },
  { value: 'client', label: 'Client Websites' },
];

export default function Projects() {
  return (
    <section
      id="projects"
      style={{ padding: '100px 24px', background: 'var(--clr-bg)' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <ScrollReveal>
          <p style={{
            fontFamily: 'var(--font-geist-mono)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--clr-accent)', marginBottom: 12,
          }}>
            // selected_work
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
            color: 'var(--clr-text)', letterSpacing: '-0.03em', marginBottom: 48,
          }}>
            Things I&apos;ve built.
          </h2>
        </ScrollReveal>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList
            variant="line"
            style={{
              marginBottom: 36,
              borderBottom: '1px solid var(--clr-border)',
              width: '100%', justifyContent: 'flex-start',
              background: 'transparent', borderRadius: 0,
            }}
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 13 }}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* All → Carousel */}
          <TabsContent value="all">
            <ProjectCarousel items={projects} />
          </TabsContent>

          {/* Filtered → Card grid */}
          <TabsContent value="app">
            <ProjectGrid items={projects.filter((p) => p.category === 'app')} />
          </TabsContent>

          <TabsContent value="game">
            <ProjectGrid items={projects.filter((p) => p.category === 'game')} />
          </TabsContent>

          <TabsContent value="client">
            <ProjectGrid items={projects.filter((p) => p.category === 'client')} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function ProjectGrid({ items }: { items: typeof projects }) {
  if (items.length === 0) {
    return (
      <p style={{ fontSize: 14, color: 'var(--clr-muted)', padding: '40px 0', fontFamily: 'var(--font-geist-mono)' }}>
        // no projects in this category yet
      </p>
    );
  }
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: 20,
    }}>
      {items.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
