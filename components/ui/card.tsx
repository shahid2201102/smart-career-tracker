import { PropsWithChildren } from 'react';
import { clsx } from 'clsx';

interface CardProps extends PropsWithChildren {
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx('rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-slate-800/70 dark:bg-slate-950', className)}>
      {children}
    </div>
  );
}
