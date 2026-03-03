import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { PsikotesJoinPractitioner } from '@/features/psikotes/components/psikotes-join-practitioner'

describe('PsikotesJoinPractitioner', () => {
  it('renders section heading', () => {
    render(<PsikotesJoinPractitioner />)
    expect(screen.getByText(/Berikan Solusi Bagi/)).toBeInTheDocument()
  })

  it('renders badge text', () => {
    render(<PsikotesJoinPractitioner />)
    expect(screen.getByText('Become a Solution Provider')).toBeInTheDocument()
  })

  it('renders feature cards', () => {
    render(<PsikotesJoinPractitioner />)
    expect(screen.getByText('Sertifikasi Resmi')).toBeInTheDocument()
    expect(screen.getByText('Komunitas Eksklusif')).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<PsikotesJoinPractitioner />)
    expect(screen.getByText('Gabung Sekarang')).toBeInTheDocument()
    expect(screen.getByText('Pelajari Alurnya')).toBeInTheDocument()
  })

  it('renders practitioner stats', () => {
    render(<PsikotesJoinPractitioner />)
    expect(screen.getByText('500+')).toBeInTheDocument()
    expect(screen.getByText('4.9/5')).toBeInTheDocument()
  })
})
