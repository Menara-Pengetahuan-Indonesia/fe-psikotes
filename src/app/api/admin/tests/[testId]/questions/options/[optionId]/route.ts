import { NextRequest, NextResponse } from 'next/server'
import { mockTimestamps } from '../../../../../../_mock-data'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string; optionId: string }> },
) {
  const { optionId } = await params
  const body = await request.json()
  return NextResponse.json({
    id: optionId,
    ...body,
    ...mockTimestamps(),
  })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ testId: string; optionId: string }> },
) {
  await params
  return new NextResponse(null, { status: 204 })
}
