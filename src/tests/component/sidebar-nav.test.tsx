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

vi.mock('@/features/auth/hooks', () => ({
  useLogout: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}))

// Mock the Sidebar components to simplify rendering
vi.mock('@/components/ui/sidebar', () => ({
  Sidebar: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div data-testid="sidebar" {...props}>{children}</div>,
  SidebarContent: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SidebarFooter: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SidebarHeader: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SidebarGroup: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SidebarGroupLabel: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SidebarMenu: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SidebarMenuButton: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  SidebarMenuItem: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SidebarRail: () => <div />,
}))

import { AppSidebar } from '@/features/dashboard/components/sidebar-nav'

describe('AppSidebar', () => {
  it('renders brand logo', () => {
    render(<AppSidebar />)
    expect(screen.getByText('MOELA')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(<AppSidebar />)
    expect(screen.getByText('Dasbor')).toBeInTheDocument()
    expect(screen.getByText('Tes Saya')).toBeInTheDocument()
    expect(screen.getByText('Riwayat Hasil')).toBeInTheDocument()
    expect(screen.getByText('Profil')).toBeInTheDocument()
  })

  it('renders user name in footer', () => {
    render(<AppSidebar />)
    expect(screen.getAllByText('Test User').length).toBeGreaterThanOrEqual(1)
  })

  it('renders navigation label', () => {
    render(<AppSidebar />)
    expect(screen.getByText('Navigation')).toBeInTheDocument()
  })
})
