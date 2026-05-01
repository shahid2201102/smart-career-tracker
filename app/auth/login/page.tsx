import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <section className="mx-auto grid max-w-4xl gap-10 px-6 py-10 sm:px-8">
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Sign in</p>
        <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Access your career outcomes dashboard</h1>
        <p className="max-w-2xl mx-auto text-sm leading-6 text-slate-600 dark:text-slate-300">
          Login to view your applications, resumes, and AI-backed insights. If you haven’t signed up yet, create an account now.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <LoginForm />
        <div className="rounded-3xl border border-slate-200 bg-slate-100 p-8 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Need an account?</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Start tracking your applications, score resumes, and improve your interview odds with AI coaching.
          </p>
          <Link href="/auth/signup" className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200">
            Create account
          </Link>
        </div>
      </div>
    </section>
  );
}
