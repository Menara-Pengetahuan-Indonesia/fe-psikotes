import { NextRequest, NextResponse } from 'next/server'
import { getFullTest, MOCK_TESTS, mockTimestamps } from '../../../_mock-data'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ testId: string }> },
) {
  const { testId } = await params
  const test = getFullTest(testId)
  if (!test) {
    return NextResponse.json({ message: 'Test not found' }, { status: 404 })
  }
  return NextResponse.json(test)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> },
) {
  const { testId } = await params
  const body = await request.json()
  const test = MOCK_TESTS.find((t) => t.id === testId)
  if (!test) {
    return NextResponse.json({ message: 'Test not found' }, { status: 404 })
  }
  return NextResponse.json({ ...test, ...body, ...mockTimestamps(test.createdAt) })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ testId: string }> },
) {
  await params
  return new NextResponse(null, { status: 204 })
}
