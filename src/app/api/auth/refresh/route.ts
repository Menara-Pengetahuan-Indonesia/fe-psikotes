import { NextRequest, NextResponse } from 'next/server'

function generateMockToken(userId: string, type: 'access' | 'refresh') {
  const payload = Buffer.from(JSON.stringify({ sub: userId, type, iat: Date.now() })).toString('base64')
  return `mock-${type}-${payload}`
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { refreshToken } = body

  if (!refreshToken || !refreshToken.startsWith('mock-refresh-')) {
    return NextResponse.json(
      { statusCode: 401, message: 'Invalid refresh token', error: 'Unauthorized' },
      { status: 401 },
    )
  }

  try {
    const payload = JSON.parse(Buffer.from(refreshToken.replace('mock-refresh-', ''), 'base64').toString())
    return NextResponse.json({
      accessToken: generateMockToken(payload.sub, 'access'),
      refreshToken: generateMockToken(payload.sub, 'refresh'),
    })
  } catch {
    return NextResponse.json(
      { statusCode: 401, message: 'Invalid refresh token', error: 'Unauthorized' },
      { status: 401 },
    )
  }
}
