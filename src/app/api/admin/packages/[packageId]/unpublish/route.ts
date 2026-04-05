import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PACKAGES, mockTimestamps } from '../../../../_mock-data'

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ packageId: string }> },
) {
  const { packageId } = await params
  const pkg = MOCK_PACKAGES.find((p) => p.id === packageId)
  if (!pkg) {
    return NextResponse.json({ message: 'Package not found' }, { status: 404 })
  }
  return NextResponse.json({ ...pkg, isPublished: false, ...mockTimestamps(pkg.createdAt) })
}
