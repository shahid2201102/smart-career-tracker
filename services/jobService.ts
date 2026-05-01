import { prisma } from '@/lib/db';
import { JobApplicationPayload } from '@/lib/validators';

export async function getJobApplications(userId: string, page = 1, query?: string, status?: string) {
  const itemsPerPage = 10;
  const filter: any = { userId };

  if (status) {
    filter.status = status;
  }

  if (query) {
    filter.OR = [
      { company: { contains: query, mode: 'insensitive' } },
      { role: { contains: query, mode: 'insensitive' } },
      { notes: { contains: query, mode: 'insensitive' } }
    ];
  }

  const [items, total] = await Promise.all([
    prisma.jobApplication.findMany({
      where: filter,
      orderBy: { postedAt: 'desc' },
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage
    }),
    prisma.jobApplication.count({ where: filter })
  ]);

  return {
    items,
    total,
    page,
    totalPages: Math.ceil(total / itemsPerPage)
  };
}

export async function createJobApplication(userId: string, payload: JobApplicationPayload) {
  return prisma.jobApplication.create({
    data: {
      company: payload.company,
      role: payload.role,
      status: payload.status,
      location: payload.location,
      salary: payload.salary,
      deadline: payload.deadline ? new Date(payload.deadline) : undefined,
      notes: payload.notes,
      userId
    }
  });
}

export async function updateJobApplication(id: string, userId: string, payload: Partial<JobApplicationPayload>) {
  return prisma.jobApplication.updateMany({
    where: { id, userId },
    data: {
      company: payload.company,
      role: payload.role,
      status: payload.status,
      location: payload.location,
      salary: payload.salary,
      deadline: payload.deadline ? new Date(payload.deadline) : undefined,
      notes: payload.notes
    }
  });
}

export async function deleteJobApplication(id: string, userId: string) {
  return prisma.jobApplication.deleteMany({ where: { id, userId } });
}
