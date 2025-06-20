import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'waitlist.json')

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json()
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }
    const entry = { name, email, date: new Date().toISOString() }
    let data: any[] = []
    try {
      const file = await fs.readFile(filePath, 'utf8')
      data = JSON.parse(file)
    } catch {
      data = []
    }
    data.push(entry)
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
