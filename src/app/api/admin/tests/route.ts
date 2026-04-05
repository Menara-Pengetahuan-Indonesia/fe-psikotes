import { NextRequest, NextResponse } from 'next/server'
import { MOCK_TESTS, mockId, mockTimestamps } from '../../_mock-data'

export async function GET() {
  return NextResponse.json(MOCK_TESTS)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({
    id: mockId(),
    ...body,
    isPublished: false,
    ...mockTimestamps(),
  }, { status: 201 })
}
