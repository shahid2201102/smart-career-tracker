'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getErrorMessage } from '@/lib/error';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const body = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(getErrorMessage(body.error, 'Unable to sign in.'));
      return;
    }
    router.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Welcome back</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to access your career dashboard and resume AI tools.</p>
      {error ? <p className="rounded-2xl bg-rose-100 p-3 text-sm text-rose-700 dark:bg-rose-900/30 dark:text-rose-200">{error}</p> : null}
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
          <Input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@example.com" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
          <Input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Strong password" required />
        </div>
      </div>
      <Button type="submit" disabled={loading} className="w-full">{loading ? 'Signing in...' : 'Sign in'}</Button>
    </form>
  );
}
