'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getErrorMessage } from '@/lib/error';
import { ResumeRecord } from '@/types';

export function ResumePanel() {
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [matchResult, setMatchResult] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadResumes() {
    const response = await fetch('/api/resumes');
    const data = await response.json();
    setResumes(data.resumes ?? []);
  }

  useEffect(() => {
    loadResumes();
  }, []);

  async function handleUpload(event: React.FormEvent) {
    event.preventDefault();
    setUploadError('');
    if (!file) {
      setUploadError('Please select your resume PDF.');
      return;
    }

    const formData = new FormData();
    formData.set('resume', file);
    setLoading(true);
    const response = await fetch('/api/resumes/upload', { method: 'POST', body: formData });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setUploadError(getErrorMessage(data.error, 'Upload failed.'));
      return;
    }
    await loadResumes();
  }

  async function handleJobMatch(resumeId: string) {
    if (!description) {
      setUploadError('Add a job description to match against.');
      return;
    }
    setLoading(true);
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeId, jobDescription: description })
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setUploadError(getErrorMessage(data.error, 'AI analysis failed.'));
      return;
    }
    setMatchResult(`Match score: ${data.analysis.matchScore}%. Missing keywords: ${data.analysis.missingKeywords.join(', ')}.`);
  }

  return (
    <div className="space-y-8">
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Resume manager</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">Upload your PDF resume, parse text content, and get instant AI-backed scoring.</p>
          {uploadError ? <p className="text-sm text-rose-600 dark:text-rose-300">{uploadError}</p> : null}
          <form className="grid gap-4 md:grid-cols-[1.4fr_0.6fr]" onSubmit={handleUpload}>
            <Input type="file" accept="application/pdf" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
            <Button type="submit" disabled={loading} className="w-full">{loading ? 'Uploading...' : 'Upload PDF'}</Button>
          </form>
        </div>
      </Card>

      <Card className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Resume collection</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Each uploaded resume will be analyzed and scored automatically.</p>
        </div>
        {resumes.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No resumes uploaded yet.</p>
        ) : (
          <div className="grid gap-4">
            {resumes.map((resume) => (
              <div key={resume.id} className="rounded-3xl border border-slate-200 p-5 dark:border-slate-800">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-white">{resume.fileName}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Uploaded {new Date(resume.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">Score: {resume.score}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Job description matching</h3>
        <Textarea placeholder="Paste a job description to compare with your latest resume." value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className="flex flex-wrap gap-3">
          {resumes.slice(0, 1).map((resume) => (
            <Button key={resume.id} type="button" onClick={() => handleJobMatch(resume.id)} disabled={loading}>
              {`Analyze ${resume.fileName}`}
            </Button>
          ))}
        </div>
        {matchResult ? <p className="text-sm text-slate-600 dark:text-slate-300">{matchResult}</p> : null}
      </Card>
    </div>
  );
}
