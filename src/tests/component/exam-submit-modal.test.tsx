import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { ExamSubmitModal } from '@/features/psikotes/gratis/components/exam-submit-modal'

describe('ExamSubmitModal', () => {
  it('renders modal heading', () => {
    render(<ExamSubmitModal onCancel={vi.fn()} onConfirm={vi.fn()} />)
    expect(screen.getByText('Selesaikan Tes?')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<ExamSubmitModal onCancel={vi.fn()} onConfirm={vi.fn()} />)
    expect(screen.getByText(/Pastikan semua jawaban/)).toBeInTheDocument()
  })

  it('calls onCancel when Kembali clicked', async () => {
    const onCancel = vi.fn()
    const user = userEvent.setup()
    render(<ExamSubmitModal onCancel={onCancel} onConfirm={vi.fn()} />)
    await user.click(screen.getByText('Kembali'))
    expect(onCancel).toHaveBeenCalledOnce()
  })

  it('calls onConfirm when Ya, Kirim clicked', async () => {
    const onConfirm = vi.fn()
    const user = userEvent.setup()
    render(<ExamSubmitModal onCancel={vi.fn()} onConfirm={onConfirm} />)
    await user.click(screen.getByText('Ya, Kirim'))
    expect(onConfirm).toHaveBeenCalledOnce()
  })
})
