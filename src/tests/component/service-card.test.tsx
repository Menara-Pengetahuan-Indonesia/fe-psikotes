import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Star } from 'lucide-react'
import { ServiceCard } from '@/features/psikotes/components/service-card'

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

  it('renders action label when provided', () => {
    render(
      <ServiceCard
        icon={Star}
        title="Test Service"
        description="Test description"
        actionLabel="Click Me"
        onAction={() => {}}
      />
    )

    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('calls onAction when card is clicked', async () => {
    const user = userEvent.setup()
    const handleAction = vi.fn()

    const { container } = render(
      <ServiceCard
        icon={Star}
        title="Test Service"
        description="Test description"
        actionLabel="Click Me"
        onAction={handleAction}
      />
    )

    // ServiceCard has onClick on the Card element itself
    const card = container.firstChild as HTMLElement
    await user.click(card)

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
