import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { PhilosophySection } from '@/features/psikotes/components/philosophy-section'

describe('PhilosophySection', () => {
  it('renders section heading', () => {
    render(<PhilosophySection />)
    expect(screen.getByText(/Tumbuh Bahagia/)).toBeInTheDocument()
    expect(screen.getByText('Hidup Bermakna')).toBeInTheDocument()
  })

  it('renders badge', () => {
    render(<PhilosophySection />)
    expect(screen.getByText('Filosofi Kami')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<PhilosophySection />)
    expect(screen.getByText(/setiap individu memiliki potensi/)).toBeInTheDocument()
  })
})
