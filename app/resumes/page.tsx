import { ResumePanel } from '@/components/resumes/resume-panel';

export default function ResumesPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Resumes</p>
        <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Upload and optimize your resume</h1>
        <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Use AI-powered analysis to score your resume and match it to job descriptions for higher chances of success.
        </p>
      </div>
      <ResumePanel />
    </section>
  );
}
