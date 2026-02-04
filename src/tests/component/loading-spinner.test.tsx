import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { LoadingSpinner } from '@/shared/components/feedback'

describe('LoadingSpinner', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders spinner with role status', () => {
    render(<LoadingSpinner />)

    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })

  it('renders with default medium size', () => {
    const { container } = render(<LoadingSpinner />)

    const spinnerElement = container.querySelector('.h-8')
    expect(spinnerElement).toBeInTheDocument()
    expect(spinnerElement).toHaveClass('w-8')
  })

  it('renders with small size', () => {
    const { container } = render(<LoadingSpinner size="sm" />)

    const spinnerElement = container.querySelector('.h-4')
    expect(spinnerElement).toBeInTheDocument()
    expect(spinnerElement).toHaveClass('w-4')
    expect(spinnerElement).toHaveClass('border-2')
  })

  it('renders with large size', () => {
    const { container } = render(<LoadingSpinner size="lg" />)

    const spinnerElement = container.querySelector('.h-12')
    expect(spinnerElement).toBeInTheDocument()
    expect(spinnerElement).toHaveClass('w-12')
    expect(spinnerElement).toHaveClass('border-4')
  })

  it('renders text when provided', () => {
    render(<LoadingSpinner text="Loading data..." />)

    expect(screen.getByText('Loading data...')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<LoadingSpinner className="custom-class" />)

    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('custom-class')
  })
})
