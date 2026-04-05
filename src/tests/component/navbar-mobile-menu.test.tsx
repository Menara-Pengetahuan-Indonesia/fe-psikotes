import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { NavbarMobileMenu } from '@/shared/components/layout/navbar-mobile-menu'

const mockNavItems = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Kategori',
    children: [
      { label: 'Mahasiswa & Pelajar', href: '/mahasiswa', icon: 'BookOpen', desc: 'Tes minat bakat' },
      { label: 'Perusahaan', href: '/bisnis', icon: 'Building2', desc: 'Rekrutmen' },
    ],
  },
  { label: 'Membership', href: '/membership/benefit' },
]

describe('NavbarMobileMenu', () => {
  it('renders simple nav items as links', () => {
    render(<NavbarMobileMenu navItems={mockNavItems} onClose={vi.fn()} />)
    expect(screen.getByText('Beranda')).toBeInTheDocument()
    expect(screen.getByText('Membership')).toBeInTheDocument()
  })

  it('renders dropdown section label', () => {
    render(<NavbarMobileMenu navItems={mockNavItems} onClose={vi.fn()} />)
    expect(screen.getByText('Kategori')).toBeInTheDocument()
  })

  it('renders dropdown children', () => {
    render(<NavbarMobileMenu navItems={mockNavItems} onClose={vi.fn()} />)
    expect(screen.getByText('Mahasiswa & Pelajar')).toBeInTheDocument()
    expect(screen.getByText('Perusahaan')).toBeInTheDocument()
  })

  it('renders auth CTA buttons', () => {
    render(<NavbarMobileMenu navItems={mockNavItems} onClose={vi.fn()} />)
    expect(screen.getByText('Masuk')).toBeInTheDocument()
    expect(screen.getByText('Daftar Sekarang')).toBeInTheDocument()
  })
})
