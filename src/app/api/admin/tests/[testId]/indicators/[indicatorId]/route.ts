import { NextRequest, NextResponse } from 'next/server'
import { MOCK_INDICATORS, mockTimestamps } from '../../../../../_mock-data'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string; indicatorId: string }> },
) {
  const { testId, indicatorId } = await params
  const body = await request.json()
  const indicator = (MOCK_INDICATORS[testId] ?? []).find((i) => i.id === indicatorId)
  return NextResponse.json({
    id: indicatorId,
    testId,
    ...indicator,
    ...body,
    ...mockTimestamps(indicator?.createdAt),
  })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ testId: string; indicatorId: string }> },
) {
  await params
  return new NextResponse(null, { status: 204 })
}
