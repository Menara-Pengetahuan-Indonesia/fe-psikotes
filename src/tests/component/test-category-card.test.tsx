import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Compass } from 'lucide-react'
import { TestCategoryCard } from '@/features/psikotes/components/test-category-card'

describe('TestCategoryCard', () => {
  const mockTest = {
    id: 'test-1',
    slug: 'minat-bakat',
    title: 'Minat Bakat',
    tag: 'Career',
    icon: Compass,
    description: 'Test your interests and aptitudes.',
    users: '10k+',
    duration: '45 Min',
    price: 'Rp75.000',
    category: 'mahasiswa',
  }

  it('renders title and description', () => {
    render(<TestCategoryCard test={mockTest} number={1} href="/test" />)
    expect(screen.getByText('Minat Bakat')).toBeInTheDocument()
    expect(screen.getByText('Test your interests and aptitudes.')).toBeInTheDocument()
  })

  it('renders number badge', () => {
    render(<TestCategoryCard test={mockTest} number={1} href="/test" />)
    expect(screen.getByText('01')).toBeInTheDocument()
  })

  it('renders stats', () => {
    render(<TestCategoryCard test={mockTest} number={1} href="/test" />)
    expect(screen.getByText('10k+')).toBeInTheDocument()
    expect(screen.getByText('45 Min')).toBeInTheDocument()
    expect(screen.getByText('Rp75.000')).toBeInTheDocument()
  })

  it('renders CTA link', () => {
    render(<TestCategoryCard test={mockTest} number={1} href="/platform/psikotes/mahasiswa/minat-bakat" />)
    const link = screen.getByText('Lihat Detail')
    expect(link.closest('a')).toHaveAttribute('href', '/platform/psikotes/mahasiswa/minat-bakat')
  })
})
