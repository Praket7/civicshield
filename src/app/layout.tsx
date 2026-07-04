import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CivicShield AI • Tenant Legal Defense + Institutional Watchdog',
  description: 'Hybrid RAG + Neo4j anomaly detection for housing justice. Upload eviction notices. Fight back with data-driven legal defenses. SDG 11 + SDG 16.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-zinc-950 text-zinc-100`}>
        {children}
      </body>
    </html>
  );
}
