import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

const mockMutation = { mutate: vi.fn(), isPending: false }

vi.mock('@/features/admin/hooks', () => ({
  useIndicators: () => ({
    data: [
      { id: 'ind1', name: 'Kepercayaan Diri' },
      { id: 'ind2', name: 'Kecerdasan Emosional' },
    ],
    isLoading: false,
  }),
  useCreateIndicatorMapping: () => mockMutation,
  useDeleteIndicatorMapping: () => mockMutation,
}))

import { OptionMapper } from '@/features/admin/components/QuestionManagement/OptionMapper'

const defaultProps = {
  testId: 'test-1',
  questionId: 'q1',
  option: {
    id: 'o1',
    questionId: 'q1',
    text: 'Opsi A',
    order: 1,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    mappings: [],
  },
}

describe('OptionMapper', () => {
  it('renders option text heading', () => {
    render(<OptionMapper {...defaultProps} />)
    expect(screen.getByText('Pemetaan Indikator: Opsi A')).toBeInTheDocument()
  })

  it('renders indicator names', () => {
    render(<OptionMapper {...defaultProps} />)
    expect(screen.getByText('Kepercayaan Diri')).toBeInTheDocument()
    expect(screen.getByText('Kecerdasan Emosional')).toBeInTheDocument()
  })

  it('renders Tambah buttons for unmapped indicators', () => {
    render(<OptionMapper {...defaultProps} />)
    const buttons = screen.getAllByText('Tambah')
    expect(buttons.length).toBe(2)
  })

  it('renders score input for unmapped indicators', () => {
    render(<OptionMapper {...defaultProps} />)
    const inputs = screen.getAllByPlaceholderText('Skor')
    expect(inputs.length).toBe(2)
  })

  it('renders existing mapping score', () => {
    const propsWithMapping = {
      ...defaultProps,
      option: {
        ...defaultProps.option,
        mappings: [{ id: 'm1', optionId: 'o1', indicatorId: 'ind1', scoreValue: 5, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' }],
      },
    }
    render(<OptionMapper {...propsWithMapping} />)
    expect(screen.getByText('5')).toBeInTheDocument()
    // Only 1 Tambah button for the unmapped indicator
    expect(screen.getAllByText('Tambah').length).toBe(1)
  })
})
