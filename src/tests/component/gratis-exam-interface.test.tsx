import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { ExamInterface } from '@/features/psikotes/gratis/components/exam-interface'

const mockQuestions = [
  {
    id: 1,
    question: 'Apa yang paling menggambarkan dirimu?',
    options: [
      { label: 'A', text: 'Suka tantangan' },
      { label: 'B', text: 'Suka ketenangan' },
    ],
  },
  {
    id: 2,
    question: 'Bagaimana cara kamu menyelesaikan masalah?',
    options: [
      { label: 'A', text: 'Analisis mendalam' },
      { label: 'B', text: 'Intuisi' },
    ],
  },
  {
    id: 3,
    question: 'Apa motivasi utamamu?',
    options: [
      { label: 'A', text: 'Pencapaian' },
      { label: 'B', text: 'Kebahagiaan' },
    ],
  },
]

describe('ExamInterface (gratis)', () => {
  it('renders first question', () => {
    render(<ExamInterface questions={mockQuestions} />)
    expect(screen.getByText('Apa yang paling menggambarkan dirimu?')).toBeInTheDocument()
  })

  it('renders answer options', () => {
    render(<ExamInterface questions={mockQuestions} />)
    expect(screen.getByText('Suka tantangan')).toBeInTheDocument()
    expect(screen.getByText('Suka ketenangan')).toBeInTheDocument()
  })

  it('renders navigation buttons', () => {
    render(<ExamInterface questions={mockQuestions} />)
    expect(screen.getByText('Sebelumnya')).toBeInTheDocument()
    expect(screen.getByText('Selanjutnya')).toBeInTheDocument()
  })

  it('renders progress info', () => {
    render(<ExamInterface questions={mockQuestions} />)
    expect(screen.getByText(/Soal 1/)).toBeInTheDocument()
  })

  it('disables back button on first question', () => {
    render(<ExamInterface questions={mockQuestions} />)
    const backBtn = screen.getByText('Sebelumnya')
    expect(backBtn).toBeDisabled()
  })

  it('disables next button when no option selected', () => {
    render(<ExamInterface questions={mockQuestions} />)
    const nextBtn = screen.getByText('Selanjutnya')
    expect(nextBtn).toBeDisabled()
  })

  it('selects an option and enables next button', () => {
    render(<ExamInterface questions={mockQuestions} />)
    fireEvent.click(screen.getByText('Suka tantangan'))
    const nextBtn = screen.getByText('Selanjutnya')
    expect(nextBtn).not.toBeDisabled()
  })

  it('navigates to next question after selecting an option', () => {
    render(<ExamInterface questions={mockQuestions} />)
    fireEvent.click(screen.getByText('Suka tantangan'))
    fireEvent.click(screen.getByText('Selanjutnya'))

    expect(screen.getByText('Bagaimana cara kamu menyelesaikan masalah?')).toBeInTheDocument()
  })

  it('enables back button on second question', () => {
    render(<ExamInterface questions={mockQuestions} />)
    fireEvent.click(screen.getByText('Suka tantangan'))
    fireEvent.click(screen.getByText('Selanjutnya'))

    const backBtn = screen.getByText('Sebelumnya')
    expect(backBtn).not.toBeDisabled()
  })

  it('navigates back to previous question', () => {
    render(<ExamInterface questions={mockQuestions} />)
    fireEvent.click(screen.getByText('Suka tantangan'))
    fireEvent.click(screen.getByText('Selanjutnya'))
    fireEvent.click(screen.getByText('Sebelumnya'))

    expect(screen.getByText('Apa yang paling menggambarkan dirimu?')).toBeInTheDocument()
  })

  it('preserves answer when navigating back', () => {
    render(<ExamInterface questions={mockQuestions} />)
    fireEvent.click(screen.getByText('Suka tantangan'))
    fireEvent.click(screen.getByText('Selanjutnya'))
    fireEvent.click(screen.getByText('Sebelumnya'))

    // Next button should still be enabled because previous answer is preserved
    const nextBtn = screen.getByText('Selanjutnya')
    expect(nextBtn).not.toBeDisabled()
  })

  it('shows "Selesai & Kirim" on last question', () => {
    render(<ExamInterface questions={mockQuestions} />)

    // Navigate to last question
    fireEvent.click(screen.getByText('Suka tantangan'))
    fireEvent.click(screen.getByText('Selanjutnya'))
    fireEvent.click(screen.getByText('Analisis mendalam'))
    fireEvent.click(screen.getByText('Selanjutnya'))

    expect(screen.getByText('Selesai & Kirim')).toBeInTheDocument()
  })

  it('shows submit modal when clicking Selesai & Kirim', () => {
    render(<ExamInterface questions={mockQuestions} />)

    // Navigate to last question and select answer
    fireEvent.click(screen.getByText('Suka tantangan'))
    fireEvent.click(screen.getByText('Selanjutnya'))
    fireEvent.click(screen.getByText('Analisis mendalam'))
    fireEvent.click(screen.getByText('Selanjutnya'))
    fireEvent.click(screen.getByText('Pencapaian'))
    fireEvent.click(screen.getByText('Selesai & Kirim'))

    // Modal should appear
    expect(screen.getByText(/Selesaikan Tes/i)).toBeInTheDocument()
  })

  it('does not navigate when next is clicked without selection', () => {
    render(<ExamInterface questions={mockQuestions} />)
    fireEvent.click(screen.getByText('Selanjutnya'))

    // Should still be on first question
    expect(screen.getByText('Apa yang paling menggambarkan dirimu?')).toBeInTheDocument()
  })

  it('does not navigate back on first question', () => {
    render(<ExamInterface questions={mockQuestions} />)
    fireEvent.click(screen.getByText('Sebelumnya'))

    // Should still be on first question
    expect(screen.getByText('Apa yang paling menggambarkan dirimu?')).toBeInTheDocument()
  })

  it('preserves answer for next question when navigating back and forth', () => {
    render(<ExamInterface questions={mockQuestions} />)

    // Answer q1 and go to q2
    fireEvent.click(screen.getByText('Suka tantangan'))
    fireEvent.click(screen.getByText('Selanjutnya'))

    // Answer q2 and go to q3
    fireEvent.click(screen.getByText('Analisis mendalam'))
    fireEvent.click(screen.getByText('Selanjutnya'))

    // Go back to q2 - should have preserved answer
    fireEvent.click(screen.getByText('Sebelumnya'))
    const nextBtn = screen.getByText('Selanjutnya')
    expect(nextBtn).not.toBeDisabled()
  })
})
