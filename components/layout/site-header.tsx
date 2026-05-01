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

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
      <Link href="/" className="text-lg font-semibold text-slate-950 dark:text-white">
        Smart Career Tracker
      </Link>

      <div className="flex items-center gap-3">
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

        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[180px] truncate text-sm text-slate-500 dark:text-slate-400 sm:inline">{user.name}</span>
            <LogoutButton
              onLoggedOut={() => setUser(null)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white"
            />
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          aria-label="Toggle dark mode"
        >
          {mounted && theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
