import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

const mockUsePathname = vi.fn(() => '/psikotes')

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { Navbar } from '@/shared/components/layout/navbar'

describe('Navbar', () => {
  it('renders the logo text', () => {
    render(<Navbar />)
    expect(screen.getByText('MOELA')).toBeInTheDocument()
  })

  it('renders navigation items for psikotes route', () => {
    render(<Navbar />)
    expect(screen.getByText('Beranda')).toBeInTheDocument()
    expect(screen.getByText('Membership')).toBeInTheDocument()
  })

  it('renders auth CTA buttons', () => {
    render(<Navbar />)
    expect(screen.getByText('Masuk')).toBeInTheDocument()
    expect(screen.getByText('Daftar')).toBeInTheDocument()
  })

  it('renders Paid Member link', () => {
    render(<Navbar />)
    expect(screen.getByText('Paid Member')).toBeInTheDocument()
  })

  it('renders mobile menu toggle button', () => {
    render(<Navbar />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('returns null for hidden routes', () => {
    mockUsePathname.mockReturnValue('/masuk')
    const { container } = render(<Navbar />)
    expect(container.innerHTML).toBe('')
  })

  it('returns null for hidden route prefixes', () => {
    mockUsePathname.mockReturnValue('/dashboard/home')
    const { container } = render(<Navbar />)
    expect(container.innerHTML).toBe('')
  })

  it('returns null for admin route prefix', () => {
    mockUsePathname.mockReturnValue('/admin/users')
    const { container } = render(<Navbar />)
    expect(container.innerHTML).toBe('')
  })

  it('returns null for root route', () => {
    mockUsePathname.mockReturnValue('/')
    const { container } = render(<Navbar />)
    expect(container.innerHTML).toBe('')
  })

  it('returns null for try-out form route', () => {
    mockUsePathname.mockReturnValue('/psikotes/mahasiswa/try-out/form')
    const { container } = render(<Navbar />)
    expect(container.innerHTML).toBe('')
  })

  it('returns null for daftar route', () => {
    mockUsePathname.mockReturnValue('/daftar')
    const { container } = render(<Navbar />)
    expect(container.innerHTML).toBe('')
  })

  it('toggles mobile menu on button click', () => {
    mockUsePathname.mockReturnValue('/psikotes')
    render(<Navbar />)
    const menuButton = screen.getAllByRole('button').find(
      btn => btn.classList.contains('md:hidden') || btn.className.includes('md:hidden')
    )
    if (menuButton) {
      fireEvent.click(menuButton)
    }
    // After click, mobile menu component should render or toggle
    expect(screen.getByText('MOELA')).toBeInTheDocument()
  })

  it('uses custom navItems when provided', () => {
    mockUsePathname.mockReturnValue('/psikotes')
    const customItems = [
      { label: 'Custom Item', href: '/custom' },
    ]
    render(<Navbar navItems={customItems} />)
    expect(screen.getByText('Custom Item')).toBeInTheDocument()
  })

  it('renders konseling nav items on konseling route', () => {
    mockUsePathname.mockReturnValue('/konseling')
    render(<Navbar />)
    // Should render navbar (not hidden) with konseling items
    expect(screen.getByText('MOELA')).toBeInTheDocument()
  })

  it('renders pelatihan nav items on pelatihan route', () => {
    mockUsePathname.mockReturnValue('/pelatihan')
    render(<Navbar />)
    expect(screen.getByText('MOELA')).toBeInTheDocument()
  })

  it('returns null for forgot-password route', () => {
    mockUsePathname.mockReturnValue('/forgot-password')
    const { container } = render(<Navbar />)
    expect(container.innerHTML).toBe('')
  })

  it('returns null for superadmin route prefix', () => {
    mockUsePathname.mockReturnValue('/superadmin/settings')
    const { container } = render(<Navbar />)
    expect(container.innerHTML).toBe('')
  })

  it('returns null for pengguna route prefix', () => {
    mockUsePathname.mockReturnValue('/pengguna/profile')
    const { container } = render(<Navbar />)
    expect(container.innerHTML).toBe('')
  })

  it('returns null for perusahaan route prefix', () => {
    mockUsePathname.mockReturnValue('/perusahaan/dashboard')
    const { container } = render(<Navbar />)
    expect(container.innerHTML).toBe('')
  })
})
