import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/session';
import { getUserResumes, saveResume } from '@/services/resumeService';
import { resumeUploadSchema } from '@/lib/validators';
import { getErrorMessage } from '@/lib/error';

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const resumes = await getUserResumes(session.id);
  return NextResponse.json({ resumes });
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const result = resumeUploadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: getErrorMessage(result.error.flatten(), 'Invalid resume request.') }, { status: 422 });
  }
  const resume = await saveResume(session.id, result.data);
  return NextResponse.json({ resume });
}
