import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/axios', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))

import { useExamState } from '@/features/psikotes/hooks/useExamState'
import { api } from '@/lib/axios'

const mockConfig = {
  test: { id: 'test-1', name: 'Test Psikotes', duration: 30 },
  indicators: [],
  sections: [],
  questions: [
    { id: 'q1', text: 'Soal 1', order: 1, options: [{ id: 'o1', text: 'A' }, { id: 'o2', text: 'B' }] },
    { id: 'q2', text: 'Soal 2', order: 2, options: [{ id: 'o3', text: 'C' }, { id: 'o4', text: 'D' }] },
  ],
  features: { hasCamera: false, hasSidebar: false, hasActivityLog: false, hasTimer: true },
}

describe('useExamState', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts in loading state', () => {
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockConfig })
    const { result } = renderHook(() => useExamState('test-1'))
    expect(result.current.loading).toBe(true)
  })

  it('fetches test config on mount', async () => {
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockConfig })

    const { result } = renderHook(() => useExamState('test-1'))

    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.config).toEqual(mockConfig)
    expect(api.get).toHaveBeenCalledWith('/tests/test-1/config')
  })

  it('sets timeLeft from config duration', async () => {
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockConfig })

    const { result } = renderHook(() => useExamState('test-1'))

    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // 30 minutes * 60 = 1800 seconds
    expect(result.current.state.timeLeft).toBe(1800)
  })

  it('handles fetch error', async () => {
    (api.get as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useExamState('test-1'))

    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Failed to load test')
  })

  it('handles answer selection', async () => {
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockConfig })

    const { result } = renderHook(() => useExamState('test-1'))

    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.handleAnswer('o1')
    })

    expect(result.current.state.answers['q1']).toBe('o1')
  })

  it('navigates to next question', async () => {
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockConfig })

    const { result } = renderHook(() => useExamState('test-1'))

    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.state.currentQuestionIndex).toBe(0)

    act(() => {
      result.current.handleNext()
    })

    expect(result.current.state.currentQuestionIndex).toBe(1)
  })

  it('navigates to previous question', async () => {
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockConfig })

    const { result } = renderHook(() => useExamState('test-1'))

    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.handleNext()
    })
    expect(result.current.state.currentQuestionIndex).toBe(1)

    act(() => {
      result.current.handlePrev()
    })
    expect(result.current.state.currentQuestionIndex).toBe(0)
  })

  it('submits test answers', async () => {
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockConfig })
    const mockResult = { score: 85, totalQuestions: 2 }
    ;(api.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResult })

    const { result } = renderHook(() => useExamState('test-1'))

    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(api.post).toHaveBeenCalledWith('/tests/test-1/submit', { answers: {} })
    expect(result.current.result).toEqual(mockResult)
    expect(result.current.state.isFinished).toBe(true)
  })
})
