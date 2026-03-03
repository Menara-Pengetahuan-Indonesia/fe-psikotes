import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { QuestionRenderer } from '@/features/psikotes/components/QuestionRenderer'

const mcQuestion = {
  id: 'q1',
  text: 'Apa warna favorit?',
  type: 'MULTIPLE_CHOICE' as const,
  order: 1,
  options: [
    { id: 'o1', text: 'Merah', order: 1 },
    { id: 'o2', text: 'Biru', order: 2 },
  ],
}

const tfQuestion = {
  id: 'q2',
  text: 'Apakah bumi bulat?',
  type: 'TRUE_FALSE' as const,
  order: 2,
  options: [
    { id: 'o3', text: 'Benar', order: 1 },
    { id: 'o4', text: 'Salah', order: 2 },
  ],
}

const ratingQuestion = {
  id: 'q3',
  text: 'Seberapa puas Anda?',
  type: 'RATING_SCALE' as const,
  order: 3,
  options: [],
}

const essayQuestion = {
  id: 'q4',
  text: 'Jelaskan pendapat Anda.',
  type: 'ESSAY' as const,
  order: 4,
  options: [],
}

describe('QuestionRenderer', () => {
  it('renders multiple choice question', () => {
    render(<QuestionRenderer question={mcQuestion} onChange={vi.fn()} />)
    expect(screen.getByText('Apa warna favorit?')).toBeInTheDocument()
    expect(screen.getByText('Merah')).toBeInTheDocument()
    expect(screen.getByText('Biru')).toBeInTheDocument()
  })

  it('calls onChange on MC option click', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<QuestionRenderer question={mcQuestion} onChange={onChange} />)
    await user.click(screen.getByText('Merah'))
    expect(onChange).toHaveBeenCalledWith('o1')
  })

  it('renders true/false question', () => {
    render(<QuestionRenderer question={tfQuestion} onChange={vi.fn()} />)
    expect(screen.getByText('Apakah bumi bulat?')).toBeInTheDocument()
    expect(screen.getByText('Benar')).toBeInTheDocument()
    expect(screen.getByText('Salah')).toBeInTheDocument()
  })

  it('renders rating scale question', () => {
    render(<QuestionRenderer question={ratingQuestion} onChange={vi.fn()} />)
    expect(screen.getByText('Seberapa puas Anda?')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('renders essay question with textarea', () => {
    render(<QuestionRenderer question={essayQuestion} onChange={vi.fn()} />)
    expect(screen.getByText('Jelaskan pendapat Anda.')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Tulis jawaban/)).toBeInTheDocument()
  })
})
