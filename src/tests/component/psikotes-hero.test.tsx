import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PsikotesHero } from '@/features/psikotes/components'

describe('PsikotesHero', () => {
  it('renders the AI counsellor label', () => {
    render(<PsikotesHero />)
    expect(screen.getByText(/AI Counsellor/)).toBeInTheDocument()
  })

  it('renders the hero heading', () => {
    render(<PsikotesHero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Mental Health untuk Tumbuh dan/
    )
  })

  it('renders the updated hero description', () => {
    render(<PsikotesHero />)
    expect(
      screen.getByText(/Assessment psikologis berbasis riset sebagai titik mula menuju/)
    ).toBeInTheDocument()
    expect(screen.getByText(/"The New You"/)).toBeInTheDocument()
    expect(screen.getByText(/dan masa depan yang lebih terarah/)).toBeInTheDocument()
  })

  it('renders the diagnostic input area', () => {
    render(<PsikotesHero />)
    expect(
      screen.getByPlaceholderText(/Atau ceritakan langsung/)
    ).toBeInTheDocument()
  })

  it('renders the footer tagline', () => {
    render(<PsikotesHero />)
    expect(screen.getByText(/Semua bisa/)).toBeInTheDocument()
    expect(screen.getByText(/dari sini/)).toBeInTheDocument()
  })
})
