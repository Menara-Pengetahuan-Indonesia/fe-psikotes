import { NextRequest, NextResponse } from 'next/server'
import { mockId, mockTimestamps } from '../../../../../../../_mock-data'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string; optionId: string }> },
) {
  const { optionId } = await params
  const body = await request.json()
  return NextResponse.json({
    id: mockId(),
    optionId,
    ...body,
    ...mockTimestamps(),
  }, { status: 201 })
}
