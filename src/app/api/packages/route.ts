import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PACKAGES } from '../_mock-data'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const type = searchParams.get('type')

  let packages = MOCK_PACKAGES.filter((p) => p.isPublished)

  if (type === 'free') {
    packages = packages.filter((p) => p.price === 0)
  } else if (type === 'premium') {
    packages = packages.filter((p) => p.price > 0)
  }

  return NextResponse.json(packages)
}
