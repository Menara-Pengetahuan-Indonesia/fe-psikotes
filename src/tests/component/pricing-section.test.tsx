import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PricingSection } from '@/features/membership/components/pricing-section'

describe('PricingSection', () => {
  it('renders both plans', () => {
    render(<PricingSection />)
    expect(screen.getByText('Membership Lite')).toBeInTheDocument()
    expect(screen.getByText('Membership Pro')).toBeInTheDocument()
  })

  it('Pro plan has Most Popular badge', () => {
    render(<PricingSection />)
    expect(screen.getByText('Most Popular')).toBeInTheDocument()
  })

  it('renders correct prices', () => {
    render(<PricingSection />)
    expect(screen.getByText('Rp49k')).toBeInTheDocument()
    expect(screen.getByText('Rp99k')).toBeInTheDocument()
  })
})
