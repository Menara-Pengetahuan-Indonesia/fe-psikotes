import { NextRequest, NextResponse } from 'next/server'
import { MOCK_QUESTIONS, mockId, mockTimestamps } from '../../../../_mock-data'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ testId: string }> },
) {
  const { testId } = await params
  return NextResponse.json(MOCK_QUESTIONS[testId] ?? [])
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> },
) {
  const { testId } = await params
  const body = await request.json()
  return NextResponse.json({
    id: mockId(),
    testId,
    ...body,
    options: [],
    ...mockTimestamps(),
  }, { status: 201 })
}
