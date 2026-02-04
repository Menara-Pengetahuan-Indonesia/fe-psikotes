import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FileX } from 'lucide-react'
import { EmptyState } from '@/shared/components/feedback'

describe('EmptyState', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders title and description', () => {
    render(
      <EmptyState
        title="No results found"
        description="Try adjusting your search criteria"
      />
    )

    expect(screen.getByText('No results found')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your search criteria')).toBeInTheDocument()
  })

  it('renders action button when provided', () => {
    render(
      <EmptyState
        title="No results found"
        description="Try adjusting your search criteria"
        actionLabel="Add New"
        onAction={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: 'Add New' })).toBeInTheDocument()
  })

  it('calls onAction when clicked', async () => {
    const user = userEvent.setup()
    const handleAction = vi.fn()

    render(
      <EmptyState
        title="No results found"
        description="Try adjusting your search criteria"
        actionLabel="Add New"
        onAction={handleAction}
      />
    )

    const button = screen.getByRole('button', { name: 'Add New' })
    await user.click(button)

    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  it('renders custom icon when provided', () => {
    const { container } = render(
      <EmptyState
        title="No results found"
        description="Try adjusting your search criteria"
        icon={FileX}
      />
    )

    const iconElement = container.querySelector('svg')
    expect(iconElement).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <EmptyState
        title="No results found"
        description="Try adjusting your search criteria"
        className="custom-class"
      />
    )

    const emptyStateContainer = container.firstChild
    expect(emptyStateContainer).toHaveClass('custom-class')
  })
})
