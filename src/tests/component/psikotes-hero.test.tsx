import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PsikotesHero } from '@/features/psikotes/components'

describe('PsikotesHero', () => {
  it('renders the transformation badge', () => {
    render(<PsikotesHero />)
    expect(screen.getByText('The New You Transformation')).toBeInTheDocument()
  })

  it('renders the hero heading', () => {
    render(<PsikotesHero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Mental Health untuk Tumbuh dan/
    )
  })

  it('renders the diagnostic input area', () => {
    render(<PsikotesHero />)
    expect(
      screen.getByPlaceholderText('Ceritakan kendala yang kamu rasakan saat ini...')
    ).toBeInTheDocument()
  })

  it('renders the footer tagline', () => {
    render(<PsikotesHero />)
    expect(screen.getByText(/Semua bisa/)).toBeInTheDocument()
    expect(screen.getByText(/dari sini/)).toBeInTheDocument()
  })
})
