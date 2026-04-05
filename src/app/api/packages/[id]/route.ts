import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PACKAGES } from '../../_mock-data'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const pkg = MOCK_PACKAGES.find((p) => p.id === id)
  if (!pkg) {
    return NextResponse.json({ message: 'Package not found' }, { status: 404 })
  }
  return NextResponse.json(pkg)
}
