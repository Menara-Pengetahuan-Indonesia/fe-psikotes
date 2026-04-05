import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PACKAGES, mockTimestamps } from '../../../_mock-data'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ packageId: string }> },
) {
  const { packageId } = await params
  const pkg = MOCK_PACKAGES.find((p) => p.id === packageId)
  if (!pkg) {
    return NextResponse.json({ message: 'Package not found' }, { status: 404 })
  }
  return NextResponse.json(pkg)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ packageId: string }> },
) {
  const { packageId } = await params
  const body = await request.json()
  const pkg = MOCK_PACKAGES.find((p) => p.id === packageId)
  if (!pkg) {
    return NextResponse.json({ message: 'Package not found' }, { status: 404 })
  }
  return NextResponse.json({ ...pkg, ...body, ...mockTimestamps(pkg.createdAt) })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ packageId: string }> },
) {
  await params
  return new NextResponse(null, { status: 204 })
}
