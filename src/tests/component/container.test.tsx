import { describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { Container } from '@/shared/components/layout/container'

describe('Container Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders children', () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('has max-w-7xl class', () => {
    render(
      <Container>
        <div data-testid="container-content">Content</div>
      </Container>
    )
    const container = screen.getByTestId('container-content').parentElement
    expect(container).toHaveClass('max-w-7xl')
  })

  it('has px-6 class for padding', () => {
    render(
      <Container>
        <div data-testid="padding-content">Padding Content</div>
      </Container>
    )
    const container = screen.getByTestId('padding-content').parentElement
    expect(container).toHaveClass('px-6')
  })

  it('applies custom className', () => {
    render(
      <Container className="custom-class">
        <div data-testid="custom-content">Custom Content</div>
      </Container>
    )
    const container = screen.getByTestId('custom-content').parentElement
    expect(container).toHaveClass('custom-class')
  })

  it('centers with mx-auto class', () => {
    render(
      <Container>
        <div data-testid="center-content">Center Content</div>
      </Container>
    )
    const container = screen.getByTestId('center-content').parentElement
    expect(container).toHaveClass('mx-auto')
  })
})
