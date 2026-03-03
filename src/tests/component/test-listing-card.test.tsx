import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Brain } from 'lucide-react'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { TestListingCard } from '@/features/psikotes/components/test-listing-card'

const mockTest = {
  id: 'test-1',
  title: 'Tes Kepribadian MBTI',
  description: 'Kenali tipe kepribadianmu dengan tes MBTI.',
  category: 'mahasiswa',
  slug: 'mbti',
  icon: Brain,
  subCategory: 'Kepribadian',
  users: '1.2k',
  duration: '30 menit',
  price: 'Rp 50.000',
  tag: 'Popular',
}

describe('TestListingCard', () => {
  it('renders test title', () => {
    render(<TestListingCard test={mockTest} />)
    expect(screen.getByText('Tes Kepribadian MBTI')).toBeInTheDocument()
  })

  it('renders test description', () => {
    render(<TestListingCard test={mockTest} />)
    expect(screen.getByText(/Kenali tipe kepribadianmu/)).toBeInTheDocument()
  })

  it('renders subcategory badge', () => {
    render(<TestListingCard test={mockTest} />)
    expect(screen.getByText('Kepribadian')).toBeInTheDocument()
  })

  it('renders CTA link', () => {
    render(<TestListingCard test={mockTest} />)
    expect(screen.getByText('Lihat Detail')).toBeInTheDocument()
  })

  it('renders stats', () => {
    render(<TestListingCard test={mockTest} />)
    expect(screen.getByText('1.2k')).toBeInTheDocument()
    expect(screen.getByText('30 menit')).toBeInTheDocument()
  })
})
