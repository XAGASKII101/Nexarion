import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Auth API endpoint" })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ message: "Auth POST endpoint", body })
}
