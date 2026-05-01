import { Card } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { getDashboardMetrics } from '@/services/analyticsService';
import { getServerSession } from '@/lib/session';
import { LogoutButton } from '@/components/auth/logout-button';

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-rose-700 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-200">
        <h1 className="text-xl font-semibold">Access denied</h1>
        <p className="mt-2 text-sm">Please sign in to view your dashboard.</p>
      </div>
    );
  }

  const metrics = await getDashboardMetrics(session.id);
  const statusEntries = Object.entries(metrics.statusCounts) as Array<[string, number]>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Dashboard</p>
          <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Your career momentum</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Insights are personalized from your active applications and AI resume optimization history.
          </p>
        </div>
        <LogoutButton className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white" />
      </div>

      <div className="grid gap-5 xl:grid-cols-4">
        <MetricCard title="Total applications" value={metrics.total} />
        <MetricCard title="Success rate" value={`${metrics.successRate}%`} />
        <MetricCard title="Interviews" value={metrics.statusCounts.INTERVIEW ?? 0} />
        <MetricCard title="Offers" value={metrics.statusCounts.OFFER ?? 0} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card>
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Status distribution</h2>
          <div className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-200">
            {statusEntries.map(([status, count]) => (
              <div key={status} className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
                <span>{status}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Top companies</h2>
          <div className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-200">
            {metrics.topCompanies.length === 0 ? (
              <p>No tracked companies yet.</p>
            ) : (
              metrics.topCompanies.map((item) => (
                <div key={item.company} className="rounded-3xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
                  <p className="font-medium text-slate-950 dark:text-white">{item.company}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.count} applications</p>
                </div>
              ))
            )}
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Quick advice</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Consistently update your resume after each interview. Use AI suggestions to align job bullet points with the role requirements.
          </p>
        </Card>
      </div>
    </div>
  );
}
