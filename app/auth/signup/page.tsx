import Link from 'next/link';
import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <section className="mx-auto grid max-w-4xl gap-10 px-6 py-10 sm:px-8">
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Sign up</p>
        <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Launch your smart career plan</h1>
        <p className="max-w-2xl mx-auto text-sm leading-6 text-slate-600 dark:text-slate-300">
          Create your account to manage applications, upload resumes, and access AI-driven job matching suggestions.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <SignupForm />
        <div className="rounded-3xl border border-slate-200 bg-slate-100 p-8 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Already have an account?</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Sign in to continue building your portfolio, tracking job outcomes, and submitting stronger applications.
          </p>
          <Link href="/auth/login" className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
