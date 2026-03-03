import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { PsikotesFaqItem } from '@/features/psikotes/components/psikotes-faq-item'

describe('PsikotesFaqItem', () => {
  const defaultProps = {
    question: 'Apa itu psikotes?',
    answer: 'Psikotes adalah tes psikologi.',
    isOpen: false,
    onToggle: vi.fn(),
  }

  it('renders question text', () => {
    render(<PsikotesFaqItem {...defaultProps} />)
    expect(screen.getByText('Apa itu psikotes?')).toBeInTheDocument()
  })

  it('renders answer when open', () => {
    render(<PsikotesFaqItem {...defaultProps} isOpen={true} />)
    expect(screen.getByText('Psikotes adalah tes psikologi.')).toBeInTheDocument()
  })

  it('calls onToggle when clicked', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    render(<PsikotesFaqItem {...defaultProps} onToggle={onToggle} />)
    await user.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledOnce()
  })
})
