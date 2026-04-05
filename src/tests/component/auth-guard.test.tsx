import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/mahasiswa',
}))

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

let mockAuthState = {
  isAuthenticated: true,
  _hasHydrated: true,
}

vi.mock('@/store/auth.store', () => ({
  useAuthStoreHydrated: () => mockAuthState,
}))

import { AuthGuard } from '@/features/auth/components/auth-guard'

describe('AuthGuard', () => {
  it('renders children when authenticated', () => {
    mockAuthState = { isAuthenticated: true, _hasHydrated: true }
    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('shows login dialog when not authenticated', () => {
    mockAuthState = { isAuthenticated: false, _hasHydrated: true }
    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )
    expect(screen.getByText('Daftar Dulu, Yuk!')).toBeInTheDocument()
    expect(screen.getByText(/Daftar Sekarang/)).toBeInTheDocument()
  })

  it('shows login link in dialog', () => {
    mockAuthState = { isAuthenticated: false, _hasHydrated: true }
    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )
    expect(screen.getByText('Masuk')).toBeInTheDocument()
  })

  it('does not show dialog before hydration', () => {
    mockAuthState = { isAuthenticated: false, _hasHydrated: false }
    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )
    expect(screen.queryByText('Daftar Dulu, Yuk!')).not.toBeInTheDocument()
  })
})
