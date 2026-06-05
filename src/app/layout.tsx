import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Dock from '@/components/layout/Dock';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hern Yi Lee — Software Engineer',
  description:
    'Portfolio of Hern Yi Lee, a Software Engineer passionate about building visually appealing UIs and bringing ideas to life.',
  keywords: ['software engineer', 'frontend', 'react', 'next.js', 'singapore', 'portfolio', 'hern yi lee'],
  authors: [{ name: 'Hern Yi Lee' }],
  openGraph: {
    title:       'Hern Yi Lee — Software Engineer',
    description: 'Software Engineer · UI Enthusiast · Builder of Random Ideas',
    type:        'website',
    siteName:    'Hern Yi Lee Portfolio',
  },
  twitter: {
    card:  'summary_large_image',
    title: 'Hern Yi Lee — Software Engineer',
    description: 'Software Engineer · UI Enthusiast · Builder of Random Ideas',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hern Yi Lee',
  jobTitle: 'Software Engineer',
  url: 'https://hyl.dev',         // TODO: update to your actual domain
  sameAs: [
    'https://www.linkedin.com/in/hern-yi-lee/',
    'https://github.com/hhhhernyi',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Dock />
        </ThemeProvider>
      </body>
    </html>
  );
}
