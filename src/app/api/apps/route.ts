import { NextRequest, NextResponse } from 'next/server';
import App from '../../../../automat/packages/backend/src/models/app.js';

export async function GET(request: NextRequest) {
  try {
    const apps = await App.findAll();
    return NextResponse.json(apps);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
