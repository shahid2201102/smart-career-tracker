import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export const metadata: Metadata = {
  title: 'Smart Career Tracker',
  description: 'AI-powered career dashboard for application tracking, resume review, and interview preparation.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <SiteHeader />
            <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:px-8">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
