import { NextRequest, NextResponse } from 'next/server'
import { MOCK_SECTIONS, mockTimestamps } from '../../../../../_mock-data'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string; sectionId: string }> },
) {
  const { testId, sectionId } = await params
  const body = await request.json()
  const section = (MOCK_SECTIONS[testId] ?? []).find((s) => s.id === sectionId)
  return NextResponse.json({
    id: sectionId,
    testId,
    ...section,
    ...body,
    ...mockTimestamps(section?.createdAt),
  })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ testId: string; sectionId: string }> },
) {
  await params
  return new NextResponse(null, { status: 204 })
}
