import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/admin/dashboard',
}))

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

vi.mock('@/store/auth.store', () => ({
  useAuthStoreHydrated: () => ({
    user: { name: 'Admin User', email: 'admin@test.com', role: 'ADMIN' },
    isAuthenticated: true,
  }),
}))

import { AdminDashboard } from '@/features/dashboard/components/admin-dashboard'

describe('AdminDashboard', () => {
  it('renders greeting with admin name', () => {
    render(<AdminDashboard />)
    expect(screen.getByText(/Halo, Admin/)).toBeInTheDocument()
  })

  it('renders Admin Panel label', () => {
    render(<AdminDashboard />)
    expect(screen.getByText('Admin Panel')).toBeInTheDocument()
  })

  it('renders hero CTA', () => {
    render(<AdminDashboard />)
    expect(screen.getByText('Kelola Tes')).toBeInTheDocument()
  })

  it('renders stats cards', () => {
    render(<AdminDashboard />)
    expect(screen.getByText('Total Tes')).toBeInTheDocument()
    expect(screen.getByText('Total Peserta')).toBeInTheDocument()
    expect(screen.getByText('Tes Aktif')).toBeInTheDocument()
    expect(screen.getByText('Hasil Tes')).toBeInTheDocument()
  })

  it('renders quick stats sidebar', () => {
    render(<AdminDashboard />)
    expect(screen.getByText('Quick Stats')).toBeInTheDocument()
    expect(screen.getByText('Tes Minggu Ini')).toBeInTheDocument()
    expect(screen.getByText('Peserta Baru')).toBeInTheDocument()
    expect(screen.getByText('Completion Rate')).toBeInTheDocument()
  })
})
