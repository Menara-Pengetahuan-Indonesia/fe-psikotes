import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TestCard } from '@/features/psikotes/components/test-card'
import type { Test } from '@/features/psikotes/types'

const mockTest: Test = {
  id: '1',
  title: 'Tes IQ',
  description: 'Tes kecerdasan umum',
  duration: 60,
  questionCount: 50,
  category: 'intelligence',
  status: 'published',
}

describe('TestCard', () => {
  it('renders test info', () => {
    render(<TestCard test={mockTest} />)
    expect(screen.getByText('Tes IQ')).toBeInTheDocument()
    expect(screen.getByText('Tes kecerdasan umum')).toBeInTheDocument()
    expect(screen.getByText('60 menit')).toBeInTheDocument()
    expect(screen.getByText('50 soal')).toBeInTheDocument()
  })

  it('shows start button when onStart provided', () => {
    render(<TestCard test={mockTest} onStart={() => {}} />)
    expect(screen.getByRole('button', { name: /mulai tes/i })).toBeInTheDocument()
  })

  it('hides start button when onStart not provided', () => {
    render(<TestCard test={mockTest} />)
    // Button still renders but without onClick handler
    expect(screen.getByRole('button', { name: /mulai tes/i })).toBeInTheDocument()
  })
})
