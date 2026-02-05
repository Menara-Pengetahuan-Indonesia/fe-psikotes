import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServiceGrid } from '@/features/psikotes/components/service-grid'

describe('ServiceGrid', () => {
  it('renders all 6 services in default tab', () => {
    render(<ServiceGrid />)
    expect(screen.getByText('Psikotes Online Premium')).toBeInTheDocument()
    expect(screen.getByText('Mentoring Satu Persen')).toBeInTheDocument()
    expect(screen.getByText('Konseling Psikolog')).toBeInTheDocument()
    expect(screen.getByText('Webinar Lifeskills')).toBeInTheDocument()
    expect(screen.getByText('Kelas Berlangganan')).toBeInTheDocument()
    expect(screen.getByText('Tes Karir & Minat Bakat')).toBeInTheDocument()
  })

  it('renders tab buttons', () => {
    render(<ServiceGrid />)
    expect(screen.getByText('Semua')).toBeInTheDocument()
    expect(screen.getByText('Psikotes')).toBeInTheDocument()
    expect(screen.getByText('Konseling')).toBeInTheDocument()
  })
})
