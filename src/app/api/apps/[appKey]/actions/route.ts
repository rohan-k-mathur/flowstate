import { NextRequest, NextResponse } from 'next/server';
import App from '../../../../../../automat/packages/backend/src/models/app.js';

export async function GET(request: NextRequest, context: { params: { appKey: string } }) {
  const { appKey } = context.params;
  try {
    const actions = await App.findActionsByKey(appKey);
    return NextResponse.json(actions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
