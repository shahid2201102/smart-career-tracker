import { SelectHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(({ className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={clsx(
        'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-slate-100 dark:focus:ring-slate-800',
        className
      )}
      {...props}
    />
  );
});

Select.displayName = 'Select';
export { Select };
