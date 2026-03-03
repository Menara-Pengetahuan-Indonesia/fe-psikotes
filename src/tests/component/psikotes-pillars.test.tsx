import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { PsikotesPillars } from '@/features/psikotes/components/psikotes-pillars'

describe('PsikotesPillars', () => {
  it('renders section heading', () => {
    render(<PsikotesPillars />)
    expect(screen.getByText(/Semua Bisa/)).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<PsikotesPillars />)
    expect(screen.getByText(/Empat pilar transformasi/)).toBeInTheDocument()
  })

  it('renders detail section labels', () => {
    render(<PsikotesPillars />)
    expect(screen.getByText('Kendala / Masalah')).toBeInTheDocument()
    expect(screen.getByText('Produk')).toBeInTheDocument()
    expect(screen.getByText('Solusi')).toBeInTheDocument()
  })

  it('renders The New You Result section', () => {
    render(<PsikotesPillars />)
    expect(screen.getByText('The New You Result')).toBeInTheDocument()
  })
})
