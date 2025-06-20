import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const res = await fetch(`${backendUrl}/internal/api/v1/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
