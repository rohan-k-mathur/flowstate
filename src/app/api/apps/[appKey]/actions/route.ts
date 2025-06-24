import { NextRequest, NextResponse } from 'next/server';
import { localActions } from '@/lib/local-actions';

export const dynamic = 'force-dynamic';

const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';

export async function GET(
  request: NextRequest,
  { params }: { params: { appKey: string } }
) {
  const { appKey } = await params;
  const token = request.headers.get('authorization');
  try {
    const url = `${backendUrl}/internal/api/v1/apps/${appKey}/actions`;
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = token;
    }
    const res = await fetch(url, { headers });

    return new NextResponse(res.body, {
      status: res.status,
      headers: res.headers,
    });
  } catch (error: any) {
    const fallback = localActions[appKey] || [];
    return NextResponse.json({ data: fallback }, { status: 200 });
  }
}
