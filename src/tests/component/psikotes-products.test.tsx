import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

vi.mock('@/features/psikotes/hooks/use-public-packages', () => ({
  usePublicPackages: () => ({ data: [], isLoading: false }),
}))

import { PsikotesProducts } from '@/features/psikotes/components/psikotes-products'

function wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>
}

describe('PsikotesProducts', () => {
  it('renders section heading', () => {
    render(<PsikotesProducts />, { wrapper })
    expect(screen.getByText(/Ambil Senjata/)).toBeInTheDocument()
  })

  it('renders bottom CTA heading', () => {
    render(<PsikotesProducts />, { wrapper })
    expect(screen.getByText(/Masih Bingung/)).toBeInTheDocument()
  })

  it('renders bottom CTA button', () => {
    render(<PsikotesProducts />, { wrapper })
    expect(screen.getByText('Mulai Analisis Sekarang')).toBeInTheDocument()
  })

  it('renders empty state when no packages', () => {
    render(<PsikotesProducts />, { wrapper })
    expect(screen.queryByText('Semua Produk')).not.toBeInTheDocument()
  })
})
