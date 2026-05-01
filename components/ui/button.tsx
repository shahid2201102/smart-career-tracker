import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-50 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-300',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
export { Button };
