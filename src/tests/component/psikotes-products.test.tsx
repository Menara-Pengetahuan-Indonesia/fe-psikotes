import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { PsikotesProducts } from '@/features/psikotes/components/psikotes-products'

describe('PsikotesProducts', () => {
  it('renders section heading', () => {
    render(<PsikotesProducts />)
    expect(screen.getByText(/Ambil Senjata/)).toBeInTheDocument()
  })

  it('renders premium badge', () => {
    render(<PsikotesProducts />)
    expect(screen.getByText('Premium Assessment')).toBeInTheDocument()
  })

  it('renders filter tabs', () => {
    render(<PsikotesProducts />)
    expect(screen.getByText('Semua Produk')).toBeInTheDocument()
    expect(screen.getByText('Diri Pribadi')).toBeInTheDocument()
    expect(screen.getByText('Relationship')).toBeInTheDocument()
  })

  it('renders bottom CTA', () => {
    render(<PsikotesProducts />)
    expect(screen.getByText(/Masih Bingung/)).toBeInTheDocument()
    expect(screen.getByText('Mulai Analisis Sekarang')).toBeInTheDocument()
  })
})
