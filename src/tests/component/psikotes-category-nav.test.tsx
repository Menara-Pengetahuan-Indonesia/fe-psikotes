import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { PsikotesCategoryNav } from '@/features/psikotes/components/psikotes-category-nav'

describe('PsikotesCategoryNav', () => {
  it('renders section heading', () => {
    render(<PsikotesCategoryNav />)
    expect(screen.getByText(/Berhenti Berlari dari/)).toBeInTheDocument()
  })

  it('renders badge text', () => {
    render(<PsikotesCategoryNav />)
    expect(screen.getByText('Hadapi Titik Mulamu')).toBeInTheDocument()
  })

  it('renders solution labels', () => {
    render(<PsikotesCategoryNav />)
    expect(screen.getByText('Kondisi Saat Ini')).toBeInTheDocument()
    expect(screen.getByText('The New You Transformation')).toBeInTheDocument()
    expect(screen.getByText(/Solusi Terpadu/)).toBeInTheDocument()
  })

  it('renders CTA button', () => {
    render(<PsikotesCategoryNav />)
    expect(screen.getByText('Mulai Transformasi')).toBeInTheDocument()
  })
})
