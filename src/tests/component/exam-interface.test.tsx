import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ExamInterface } from '@/features/psikotes/gratis/components/exam-interface'

describe('ExamInterface', () => {
  it('renders first question', () => {
    render(<ExamInterface />)
    expect(screen.getByText(/soal 1 dari/i)).toBeInTheDocument()
  })

  it('progress bar starts at first step', () => {
    render(<ExamInterface />)
    expect(screen.getByText(/soal 1 dari 3/i)).toBeInTheDocument()
  })

  it('next button is disabled without selecting answer', () => {
    render(<ExamInterface />)
    const nextBtn = screen.getByRole('button', { name: /selanjutnya/i })
    expect(nextBtn).toBeDisabled()
  })

  it('selecting an answer enables next button', async () => {
    const user = userEvent.setup()
    render(<ExamInterface />)

    // Click first answer option (the button containing label "A")
    const options = screen.getAllByRole('button').filter(
      (btn) => btn.textContent?.includes('A'),
    )
    if (options.length > 0) await user.click(options[0])

    await waitFor(() => {
      const nextBtn = screen.getByRole('button', { name: /selanjutnya/i })
      expect(nextBtn).not.toBeDisabled()
    })
  })

  it('previous button is disabled on first question', () => {
    render(<ExamInterface />)
    const prevBtn = screen.getByRole('button', { name: /sebelumnya/i })
    expect(prevBtn).toBeDisabled()
  })
})
