import { NextRequest, NextResponse } from 'next/server'
import { MOCK_QUESTIONS, mockTimestamps } from '../../../../../_mock-data'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string; questionId: string }> },
) {
  const { testId, questionId } = await params
  const body = await request.json()
  const question = (MOCK_QUESTIONS[testId] ?? []).find((q) => q.id === questionId)
  return NextResponse.json({
    id: questionId,
    testId,
    ...question,
    ...body,
    ...mockTimestamps(question?.createdAt),
  })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ testId: string; questionId: string }> },
) {
  await params
  return new NextResponse(null, { status: 204 })
}
