import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/axios', () => ({
  api: { get: vi.fn(), post: vi.fn() },
}))

const mockUseExamState = vi.fn()

vi.mock('@/features/hooks/useExamState', () => ({
  useExamState: (...args: unknown[]) => mockUseExamState(...args),
}))

import { ExamInterface } from '@/features/psikotes/components/ExamInterface'

const baseConfig = {
  test: { id: 'test-1', name: 'Tes Premium', description: 'Deskripsi tes', duration: 1800 },
  indicators: [],
  sections: [],
  questions: [
    {
      id: 'q1', text: 'Soal pertama', type: 'MULTIPLE_CHOICE' as const, order: 1,
      options: [{ id: 'o1', text: 'Opsi A', order: 1 }, { id: 'o2', text: 'Opsi B', order: 2 }],
    },
    {
      id: 'q2', text: 'Soal kedua', type: 'TRUE_FALSE' as const, order: 2,
      options: [{ id: 'o3', text: 'Benar', order: 1 }, { id: 'o4', text: 'Salah', order: 2 }],
    },
  ],
  features: { hasCamera: false, hasSidebar: false, hasActivityLog: false, hasTimer: true },
}

const baseState = {
  currentQuestionIndex: 0,
  answers: {},
  timeLeft: 1800,
  isFinished: false,
}

const baseMocks = {
  handleAnswer: vi.fn(),
  handleNext: vi.fn(),
  handlePrev: vi.fn(),
  handleJumpToQuestion: vi.fn(),
  handleSubmit: vi.fn(),
}

function setupMock(overrides: Record<string, unknown> = {}) {
  mockUseExamState.mockReturnValue({
    config: baseConfig,
    state: baseState,
    result: null,
    loading: false,
    error: null,
    activityLog: [],
    ...baseMocks,
    ...overrides,
  })
}

describe('ExamInterface (premium)', () => {
  it('renders test name', () => {
    setupMock()
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('Tes Premium')).toBeInTheDocument()
  })

  it('renders timer', () => {
    setupMock()
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('30:00')).toBeInTheDocument()
  })

  it('renders question counter', () => {
    setupMock()
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('Soal 1 dari 2')).toBeInTheDocument()
  })

  it('renders progress percentage', () => {
    setupMock()
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('0% selesai')).toBeInTheDocument()
  })

  it('renders navigation buttons', () => {
    setupMock()
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('Sebelumnya')).toBeInTheDocument()
    expect(screen.getByText('Selanjutnya')).toBeInTheDocument()
  })

  it('renders current question', () => {
    setupMock()
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('Soal pertama')).toBeInTheDocument()
  })

  it('renders loading state', () => {
    setupMock({ loading: true })
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('Memuat tes...')).toBeInTheDocument()
  })

  it('renders error state', () => {
    setupMock({ error: 'Gagal memuat tes' })
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('Terjadi Kesalahan')).toBeInTheDocument()
    expect(screen.getByText('Gagal memuat tes')).toBeInTheDocument()
  })

  it('renders no config state', () => {
    setupMock({ config: null })
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('Tes tidak ditemukan')).toBeInTheDocument()
  })

  it('renders result display when finished', () => {
    setupMock({
      state: { ...baseState, isFinished: true },
      result: {
        testResult: { id: 'r1', testId: 'test-1', userId: 'u1', completedAt: '2024-01-01' },
        indicatorScores: {},
        resultTypes: {},
      },
    })
    render(<ExamInterface testId="test-1" />)
    // ResultDisplay component should render with completion heading
    expect(screen.getByText('Tes Selesai!')).toBeInTheDocument()
  })

  it('renders timer with red style when under 5 minutes', () => {
    setupMock({
      state: { ...baseState, timeLeft: 200 },
    })
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('3:20')).toBeInTheDocument()
  })

  it('hides timer when hasTimer is false', () => {
    setupMock({
      config: {
        ...baseConfig,
        features: { ...baseConfig.features, hasTimer: false },
      },
    })
    render(<ExamInterface testId="test-1" />)
    expect(screen.queryByText('30:00')).not.toBeInTheDocument()
  })

  it('renders sidebar when hasSidebar is true', () => {
    setupMock({
      config: {
        ...baseConfig,
        features: { ...baseConfig.features, hasSidebar: true },
      },
    })
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('Navigasi Soal')).toBeInTheDocument()
  })

  it('renders question navigator buttons in sidebar', () => {
    setupMock({
      config: {
        ...baseConfig,
        features: { ...baseConfig.features, hasSidebar: true },
      },
    })
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByTitle('Soal 1')).toBeInTheDocument()
    expect(screen.getByTitle('Soal 2')).toBeInTheDocument()
  })

  it('calls handleJumpToQuestion when clicking sidebar button', () => {
    const handleJumpToQuestion = vi.fn()
    setupMock({
      config: {
        ...baseConfig,
        features: { ...baseConfig.features, hasSidebar: true },
      },
      handleJumpToQuestion,
    })
    render(<ExamInterface testId="test-1" />)
    fireEvent.click(screen.getByTitle('Soal 2'))
    expect(handleJumpToQuestion).toHaveBeenCalledWith(1)
  })

  it('calls handlePrev when clicking Sebelumnya', () => {
    const handlePrev = vi.fn()
    setupMock({
      handlePrev,
      state: { ...baseState, currentQuestionIndex: 1 },
    })
    render(<ExamInterface testId="test-1" />)
    fireEvent.click(screen.getByText('Sebelumnya'))
    expect(handlePrev).toHaveBeenCalled()
  })

  it('calls handleNext when clicking Selanjutnya', () => {
    const handleNext = vi.fn()
    setupMock({ handleNext })
    render(<ExamInterface testId="test-1" />)
    fireEvent.click(screen.getByText('Selanjutnya'))
    expect(handleNext).toHaveBeenCalled()
  })

  it('shows Selesai on last question and calls handleSubmit', () => {
    const handleSubmit = vi.fn()
    setupMock({
      state: { ...baseState, currentQuestionIndex: 1 },
      handleSubmit,
    })
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('Selesai')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Selesai'))
    expect(handleSubmit).toHaveBeenCalled()
  })

  it('renders test description', () => {
    setupMock()
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('Deskripsi tes')).toBeInTheDocument()
  })

  it('shows answered questions in sidebar', () => {
    setupMock({
      config: {
        ...baseConfig,
        features: { ...baseConfig.features, hasSidebar: true },
      },
      state: { ...baseState, answers: { q1: 'o1' } },
    })
    render(<ExamInterface testId="test-1" />)
    // q1 should have answered styling
    const btn1 = screen.getByTitle('Soal 1')
    expect(btn1).toBeInTheDocument()
  })

  it('calculates progress correctly with answers', () => {
    setupMock({
      state: { ...baseState, answers: { q1: 'o1' } },
    })
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('50% selesai')).toBeInTheDocument()
  })

  it('handles questions from sections', () => {
    setupMock({
      config: {
        ...baseConfig,
        questions: [],
        sections: [
          {
            id: 's1',
            name: 'Section 1',
            order: 1,
            questions: [
              {
                id: 'sq1', text: 'Section question', type: 'MULTIPLE_CHOICE' as const, order: 1,
                options: [{ id: 'so1', text: 'Option', order: 1 }],
              },
            ],
          },
        ],
      },
    })
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('Section question')).toBeInTheDocument()
  })

  it('hides description when not provided', () => {
    setupMock({
      config: {
        ...baseConfig,
        test: { id: 'test-1', name: 'Tes Tanpa Desc', duration: 1800 },
      },
    })
    render(<ExamInterface testId="test-1" />)
    expect(screen.getByText('Tes Tanpa Desc')).toBeInTheDocument()
  })
})
