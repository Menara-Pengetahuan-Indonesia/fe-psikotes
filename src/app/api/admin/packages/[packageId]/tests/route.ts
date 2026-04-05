import { NextRequest, NextResponse } from 'next/server'
import { mockId, mockTimestamps } from '../../../../_mock-data'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ packageId: string }> },
) {
  const { packageId } = await params
  const body = await request.json()
  return NextResponse.json({
    id: mockId(),
    packageId,
    ...body,
    ...mockTimestamps(),
  }, { status: 201 })
}
