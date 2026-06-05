'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle,
} from '@/components/ui/sheet';
import { CONTACT } from '@/data/contact';

const navLinks = [
  { href: '#about',      label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects' },
  { href: '#contact',    label: 'Contact' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile  { display: none !important; }
        }
      `}</style>

      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background: scrolled
            ? 'color-mix(in srgb, var(--clr-bg) 88%, transparent)'
            : 'transparent',
          borderBottom: scrolled ? '1px solid var(--clr-border)' : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 24px',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo / Name */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: 14, fontWeight: 700,
              color: 'var(--clr-text)',
              letterSpacing: '-0.01em',
            }}>
              <span style={{ color: 'var(--clr-accent)' }}>&lt;</span>
              HernYiLee
              <span style={{ color: 'var(--clr-accent)' }}> /&gt;</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="nav-desktop" style={{ alignItems: 'center', gap: 4 }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  padding: '6px 14px', fontSize: 13, fontWeight: 500,
                  color: 'var(--clr-mid)', textDecoration: 'none', borderRadius: 6,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--clr-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--clr-mid)')}
              >
                {link.label}
              </a>
            ))}

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{
                  padding: 8, borderRadius: 8, background: 'none', border: 'none',
                  cursor: 'pointer', color: 'var(--clr-muted)',
                  transition: 'color 0.2s',
                  display: 'flex', alignItems: 'center',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--clr-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--clr-muted)')}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            {/* Download CV */}
            <a
              href={CONTACT.resume}
              download
              style={{
                marginLeft: 8,
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                background: 'var(--clr-accent)', color: '#050a14',
                textDecoration: 'none', transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <Download size={13} />
              Download CV
            </a>
          </nav>

          {/* ── Mobile: theme toggle + hamburger ── */}
          <div className="nav-mobile" style={{ alignItems: 'center', gap: 8 }}>
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{
                  padding: 8, borderRadius: 8, background: 'none', border: 'none',
                  cursor: 'pointer', color: 'var(--clr-muted)', display: 'flex',
                }}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon"
                    style={{ color: 'var(--clr-muted)' }}
                    aria-label="Open menu"
                  />
                }
              >
                <Menu size={20} />
              </SheetTrigger>
              <SheetContent side="right" style={{ background: 'var(--clr-bg)', borderLeft: '1px solid var(--clr-border)' }}>
                <SheetHeader>
                  <SheetTitle style={{ fontFamily: 'var(--font-geist-mono)', color: 'var(--clr-accent)' }}>
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '16px 0' }}>
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      style={{
                        display: 'block', padding: '14px 16px', fontSize: 16,
                        fontWeight: 500, color: 'var(--clr-text)', textDecoration: 'none',
                        borderBottom: '1px solid var(--clr-border)',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--clr-accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--clr-text)')}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href={CONTACT.resume}
                    download
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      margin: '16px', padding: '12px 20px', borderRadius: 8,
                      fontSize: 14, fontWeight: 600,
                      background: 'var(--clr-accent)', color: '#050a14',
                      textDecoration: 'none',
                    }}
                  >
                    <Download size={14} />
                    Download CV
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
