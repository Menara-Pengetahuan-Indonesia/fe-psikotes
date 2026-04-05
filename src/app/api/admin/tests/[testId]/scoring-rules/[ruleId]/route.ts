import { NextRequest, NextResponse } from 'next/server'
import { MOCK_SCORING_RULES, mockTimestamps } from '../../../../../_mock-data'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string; ruleId: string }> },
) {
  const { testId, ruleId } = await params
  const body = await request.json()
  const rule = (MOCK_SCORING_RULES[testId] ?? []).find((r) => r.id === ruleId)
  return NextResponse.json({
    id: ruleId,
    testId,
    ...rule,
    ...body,
    ...mockTimestamps(rule?.createdAt),
  })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ testId: string; ruleId: string }> },
) {
  await params
  return new NextResponse(null, { status: 204 })
}
