import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { Breadcrumb } from '@/shared/components/layout/breadcrumb'

describe('Breadcrumb', () => {
  it('renders home link', () => {
    render(<Breadcrumb items={[]} />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/pengguna')
  })

  it('renders breadcrumb items with links', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Tes', href: '/pengguna/tes' },
          { label: 'Detail Tes' },
        ]}
      />
    )
    expect(screen.getByText('Tes')).toBeInTheDocument()
    expect(screen.getByText('Detail Tes')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Tes' })).toHaveAttribute('href', '/pengguna/tes')
  })

  it('renders last item as text (not link)', () => {
    render(
      <Breadcrumb items={[{ label: 'Current Page' }]} />
    )
    const currentPage = screen.getByText('Current Page')
    expect(currentPage.tagName).toBe('SPAN')
  })

  it('renders aria-label for accessibility', () => {
    render(<Breadcrumb items={[]} />)
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument()
  })
})
