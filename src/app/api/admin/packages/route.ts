import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PACKAGES, mockId, mockTimestamps } from '../../_mock-data'

export async function GET() {
  return NextResponse.json(MOCK_PACKAGES)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({
    id: mockId(),
    ...body,
    isPublished: false,
    tests: [],
    ...mockTimestamps(),
  }, { status: 201 })
}
