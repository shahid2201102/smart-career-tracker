export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50 py-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-sm text-slate-600 dark:text-slate-400 sm:flex-row sm:justify-between sm:px-8">
        <p>
          Built by SHAHID • GitHub:{' '}
          <a href="https://github.com/shahid2201102" target="_blank" rel="noreferrer" className="font-medium text-slate-900 underline decoration-slate-400 underline-offset-4 transition hover:text-slate-700 dark:text-slate-100 dark:decoration-slate-500 dark:hover:text-slate-300">
            github.com/shahid2201102
          </a>{' '}
          • LinkedIn:{' '}
          <a href="https://www.linkedin.com/in/mohd-shahid-548191328/" target="_blank" rel="noreferrer" className="font-medium text-slate-900 underline decoration-slate-400 underline-offset-4 transition hover:text-slate-700 dark:text-slate-100 dark:decoration-slate-500 dark:hover:text-slate-300">
            linkedin.com/in/mohd-shahid-548191328
          </a>
        </p>
        <p>Smart Career Tracker provides secure AI-powered resume insights and application analytics.</p>
      </div>
    </footer>
  );
}
