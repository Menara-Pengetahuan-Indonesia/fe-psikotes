import { describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { Section } from '@/shared/components/layout/section'

describe('Section Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders children', () => {
    render(
      <Section>
        <div>Test Content</div>
      </Section>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <Section title="Test Title">
        <div>Title Content</div>
      </Section>
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Test Title' })).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <Section description="Test Description">
        <div>Description Content</div>
      </Section>
    )
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Section className="custom-class">
        <div data-testid="custom-content">Custom Content</div>
      </Section>
    )
    const section = screen.getByTestId('custom-content').closest('section')
    expect(section).toHaveClass('custom-class')
  })

  it('renders with default spacing (py-16)', () => {
    render(
      <Section>
        <div data-testid="spacing-content">Spacing Content</div>
      </Section>
    )
    const section = screen.getByTestId('spacing-content').closest('section')
    expect(section).toHaveClass('py-16')
  })

  it('renders with responsive spacing (md:py-24)', () => {
    render(
      <Section>
        <div data-testid="responsive-content">Responsive Content</div>
      </Section>
    )
    const section = screen.getByTestId('responsive-content').closest('section')
    expect(section).toHaveClass('md:py-24')
  })

  it('renders container with correct classes', () => {
    render(
      <Section>
        <div data-testid="container-content">Container Content</div>
      </Section>
    )
    const container = screen.getByTestId('container-content').parentElement
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('mx-auto')
    expect(container).toHaveClass('px-6')
  })

  it('renders title and description together', () => {
    render(
      <Section title="Combined Title" description="Combined Description">
        <div data-testid="combined-content">Combined Content</div>
      </Section>
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Combined Title' })).toBeInTheDocument()
    expect(screen.getByText('Combined Description')).toBeInTheDocument()
    expect(screen.getByTestId('combined-content')).toBeInTheDocument()
  })
})
