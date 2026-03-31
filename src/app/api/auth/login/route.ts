import { NextRequest, NextResponse } from 'next/server'

const MOCK_USERS = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-superadmin01',
    email: 'superadmin@example.com',
    password: 'Password123!',
    name: 'Super Admin',
    telp: '081111111111',
    role: 'SUPERADMIN' as const,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-admin0000001',
    email: 'admin@example.com',
    password: 'Password123!',
    name: 'Admin User',
    telp: '082222222222',
    role: 'ADMIN' as const,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-admin0000002',
    email: 'admin@kerjadiluar.id',
    password: 'Password123!',
    name: 'Admin Kerjadiluar',
    telp: '084444444444',
    role: 'ADMIN' as const,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-user00000001',
    email: 'user@example.com',
    password: 'Password123!',
    name: 'Regular User',
    telp: '083333333333',
    role: 'USER' as const,
  },
]

function generateMockToken(userId: string, type: 'access' | 'refresh') {
  const payload = Buffer.from(JSON.stringify({ sub: userId, type, iat: Date.now() })).toString('base64')
  return `mock-${type}-${payload}`
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json(
      { statusCode: 400, message: 'Email and password are required' },
      { status: 400 },
    )
  }

  const user = MOCK_USERS.find((u) => u.email === email)

  if (!user || user.password !== password) {
    return NextResponse.json(
      { statusCode: 401, message: 'Invalid credentials', error: 'Unauthorized' },
      { status: 401 },
    )
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    accessToken: generateMockToken(user.id, 'access'),
    refreshToken: generateMockToken(user.id, 'refresh'),
  })
}
