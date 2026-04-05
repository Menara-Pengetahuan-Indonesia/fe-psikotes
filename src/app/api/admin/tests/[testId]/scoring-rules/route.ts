import { NextRequest, NextResponse } from 'next/server'
import { MOCK_SCORING_RULES, mockId, mockTimestamps } from '../../../../_mock-data'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ testId: string }> },
) {
  const { testId } = await params
  return NextResponse.json(MOCK_SCORING_RULES[testId] ?? [])
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
    ...mockTimestamps(),
  }, { status: 201 })
}
