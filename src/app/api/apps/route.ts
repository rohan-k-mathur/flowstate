import { NextRequest, NextResponse } from 'next/server';

const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';

export async function GET(request: NextRequest) {
  try {
    const url = `${backendUrl}/internal/api/v1/apps${request.nextUrl.search}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const apps = await res.json();

    return NextResponse.json(apps);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
