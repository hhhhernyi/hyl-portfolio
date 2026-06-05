'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from '@/components/shared/ProjectCard';
import type { Project } from '@/data/projects';

interface Props {
  items: Project[];
}

export default function ProjectCarousel({ items }: Props) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [autoplayPlugin.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div style={{ position: 'relative' }}>
      {/* Viewport */}
      <div ref={emblaRef} style={{ overflow: 'hidden' }}>
        <div className="embla__container" style={{ display: 'flex', gap: 20 }}>
          {items.map((project) => (
            <div
              key={project.id}
              className="embla__slide"
              style={{ flex: '0 0 100%', minWidth: 0 }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: 12, marginTop: 24,
      }}>
        <button
          onClick={scrollPrev}
          aria-label="Previous project"
          style={{
            width: 40, height: 40, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--clr-card)', border: '1px solid var(--clr-border)',
            color: 'var(--clr-muted)', cursor: 'pointer',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--clr-accent)'; e.currentTarget.style.borderColor = 'var(--clr-accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--clr-muted)'; e.currentTarget.style.borderColor = 'var(--clr-border)'; }}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 6 }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to project ${i + 1}`}
              style={{
                width: i === selectedIndex ? 20 : 6, height: 6,
                borderRadius: 99, border: 'none', cursor: 'pointer', padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
                background: i === selectedIndex ? 'var(--clr-accent)' : 'var(--clr-border)',
              }}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          aria-label="Next project"
          style={{
            width: 40, height: 40, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--clr-card)', border: '1px solid var(--clr-border)',
            color: 'var(--clr-muted)', cursor: 'pointer',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--clr-accent)'; e.currentTarget.style.borderColor = 'var(--clr-accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--clr-muted)'; e.currentTarget.style.borderColor = 'var(--clr-border)'; }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Responsive slide widths */}
      <style>{`
        @media (min-width: 640px)  { .embla__slide { flex: 0 0 calc(50% - 10px) !important; } }
        @media (min-width: 1024px) { .embla__slide { flex: 0 0 calc(33.333% - 14px) !important; } }
      `}</style>
    </div>
  );
}
