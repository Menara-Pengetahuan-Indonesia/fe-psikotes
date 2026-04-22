import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { PsikotesTransformationMap } from '@/features/psikotes/components/psikotes-transformation-map'

describe('PsikotesTransformationMap', () => {
  it('renders section heading', () => {
    render(<PsikotesTransformationMap />)
    expect(screen.getByText(/Peta Perjalanan/)).toBeInTheDocument()
  })

  it('renders badge text', () => {
    render(<PsikotesTransformationMap />)
    expect(screen.getByText('Transformation Journey')).toBeInTheDocument()
  })

  it('renders social proof', () => {
    render(<PsikotesTransformationMap />)
    expect(screen.getByText('+10k Jiwa yang Tumbuh')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<PsikotesTransformationMap />)
    expect(screen.getByText(/Empat langkah kunci/)).toBeInTheDocument()
  })

  it('renders all 4 journey items', () => {
    render(<PsikotesTransformationMap />)
    expect(screen.getByText('Pemetaan Diri')).toBeInTheDocument()
    expect(screen.getByText('Masa Depan')).toBeInTheDocument()
    expect(screen.getByText('Konsultasi & Layanan')).toBeInTheDocument()
    expect(screen.getByText('Bergabung Komunitas')).toBeInTheDocument()
  })

  it('renders solusi section with 6 items', () => {
    render(<PsikotesTransformationMap />)
    expect(screen.getByText('Solusi')).toBeInTheDocument()
    expect(screen.getByText('Psikotes & Asesmen')).toBeInTheDocument()
    expect(screen.getByText('Konseling Psikologis')).toBeInTheDocument()
    expect(screen.getByText('Live Coaching')).toBeInTheDocument()
    expect(screen.getByText('Trauma & Support Group')).toBeInTheDocument()
    expect(screen.getByText('Komunitas')).toBeInTheDocument()
    expect(screen.getByText('Pelatihan')).toBeInTheDocument()
  })

  it('renders solusi heading', () => {
    render(<PsikotesTransformationMap />)
    expect(screen.getByText(/Layanan/i, { selector: 'h2' })).toBeInTheDocument()
  })

  it('renders step titles', () => {
    render(<PsikotesTransformationMap />)
    const headings = screen.getAllByRole('heading', { level: 4 })
    expect(headings.length).toBe(10)
  })
})
