import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { connectionId: string } }
) {
  const { connectionId } = params
  const token = request.headers.get('authorization')
  try {
    const url = `${backendUrl}/internal/api/v1/connections/${connectionId}`
    const headers: HeadersInit = {}
    if (token) {
      headers['Authorization'] = token
    }
    const res = await fetch(url, { method: 'DELETE', headers })
    return new NextResponse(null, { status: res.status })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
