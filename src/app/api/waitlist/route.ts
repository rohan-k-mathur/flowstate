import { NextRequest, NextResponse } from 'next/server'

export interface WaitlistEntry {
  name: string
  email: string
  date: string
}

const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000'

export async function GET() {
  try {
    const res = await fetch(`${backendUrl}/internal/api/v1/waitlist`)
    let data: WaitlistEntry[] = []
    if (res.ok) {
      data = await res.json()
    }
    return NextResponse.json({ data }, { status: res.status })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const res = await fetch(`${backendUrl}/internal/api/v1/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    let data: WaitlistEntry[] = []
    if (res.ok) {
      data = await res.json()
    }
    return NextResponse.json({ data }, { status: res.status })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
