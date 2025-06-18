import { NextRequest, NextResponse } from 'next/server';
import { localApps } from '@/lib/local-apps';

const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';

export async function GET(request: NextRequest) {
  const token = request.headers.get('authorization');
  try {
    const url = `${backendUrl}/internal/api/v1/apps${request.nextUrl.search}`;
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = token;
    }
    const res = await fetch(url, { headers });
    if (res.ok) {
      return new NextResponse(res.body, {
        status: res.status,
        headers: res.headers,
      });
    }
    throw new Error(`Backend error: ${res.status}`);
  } catch (error: any) {
    return NextResponse.json({ data: localApps }, { status: 200 });
  }
}
