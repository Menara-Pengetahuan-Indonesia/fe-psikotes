import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { CurriculumPyramid } from '@/features/psikotes/components/curriculum-pyramid'

describe('CurriculumPyramid', () => {
  it('renders section heading', () => {
    render(<CurriculumPyramid />)
    expect(screen.getByText('Kurikulum')).toBeInTheDocument()
    expect(screen.getByText('Pertumbuhan')).toBeInTheDocument()
  })

  it('renders badge text', () => {
    render(<CurriculumPyramid />)
    expect(screen.getByText('Growth Framework')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<CurriculumPyramid />)
    expect(screen.getByText(/Lima tingkatan pengembangan diri/)).toBeInTheDocument()
  })
})
