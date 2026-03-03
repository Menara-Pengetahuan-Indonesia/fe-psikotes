import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { PsikotesFaq } from '@/features/psikotes/components/psikotes-faq'

describe('PsikotesFaq', () => {
  it('renders FAQ heading', () => {
    render(<PsikotesFaq />)
    expect(screen.getByText('Pertanyaan')).toBeInTheDocument()
    expect(screen.getByText('Umum')).toBeInTheDocument()
  })

  it('renders Help Center badge', () => {
    render(<PsikotesFaq />)
    expect(screen.getByText('Help Center')).toBeInTheDocument()
  })

  it('renders FAQ items', () => {
    render(<PsikotesFaq />)
    // Should render multiple FAQ buttons
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })
})
