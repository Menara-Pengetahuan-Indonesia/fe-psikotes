import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

let mockPathname = '/psikotes'

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}))

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { Footer } from '@/shared/components/layout/footer'

describe('Footer', () => {
  it('renders brand logo', () => {
    render(<Footer />)
    expect(screen.getByAltText('Bermoela')).toBeInTheDocument()
  })

  it('renders copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/Bermoela Indonesia/)).toBeInTheDocument()
  })

  it('renders tagline', () => {
    render(<Footer />)
    expect(screen.getByText(/Platform pengembangan diri/)).toBeInTheDocument()
  })

  it('renders "Dibuat dengan" text', () => {
    render(<Footer />)
    expect(screen.getByText(/Dibuat dengan/)).toBeInTheDocument()
  })

  it('returns null on hidden routes', () => {
    mockPathname = '/masuk'
    const { container } = render(<Footer />)
    expect(container.innerHTML).toBe('')
  })
})
