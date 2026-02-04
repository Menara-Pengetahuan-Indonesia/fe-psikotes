import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ErrorMessage } from '@/shared/components/feedback'

describe('ErrorMessage', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders message', () => {
    render(<ErrorMessage message="Something went wrong" />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <ErrorMessage
        title="Custom Error"
        message="Something went wrong"
      />
    )

    expect(screen.getByText('Custom Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders retry button when onRetry provided', () => {
    render(
      <ErrorMessage
        message="Something went wrong"
        onRetry={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument()
  })

  it('calls onRetry when clicked', async () => {
    const user = userEvent.setup()
    const handleRetry = vi.fn()

    render(
      <ErrorMessage
        message="Something went wrong"
        onRetry={handleRetry}
      />
    )

    const button = screen.getByRole('button', { name: 'Try Again' })
    await user.click(button)

    expect(handleRetry).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    const { container } = render(
      <ErrorMessage
        message="Something went wrong"
        className="custom-class"
      />
    )

    const errorContainer = container.firstChild
    expect(errorContainer).toHaveClass('custom-class')
  })
})
