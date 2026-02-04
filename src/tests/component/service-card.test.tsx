import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Star } from 'lucide-react'
import { ServiceCard } from '@/shared/components/service-card'

describe('ServiceCard', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders title and description', () => {
    render(
      <ServiceCard
        icon={Star}
        title="Test Service"
        description="Test description"
      />
    )

    expect(screen.getByText('Test Service')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('renders icon', () => {
    const { container } = render(
      <ServiceCard
        icon={Star}
        title="Test Service"
        description="Test description"
      />
    )

    const iconElement = container.querySelector('svg')
    expect(iconElement).toBeInTheDocument()
  })

  it('renders price when provided', () => {
    render(
      <ServiceCard
        icon={Star}
        title="Test Service"
        description="Test description"
        price="Rp 100.000"
      />
    )

    expect(screen.getByText('Rp 100.000')).toBeInTheDocument()
  })

  it('renders tag when provided', () => {
    render(
      <ServiceCard
        icon={Star}
        title="Test Service"
        description="Test description"
        tag="Popular"
      />
    )

    expect(screen.getByText('Popular')).toBeInTheDocument()
  })

  it('renders action button when provided', () => {
    render(
      <ServiceCard
        icon={Star}
        title="Test Service"
        description="Test description"
        actionLabel="Click Me"
        onAction={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument()
  })

  it('calls onAction when clicked', async () => {
    const user = userEvent.setup()
    const handleAction = vi.fn()

    render(
      <ServiceCard
        icon={Star}
        title="Test Service"
        description="Test description"
        actionLabel="Click Me"
        onAction={handleAction}
      />
    )

    const button = screen.getByRole('button', { name: 'Click Me' })
    await user.click(button)

    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    const { container } = render(
      <ServiceCard
        icon={Star}
        title="Test Service"
        description="Test description"
        className="custom-class"
      />
    )

    const card = container.firstChild
    expect(card).toHaveClass('custom-class')
  })
})
