import { describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { PageHeader } from '@/shared/components/layout/page-header'

describe('PageHeader Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders title', () => {
    render(<PageHeader title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<PageHeader title="Main Title" subtitle="Test Subtitle" />)
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('renders badge when provided', () => {
    render(<PageHeader title="Main Title" badge="Test Badge" />)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('centers by default', () => {
    render(<PageHeader title="Centered Title" />)
    const header = screen.getByText('Centered Title').closest('div')
    expect(header).toHaveClass('text-center')
  })

  it('left aligns when specified', () => {
    render(<PageHeader title="Left Title" align="left" />)
    const header = screen.getByText('Left Title').closest('div')
    expect(header).toHaveClass('text-left')
  })

  it('applies custom className', () => {
    render(<PageHeader title="Custom Title" className="custom-class" />)
    const header = screen.getByText('Custom Title').closest('div')
    expect(header).toHaveClass('custom-class')
  })
})
