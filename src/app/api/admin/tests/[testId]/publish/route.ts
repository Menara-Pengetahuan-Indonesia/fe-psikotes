import { NextRequest, NextResponse } from 'next/server'
import { MOCK_TESTS, mockTimestamps } from '../../../../_mock-data'

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ testId: string }> },
) {
  const { testId } = await params
  const test = MOCK_TESTS.find((t) => t.id === testId)
  if (!test) {
    return NextResponse.json({ message: 'Test not found' }, { status: 404 })
  }
  return NextResponse.json({ ...test, isPublished: true, ...mockTimestamps(test.createdAt) })
}
