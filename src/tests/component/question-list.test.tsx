import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

const mockQuestions = [
  {
    id: 'q1',
    text: 'Apa warna favorit Anda?',
    type: 'MULTIPLE_CHOICE',
    order: 1,
    sectionId: null,
    imageUrl: null,
    options: [
      { id: 'o1', text: 'Merah', order: 1 },
      { id: 'o2', text: 'Biru', order: 2 },
    ],
  },
  {
    id: 'q2',
    text: 'Jelaskan diri Anda.',
    type: 'ESSAY',
    order: 2,
    sectionId: null,
    imageUrl: null,
    options: [],
  },
]

let mockQuestionsData: typeof mockQuestions | undefined = mockQuestions
const mockIsLoading = false

const mockMutation = { mutate: vi.fn(), isPending: false }

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

import { QuestionList } from '@/features/admin/components/QuestionManagement/QuestionList'

describe('QuestionList', () => {
  it('renders question list heading', () => {
    render(<QuestionList subTestId="test-1" />)
    expect(screen.getByText('Pertanyaan')).toBeInTheDocument()
  })

  it('renders add question button', () => {
    render(<QuestionList subTestId="test-1" />)
    expect(screen.getByText('Tambah Pertanyaan')).toBeInTheDocument()
  })

  it('renders question texts', () => {
    render(<QuestionList subTestId="test-1" />)
    expect(screen.getByText('Apa warna favorit Anda?')).toBeInTheDocument()
    expect(screen.getByText('Jelaskan diri Anda.')).toBeInTheDocument()
  })

  it('renders question count', () => {
    render(<QuestionList subTestId="test-1" />)
    expect(screen.getByText('(2 total)')).toBeInTheDocument()
  })

  it('renders empty state when no questions', () => {
    mockQuestionsData = []
    render(<QuestionList subTestId="test-1" />)
    expect(screen.getByText('Belum ada pertanyaan')).toBeInTheDocument()
    mockQuestionsData = mockQuestions
  })

  it('renders option count badge', () => {
    render(<QuestionList subTestId="test-1" />)
    expect(screen.getByText('2 opsi')).toBeInTheDocument()
  })
})
