import { NextRequest, NextResponse } from 'next/server';

const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';

export async function GET(
  request: NextRequest,
  { params }: { params: { appKey: string } }
) {
  const { appKey } = await params;
  const token = request.headers.get('authorization');
  try {
    const url = `${backendUrl}/internal/api/v1/apps/${appKey}/triggers`;
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
