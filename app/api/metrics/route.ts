import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/session';
import { getDashboardMetrics } from '@/services/analyticsService';

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const metrics = await getDashboardMetrics(session.id);
  return NextResponse.json(metrics);
}
