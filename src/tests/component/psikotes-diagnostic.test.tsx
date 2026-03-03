import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { PsikotesDiagnostic } from '@/features/psikotes/components/psikotes-diagnostic'

describe('PsikotesDiagnostic', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders input placeholder', () => {
    render(<PsikotesDiagnostic />)
    expect(screen.getByPlaceholderText(/Ceritakan kendala/)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<PsikotesDiagnostic />)
    expect(screen.getByText('Mulai Analisis')).toBeInTheDocument()
  })

  it('renders status badges', () => {
    render(<PsikotesDiagnostic />)
    expect(screen.getByText('Mental Health Insight')).toBeInTheDocument()
    expect(screen.getByText('Always Active')).toBeInTheDocument()
  })

  it('submit button is disabled when input is empty', () => {
    render(<PsikotesDiagnostic />)
    const btn = screen.getByText('Mulai Analisis')
    expect(btn).toBeDisabled()
  })

  it('enables submit button when input has value', () => {
    render(<PsikotesDiagnostic />)
    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Saya merasa stres' } })
    const btn = screen.getByText('Mulai Analisis')
    expect(btn).not.toBeDisabled()
  })

  it('transitions to thinking phase on submit', () => {
    render(<PsikotesDiagnostic />)
    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Saya merasa cemas' } })
    fireEvent.submit(textarea.closest('form')!)
    expect(screen.getByText('Merumuskan Solusi')).toBeInTheDocument()
  })

  it('transitions to result phase after thinking delay', () => {
    render(<PsikotesDiagnostic />)
    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Saya merasa cemas' } })
    fireEvent.submit(textarea.closest('form')!)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    // Should show result phase with first message response
    expect(screen.getByText(/Terima kasih sudah mau berbagi/)).toBeInTheDocument()
    expect(screen.getByText('Analisis & Respon AI')).toBeInTheDocument()
  })

  it('shows user message history in result phase', () => {
    render(<PsikotesDiagnostic />)
    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Saya merasa cemas' } })
    fireEvent.submit(textarea.closest('form')!)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(screen.getByText('Saya merasa cemas')).toBeInTheDocument()
    expect(screen.getByText('Riwayat Ceritamu')).toBeInTheDocument()
  })

  it('clears input after submission', () => {
    render(<PsikotesDiagnostic />)
    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Test message' } })
    fireEvent.submit(textarea.closest('form')!)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    // In result phase, the continue textarea should be empty
    const continueTextarea = screen.getByPlaceholderText('Ceritakan hal lain...')
    expect(continueTextarea).toHaveValue('')
  })

  it('allows continuing the conversation in result phase', () => {
    render(<PsikotesDiagnostic />)
    // First message
    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Pesan pertama' } })
    fireEvent.submit(textarea.closest('form')!)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    // Type second message
    const continueTextarea = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(continueTextarea, { target: { value: 'Pesan kedua' } })
    fireEvent.submit(continueTextarea.closest('form')!)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    // Should show second response
    expect(screen.getByText(/Saya mulai menangkap polanya/)).toBeInTheDocument()
  })

  it('shows third message response', () => {
    render(<PsikotesDiagnostic />)

    // Submit 3 messages to reach the third response
    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Pesan 1' } })
    fireEvent.submit(textarea.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    const t2 = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(t2, { target: { value: 'Pesan 2' } })
    fireEvent.submit(t2.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    const t3 = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(t3, { target: { value: 'Pesan 3' } })
    fireEvent.submit(t3.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    expect(screen.getByText(/Catatan saya semakin lengkap/)).toBeInTheDocument()
  })

  it('shows recommendation after 3+ messages', () => {
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Pesan 1' } })
    fireEvent.submit(textarea.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    const t2 = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(t2, { target: { value: 'Pesan 2' } })
    fireEvent.submit(t2.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    const t3 = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(t3, { target: { value: 'Pesan 3' } })
    fireEvent.submit(t3.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    // Should show recommendation
    expect(screen.getByText('Rekomendasi Solusi:')).toBeInTheDocument()
    expect(screen.getByText('Psikotes & Asesmen')).toBeInTheDocument()
  })

  it('shows intense recommendation for stressful content', () => {
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Pesan 1' } })
    fireEvent.submit(textarea.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    const t2 = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(t2, { target: { value: 'Pesan 2' } })
    fireEvent.submit(t2.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    // Third message with intense keywords - long text + "stres"
    const t3 = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(t3, { target: { value: 'Saya sangat stres dan depresi parah sekali rasanya tidak kuat lagi menjalani ini semua tolong bantu saya' } })
    fireEvent.submit(t3.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    // Should show konseling recommendation
    expect(screen.getByText('Konseling Profesional')).toBeInTheDocument()
  })

  it('shows no recommendation before 3 messages', () => {
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Pesan pertama' } })
    fireEvent.submit(textarea.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    // Should show placeholder instead of recommendation
    expect(screen.getByText(/AI sedang mendalami ceritamu/)).toBeInTheDocument()
  })

  it('resets to input phase when clicking reset', () => {
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Test' } })
    fireEvent.submit(textarea.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    const resetBtn = screen.getByText('Mulai Dari Awal')
    fireEvent.click(resetBtn)

    // Should be back to input phase
    expect(screen.getByText('Mulai Analisis')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Ceritakan kendala/)).toBeInTheDocument()
  })

  it('handles Enter key submission', () => {
    render(<PsikotesDiagnostic />)
    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Enter test' } })
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false })

    expect(screen.getByText('Merumuskan Solusi')).toBeInTheDocument()
  })

  it('does not submit on Shift+Enter', () => {
    render(<PsikotesDiagnostic />)
    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'No submit' } })
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true })

    // Should still be on input phase
    expect(screen.getByText('Mulai Analisis')).toBeInTheDocument()
  })

  it('does not submit when input is empty', () => {
    render(<PsikotesDiagnostic />)
    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.submit(textarea.closest('form')!)

    // Should still be on input phase
    expect(screen.getByText('Mulai Analisis')).toBeInTheDocument()
  })

  it('shows thinking indicator in chat when continuing', () => {
    render(<PsikotesDiagnostic />)

    // First message
    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Pesan 1' } })
    fireEvent.submit(textarea.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    // Second message - in thinking phase
    const t2 = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(t2, { target: { value: 'Pesan 2' } })
    fireEvent.submit(t2.closest('form')!)

    // Should show thinking text in chat
    expect(screen.getByText(/Bermoela sedang menganalisis/)).toBeInTheDocument()
  })

  it('shows status indicator in result phase', () => {
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Test' } })
    fireEvent.submit(textarea.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    expect(screen.getByText('Analisis Aktif')).toBeInTheDocument()
  })

  it('shows fourth message response', () => {
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Pesan 1' } })
    fireEvent.submit(textarea.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    for (let i = 2; i <= 4; i++) {
      const t = screen.getByPlaceholderText('Ceritakan hal lain...')
      fireEvent.change(t, { target: { value: `Pesan ${i}` } })
      fireEvent.submit(t.closest('form')!)
      act(() => { vi.advanceTimersByTime(1500) })
    }

    expect(screen.getByText(/fase transisi penting/)).toBeInTheDocument()
  })

  it('shows stres-related response after 5+ messages', () => {
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Pesan 1' } })
    fireEvent.submit(textarea.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    for (let i = 2; i <= 4; i++) {
      const t = screen.getByPlaceholderText('Ceritakan hal lain...')
      fireEvent.change(t, { target: { value: `Pesan ${i}` } })
      fireEvent.submit(t.closest('form')!)
      act(() => { vi.advanceTimersByTime(1500) })
    }

    // 5th message with stres keyword
    const t5 = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(t5, { target: { value: 'Saya sangat stres' } })
    fireEvent.submit(t5.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    expect(screen.getByText(/titik lelah emosional/)).toBeInTheDocument()
  })

  it('shows karir-related response after 5+ messages', () => {
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Pesan 1' } })
    fireEvent.submit(textarea.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    for (let i = 2; i <= 4; i++) {
      const t = screen.getByPlaceholderText('Ceritakan hal lain...')
      fireEvent.change(t, { target: { value: `Pesan ${i}` } })
      fireEvent.submit(t.closest('form')!)
      act(() => { vi.advanceTimersByTime(1500) })
    }

    // 5th message with karir keyword
    const t5 = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(t5, { target: { value: 'Masalah karir saya' } })
    fireEvent.submit(t5.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    expect(screen.getByText(/Potensimu sangat besar/)).toBeInTheDocument()
  })

  it('shows random ending for generic 5+ messages', () => {
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Pesan 1' } })
    fireEvent.submit(textarea.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    for (let i = 2; i <= 4; i++) {
      const t = screen.getByPlaceholderText('Ceritakan hal lain...')
      fireEvent.change(t, { target: { value: `Pesan ${i}` } })
      fireEvent.submit(t.closest('form')!)
      act(() => { vi.advanceTimersByTime(1500) })
    }

    // 5th message without any specific keyword
    const t5 = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(t5, { target: { value: 'Pesan umum saja' } })
    fireEvent.submit(t5.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    // Should show one of the random endings
    const body = document.body.textContent || ''
    expect(
      body.includes('Pemetaan ceritamu') ||
      body.includes('Setiap detail') ||
      body.includes('Transformasi membutuhkan')
    ).toBe(true)
  })

  it('shows recommendation with solusi keyword even before 3 messages', () => {
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'Saya butuh solusi untuk masalah ini' } })
    fireEvent.submit(textarea.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    // Even with 1 message, "solusi" keyword should trigger recommendation
    // But getRecommendation checks userMessageCount >= 3 OR keyword
    // Last user message contains "solusi" so it should show recommendation
    // Wait - getRecommendation uses messages state which includes the user message
    // Let me check: userMessageCount = messages.filter(m => m.role === 'user').length
    // At this point messages has 1 user + 1 assistant = 2 messages total, 1 user message
    // needsSolution = 1 >= 3 || 'saya butuh solusi...'.includes('solusi') = true
    expect(screen.getByText('Rekomendasi Solusi:')).toBeInTheDocument()
  })

  it('handles focus and blur on textarea', () => {
    render(<PsikotesDiagnostic />)
    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.focus(textarea)
    fireEvent.blur(textarea)
    // Should not crash
    expect(textarea).toBeInTheDocument()
  })

  it('disables textarea during thinking phase in chat', () => {
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan kendala/)
    fireEvent.change(textarea, { target: { value: 'First' } })
    fireEvent.submit(textarea.closest('form')!)
    act(() => { vi.advanceTimersByTime(1500) })

    // Type second message
    const t2 = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(t2, { target: { value: 'Second' } })
    fireEvent.submit(t2.closest('form')!)

    // During thinking, textarea should be disabled
    const thinkingTextarea = screen.getByPlaceholderText('Ceritakan hal lain...')
    expect(thinkingTextarea).toBeDisabled()
  })
})
