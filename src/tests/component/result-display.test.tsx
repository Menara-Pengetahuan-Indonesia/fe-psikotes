import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}))

import { ResultDisplay } from '@/features/psikotes/components/ResultDisplay'

const mockResult = {
  testResult: {
    id: 'result-1',
    testId: 'test-1',
    userId: 'user-1',
    completedAt: '2026-03-03T10:00:00Z',
  },
  indicatorScores: { ind1: 75 },
  resultTypes: { ind1: 'Tinggi' },
}

const mockConfig = {
  test: { id: 'test-1', name: 'Tes Kepribadian', duration: 30 },
  indicators: [
    { id: 'ind1', name: 'Kepercayaan Diri', description: 'Tingkat kepercayaan diri', order: 1 },
  ],
  sections: [],
  questions: [],
  features: { hasCamera: false, hasSidebar: false, hasActivityLog: false, hasTimer: true },
}

describe('ResultDisplay', () => {
  it('renders completion heading', () => {
    render(<ResultDisplay result={mockResult} config={mockConfig} />)
    expect(screen.getByText('Tes Selesai!')).toBeInTheDocument()
  })

  it('renders test name', () => {
    render(<ResultDisplay result={mockResult} config={mockConfig} />)
    expect(screen.getByText('Tes Kepribadian')).toBeInTheDocument()
  })

  it('renders indicator name and score', () => {
    render(<ResultDisplay result={mockResult} config={mockConfig} />)
    expect(screen.getByText('Kepercayaan Diri')).toBeInTheDocument()
    expect(screen.getByText('75 / 100')).toBeInTheDocument()
    expect(screen.getByText('Tinggi')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<ResultDisplay result={mockResult} config={mockConfig} />)
    expect(screen.getByText('Kembali')).toBeInTheDocument()
    expect(screen.getByText('Ke Dashboard')).toBeInTheDocument()
  })
})
