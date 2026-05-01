import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/session';
import { analyzeJobMatch } from '@/services/resumeService';

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const resumeId = body.resumeId as string;
  const jobDescription = body.jobDescription as string;

  if (!resumeId || !jobDescription) {
    return NextResponse.json({ error: 'Missing input values' }, { status: 400 });
  }

  const analysis = await analyzeJobMatch(resumeId, jobDescription);
  return NextResponse.json({ analysis });
}
