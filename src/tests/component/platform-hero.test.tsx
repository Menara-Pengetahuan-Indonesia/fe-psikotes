import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PlatformHero } from '@/features/platform/components/platform-hero'

describe('PlatformHero', () => {
  it('renders all 4 benefits', () => {
    render(<PlatformHero />)
    expect(screen.getByText('Analisis Mendalam')).toBeInTheDocument()
    expect(screen.getByText('Rekomendasi Personal')).toBeInTheDocument()
    expect(screen.getByText('Akses Mudah')).toBeInTheDocument()
    expect(screen.getByText('Laporan Detail')).toBeInTheDocument()
  })

  it('renders starting price', () => {
    render(<PlatformHero />)
    expect(screen.getByText('Rp25.000')).toBeInTheDocument()
  })

  it('renders CTA link to premium', () => {
    render(<PlatformHero />)
    const link = screen.getByText('Lihat Psikotes Premium')
    expect(link.closest('a')).toHaveAttribute('href', '/platform/psikotes/premium')
  })
})
