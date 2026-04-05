import { NextRequest, NextResponse } from 'next/server'
import { mockId, mockTimestamps } from '../../../../../../_mock-data'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string; questionId: string }> },
) {
  const { questionId } = await params
  const body = await request.json()
  return NextResponse.json({
    id: mockId(),
    questionId,
    ...body,
    mappings: [],
    ...mockTimestamps(),
  }, { status: 201 })
}
