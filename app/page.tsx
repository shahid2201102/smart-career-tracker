import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            AI-powered career operations
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Track job applications, optimize resumes, and improve interview readiness with intelligent career insights.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Smart Career Tracker helps students and job seekers manage every opportunity with analytics, AI resume scoring, and role-specific recommendations.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/auth/signup">
              <Button>Get started</Button>
            </Link>
            <Link href="/auth/login" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              Already have an account?
            </Link>
          </div>
        </div>

        <Card className="space-y-6 bg-slate-950 text-white">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Career dashboard</p>
            <h2 className="text-2xl font-semibold">Understand your success signals</h2>
            <p className="text-sm leading-6 text-slate-300">
              See your application success rate, top companies, and resume strengths in one polished workspace.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Application success</p>
              <p className="mt-3 text-3xl font-semibold text-white">72%</p>
            </div>
            <div className="rounded-3xl bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Resume score</p>
              <p className="mt-3 text-3xl font-semibold text-white">84/100</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          { title: 'Track every application', content: 'Manage companies, interviews, deadlines, and offers in a centralized pipeline.' },
          { title: 'AI resume insights', content: 'Upload your resume, parse it, and get actionable scoring with suggestions.' },
          { title: 'Match to jobs', content: 'Compare resumes to job descriptions to improve ATS fit and landing rates.' }
        ].map((item) => (
          <Card key={item.title} className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{item.title}</h3>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item.content}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
