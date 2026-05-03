'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { LogoutButton } from '@/components/auth/logout-button';

type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadSession() {
      try {
        const response = await fetch('/api/auth/me', { cache: 'no-store' });
        if (!response.ok) {
          if (isActive) setUser(null);
          return;
        }

        const data = (await response.json()) as { user?: SessionUser };
        if (isActive) setUser(data.user ?? null);
      } catch {
        if (isActive) setUser(null);
      }
    }

    loadSession();

    return () => {
      isActive = false;
    };
  }, []);

  if (!mounted) {
    return (
      <header className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
        <Link href="/" className="text-lg font-semibold text-slate-950 dark:text-white">
          Smart Career Tracker
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            <Moon size={18} />
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
      <Link href="/" className="text-lg font-semibold text-slate-950 dark:text-white">
        Smart Career Tracker
      </Link>

      <div className="flex items-center gap-3">
        {user && (
          <nav className="hidden gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
            <Link href="/dashboard" className="hover:text-slate-950 dark:hover:text-white">
              Dashboard
            </Link>
            <Link href="/applications" className="hover:text-slate-950 dark:hover:text-white">
              Applications
            </Link>
            <Link href="/resumes" className="hover:text-slate-950 dark:hover:text-white">
              Resumes
            </Link>
          </nav>
        )}

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {user && (
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[180px] truncate text-sm text-slate-500 dark:text-slate-400 sm:inline">{user.name}</span>
            <LogoutButton
              onLoggedOut={() => setUser(null)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white"
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          aria-label="Toggle dark mode"
        >
          {mounted && theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute right-6 top-full mt-2 w-48 rounded-md bg-white shadow-lg p-2 md:hidden dark:bg-slate-900">
          {user && (
            <>
              <Link href="/dashboard" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800" onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>
              <Link href="/applications" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800" onClick={() => setMobileOpen(false)}>
                Applications
              </Link>
              <Link href="/resumes" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800" onClick={() => setMobileOpen(false)}>
                Resumes
              </Link>
            </>
          )}
          {user ? (
            <div className="mt-2 border-t border-slate-100 pt-2 dark:border-slate-800">
              <div className="px-3 py-2 text-sm text-slate-600 dark:text-slate-400">{user.name}</div>
              <div className="px-3 py-2">
                <LogoutButton onLoggedOut={() => { setUser(null); setMobileOpen(false); }} />
              </div>
            </div>
          ) : null}
        </div>
      )}
    </header>
  );
}
