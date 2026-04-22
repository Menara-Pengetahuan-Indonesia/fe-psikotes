import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

const mockQuestions = [
  {
    id: 'q1',
    subTestId: 'test-1',
    questionText: 'Apa warna favorit Anda?',
    questionType: 'MULTIPLE_CHOICE',
    order: 1,
    sectionId: null,
    imageUrl: null,
    options: [
      { id: 'o1', optionText: 'Merah', order: 1, isCorrect: false, points: 0 },
      { id: 'o2', optionText: 'Biru', order: 2, isCorrect: false, points: 0 },
    ],
  },
  {
    id: 'q2',
    subTestId: 'test-1',
    questionText: 'Jelaskan diri Anda.',
    questionType: 'ESSAY',
    order: 2,
    sectionId: null,
    imageUrl: null,
    options: [],
  },
]

let mockQuestionsData: typeof mockQuestions | undefined = mockQuestions
const mockIsLoading = false

const mockMutation = { mutate: vi.fn(), mutateAsync: vi.fn(), isPending: false }

vi.mock('@/features/admin/hooks', () => ({
  useQuestions: () => ({
    data: mockQuestionsData,
    isLoading: mockIsLoading,
  }),
  useSections: () => ({
    data: [],
  }),
  useDeleteQuestion: () => mockMutation,
  useCreateQuestion: () => mockMutation,
  useUpdateQuestion: () => mockMutation,
  useCreateOption: () => mockMutation,
  useUpdateOption: () => mockMutation,
  useDeleteOption: () => mockMutation,
  useIndicators: () => ({ data: [] }),
  useCreateIndicatorMapping: () => mockMutation,
  useDeleteIndicatorMapping: () => mockMutation,
  useUploadImage: () => mockMutation,
  adminKeys: { questions: () => ['questions'] },
}))

vi.mock('../../hooks/query-keys', () => ({
  adminKeys: { questions: { all: ['questions'] } },
}))

import { QuestionList } from '@/features/admin/components/QuestionManagement/QuestionList'

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('QuestionList', () => {
  it('renders add question button', () => {
    render(<QuestionList subTestId="test-1" />, { wrapper })
    expect(screen.getByText('Tambah Pertanyaan')).toBeInTheDocument()
  })

  it('renders question texts', () => {
    render(<QuestionList subTestId="test-1" />, { wrapper })
    expect(screen.getByText('Apa warna favorit Anda?')).toBeInTheDocument()
    expect(screen.getByText('Jelaskan diri Anda.')).toBeInTheDocument()
  })

  it('renders empty state when no questions', () => {
    mockQuestionsData = []
    render(<QuestionList subTestId="test-1" />, { wrapper })
    expect(screen.getByText('Belum ada pertanyaan')).toBeInTheDocument()
    mockQuestionsData = mockQuestions
  })

  it('renders question type labels', () => {
    render(<QuestionList subTestId="test-1" />, { wrapper })
    expect(screen.getAllByText('Pilihan Ganda').length).toBeGreaterThan(0)
  })
})
