import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ testId: string; mappingId: string }> },
) {
  await params
  return new NextResponse(null, { status: 204 })
}
