import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/session';
import { getJobApplications, createJobApplication, updateJobApplication, deleteJobApplication } from '@/services/jobService';
import { jobApplicationSchema } from '@/lib/validators';
import { getErrorMessage } from '@/lib/error';

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') ?? '1');
  const query = url.searchParams.get('query') ?? undefined;
  const status = url.searchParams.get('status') ?? undefined;
  const data = await getJobApplications(session.id, page, query, status);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const result = jobApplicationSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: getErrorMessage(result.error.flatten(), 'Invalid application request.') }, { status: 422 });
  }

  const application = await createJobApplication(session.id, result.data);
  return NextResponse.json(application);
}

export async function PATCH(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const id = body.id as string;
  const payload = body.payload as Partial<typeof jobApplicationSchema['_type']>;
  if (!id) return NextResponse.json({ error: 'Missing application id' }, { status: 400 });

  const updated = await updateJobApplication(id, session.id, payload);
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const id = body.id as string;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const deleted = await deleteJobApplication(id, session.id);
  return NextResponse.json(deleted);
}
