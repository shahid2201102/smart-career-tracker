import { ApplicationsPanel } from '@/components/applications/applications-panel';

export default function ApplicationsPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Applications</p>
        <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Manage your job pipeline</h1>
        <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Log every opportunity, keep notes, and filter workflows by status so you know exactly where your job search stands.
        </p>
      </div>
      <ApplicationsPanel />
    </section>
  );
}
