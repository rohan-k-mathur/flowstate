import { NextRequest, NextResponse } from 'next/server';

const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';

export async function GET(request: NextRequest, context: { params: { appKey: string } }) {
  const { appKey } = context.params;
  try {
    const url = `${backendUrl}/internal/api/v1/apps/${appKey}/actions`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const actions = await res.json();

    return NextResponse.json(actions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
