import type { Metadata } from 'next';
import { Newsreader, Manrope } from 'next/font/google';
import '../../styles/globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Vincent Limardi',
  description: 'Portfolio of Vincent Limardi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased bg-zinc-950 text-zinc-100 selection:bg-white/20">
        {children}
      </body>
    </html>
  );
}
