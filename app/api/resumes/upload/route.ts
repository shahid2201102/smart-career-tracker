import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/session';
import { saveResume } from '@/services/resumeService';
import pdf from 'pdf-parse';

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get('resume');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'Resume file is required' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const parsed = await pdf(buffer);
  if (!parsed || !parsed.text) {
    return NextResponse.json({ error: 'Could not parse PDF' }, { status: 422 });
  }

  const metadata = {
    fileName: file.name,
    fileSize: file.size,
    uploadUrl: `/uploads/${file.name}`,
    parsedText: parsed.text
  };

  const resume = await saveResume(session.id, metadata);
  return NextResponse.json({ resume });
}
