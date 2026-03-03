import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/psikotes',
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
    // Mobile menu button is the one inside md:hidden div
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })
})
