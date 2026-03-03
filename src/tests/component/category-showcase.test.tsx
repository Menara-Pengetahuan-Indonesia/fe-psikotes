import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { CategoryShowcase } from '@/features/psikotes/components/category-showcase'

describe('CategoryShowcase', () => {
  it('renders section heading', () => {
    render(<CategoryShowcase />)
    expect(screen.getByText(/Tumbuh Bersama/)).toBeInTheDocument()
  })

  it('renders BERMOELA brand text', () => {
    render(<CategoryShowcase />)
    expect(screen.getByText('BERMOELA')).toBeInTheDocument()
  })

  it('renders badge label', () => {
    render(<CategoryShowcase />)
    expect(screen.getByText('Words of Growth')).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<CategoryShowcase />)
    expect(screen.getByText(/Setiap langkah kecil/)).toBeInTheDocument()
  })
})
