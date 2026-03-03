import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}))

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

vi.mock('@/store/auth.store', () => ({
  useAuthStoreHydrated: () => ({
    user: { name: 'Test User', email: 'test@test.com', role: 'USER' },
    isAuthenticated: true,
  }),
}))

import { UserDashboard } from '@/features/dashboard/components/user-dashboard'

describe('UserDashboard', () => {
  it('renders greeting with user first name', () => {
    render(<UserDashboard />)
    expect(screen.getByText(/Halo, Test/)).toBeInTheDocument()
  })

  it('renders hero CTA button', () => {
    render(<UserDashboard />)
    expect(screen.getByText('Mulai Tes Baru')).toBeInTheDocument()
  })

  it('renders stats section', () => {
    render(<UserDashboard />)
    expect(screen.getByText('Rata-rata Skor')).toBeInTheDocument()
    expect(screen.getByText('Total Aktivitas')).toBeInTheDocument()
  })

  it('renders riwayat section', () => {
    render(<UserDashboard />)
    expect(screen.getByText('Riwayat')).toBeInTheDocument()
    expect(screen.getByText('Lihat Semua Hasil')).toBeInTheDocument()
  })

  it('renders service pillar links', () => {
    render(<UserDashboard />)
    expect(screen.getByText('Konseling')).toBeInTheDocument()
    expect(screen.getAllByText('Pelatihan').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Premium').length).toBeGreaterThanOrEqual(1)
  })
})
