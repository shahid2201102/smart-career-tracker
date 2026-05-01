import { PropsWithChildren } from 'react';
import { clsx } from 'clsx';

interface MetricCardProps extends PropsWithChildren {
  title: string;
  value: string | number;
  accent?: string;
}

export function MetricCard({ title, value, accent = 'bg-slate-100', children }: MetricCardProps) {
  return (
    <div className={clsx('rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-slate-800/80 dark:bg-slate-950', accent)}>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{value}</p>
      {children}
    </div>
  );
}
