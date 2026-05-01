'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getErrorMessage } from '@/lib/error';
import { JobApplication } from '@/types';

const STATUS_OPTIONS = ['APPLIED', 'INTERVIEW', 'REJECTED', 'OFFER', 'WITHDRAWN'] as const;

export function ApplicationsPanel() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [form, setForm] = useState({ company: '', role: '', status: 'APPLIED', location: '', salary: '', deadline: '', notes: '' });
  const [error, setError] = useState('');

  async function loadApplications() {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (statusFilter) params.set('status', statusFilter);
    const response = await fetch(`/api/applications?${params.toString()}`);
    const data = await response.json();
    setApplications(data.items ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadApplications();
  }, []);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, salary: form.salary ? Number(form.salary) : undefined })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(getErrorMessage(data.error, 'Unable to create application.'));
        return;
      }
      setForm({ company: '', role: '', status: 'APPLIED', location: '', salary: '', deadline: '', notes: '' });
      loadApplications();
    } catch (err) {
      setError('An error occurred while adding the application.');
    }
  }

  async function handleDelete(id: string) {
    await fetch('/api/applications', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    loadApplications();
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Job application tracker</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">Filter by status, search by company or role, and keep your pipeline updated.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-[220px]" />
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="max-w-[180px]">
                <option value="">All statuses</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Select>
              <Button type="button" onClick={loadApplications}>Refresh</Button>
            </div>
          </div>
        </Card>
        <Card className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Add an application</h3>
          {error ? <p className="text-sm text-rose-600 dark:text-rose-300">{error}</p> : null}
          <form className="space-y-4" onSubmit={handleCreate}>
            <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" required />
            <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role" required />
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </Select>
            <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" />
            <Input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} placeholder="Salary" type="number" />
            <Input value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} placeholder="Deadline (YYYY-MM-DD)" />
            <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes" />
            <Button type="submit" className="w-full">Save application</Button>
          </form>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Applications</h3>
        {loading ? (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">No applications tracked yet.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {applications.map((application) => (
              <div key={application.id} className="rounded-3xl border border-slate-200 p-5 dark:border-slate-800">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-950 dark:text-white">{application.company}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{application.role}</p>
                  </div>
                  <div className="space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>{application.status}</span>
                    {application.matchScore ? <span>Match {application.matchScore}%</span> : null}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  {application.location && <span>{application.location}</span>}
                  {application.salary && <span>${application.salary}</span>}
                  {application.deadline && <span>Deadline: {new Date(application.deadline).toLocaleDateString()}</span>}
                </div>
                {application.notes ? <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{application.notes}</p> : null}
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button type="button" className="bg-rose-600 hover:bg-rose-500" onClick={() => handleDelete(application.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
