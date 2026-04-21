import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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

vi.mock('@/features/admin/hooks', () => ({
  usePackages: () => ({ data: [], isLoading: false }),
  useChildPackages: () => ({ data: [], isLoading: false }),
  usePackageTypes: () => ({ data: [], isLoading: false }),
  useTests: () => ({ data: [], isLoading: false }),
  useSubTests: () => ({ data: [], isLoading: false }),
  useQuestions: () => ({ data: [], isLoading: false }),
  useUsers: () => ({ data: [], isLoading: false }),
}))

import { AdminDashboard } from '@/features/dashboard/components/admin-dashboard'

function wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>
}

describe('AdminDashboard', () => {
  it('renders greeting with admin name', () => {
    render(<AdminDashboard />, { wrapper })
    expect(screen.getByText(/Halo, Admin/)).toBeInTheDocument()
  })

  it('renders Admin Panel label', () => {
    render(<AdminDashboard />, { wrapper })
    expect(screen.getByText('Admin Panel')).toBeInTheDocument()
  })

  it('renders hero CTA', () => {
    render(<AdminDashboard />, { wrapper })
    expect(screen.getByText('Kelola Tes')).toBeInTheDocument()
  })

  it('renders stats cards', () => {
    render(<AdminDashboard />, { wrapper })
    expect(screen.getByText('Tes')).toBeInTheDocument()
    expect(screen.getByText('User')).toBeInTheDocument()
    expect(screen.getByText('Soal')).toBeInTheDocument()
    expect(screen.getByText('Paket')).toBeInTheDocument()
  })

  it('renders quick actions sidebar', () => {
    render(<AdminDashboard />, { wrapper })
    expect(screen.getByText('Quick Actions')).toBeInTheDocument()
    expect(screen.getByText('Kelola User')).toBeInTheDocument()
  })
})
