import { prisma } from '@/lib/db';
import type { ApplicationStatus } from '@/types';

export interface DashboardMetrics {
  total: number;
  statusCounts: Record<ApplicationStatus, number>;
  successRate: number;
  topCompanies: Array<{ company: string; count: number }>;
}

export async function getDashboardMetrics(userId: string): Promise<DashboardMetrics> {
  const applications = await prisma.jobApplication.findMany({ where: { userId } });
  const total = applications.length;
  const statusCounts = applications.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] ?? 0) + 1;
      return acc;
    },
    {
      APPLIED: 0,
      INTERVIEW: 0,
      REJECTED: 0,
      OFFER: 0,
      WITHDRAWN: 0
    } as Record<ApplicationStatus, number>
  );

  const successRate = total === 0 ? 0 : Math.round(((statusCounts.OFFER + statusCounts.INTERVIEW) / total) * 100);
  const topCompanies = Object.entries(
    applications.reduce((acc, application) => {
      acc[application.company] = (acc[application.company] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([company, count]) => ({ company, count }));

  return { total, statusCounts, successRate, topCompanies };
}
