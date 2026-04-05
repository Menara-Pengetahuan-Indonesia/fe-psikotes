import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ packageId: string; testId: string }> },
) {
  await params
  return new NextResponse(null, { status: 204 })
}
