import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PsikotesHero } from '@/features/psikotes/components'

describe('PsikotesHero', () => {
  it('renders all 4 benefits', () => {
    render(<PsikotesHero />)
    expect(screen.getByText('Self-Awareness')).toBeInTheDocument()
    expect(screen.getByText('Good Pragmatism')).toBeInTheDocument()
    expect(screen.getByText('Continuous Growth')).toBeInTheDocument()
    expect(screen.getByText('Mental Resilience')).toBeInTheDocument()
  })

  it('renders starting price', () => {
    render(<PsikotesHero />)
    expect(screen.getByText('Rp25.000')).toBeInTheDocument()
  })

  it('renders CTA link to premium', () => {
    render(<PsikotesHero />)
    const link = screen.getByText(/mulai tes/i)
    expect(link.closest('a')).toHaveAttribute('href', '/psikotes/premium')
  })
})
