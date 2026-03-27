import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

const { mockPush, mockUsePackage } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockUsePackage: vi.fn(),
}))

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual<typeof import('next/navigation')>('next/navigation')
  return {
    ...actual,
    useParams: () => ({
      packageId: '9b85b39b-efab-4553-a180-f4f314f8050c',
    }),
    useRouter: () => ({
      push: mockPush,
      replace: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
    }),
  }
})

vi.mock('@/features/admin/hooks', () => ({
  usePackage: mockUsePackage,
}))

import PackageDetailPage from '@/app/(dasbor)/admin/packages/[packageId]/page'

describe('PackageDetailPage', () => {
  beforeEach(() => {
    mockPush.mockReset()
    mockUsePackage.mockReset()
  })

  it('renders package details for UUID route params using API data', () => {
    mockUsePackage.mockReturnValue({
      data: {
        id: '9b85b39b-efab-4553-a180-f4f314f8050c',
        name: 'Paket Assessment Korporat',
        description: 'Paket untuk seleksi dan pengembangan talenta.',
        price: 250000,
        estimatedDuration: 120,
        isPublished: true,
        createdAt: '2026-03-01T10:00:00.000Z',
        updatedAt: '2026-03-01T10:00:00.000Z',
        tests: [
          {
            id: 'pkg-test-1',
            packageId: '9b85b39b-efab-4553-a180-f4f314f8050c',
            testId: 'test-1',
            order: 1,
            createdAt: '2026-03-01T10:00:00.000Z',
            test: {
              id: 'test-1',
              name: 'Tes Numerik',
              duration: 45,
              isPublished: true,
              shuffleQuestions: false,
              shuffleOptions: false,
              createdAt: '2026-03-01T10:00:00.000Z',
              updatedAt: '2026-03-01T10:00:00.000Z',
              questions: [{ id: 'q-1' }, { id: 'q-2' }, { id: 'q-3' }],
              indicators: [],
              sections: [],
            },
          },
        ],
      },
      isLoading: false,
      error: null,
    })

    render(<PackageDetailPage />)

    expect(mockUsePackage).toHaveBeenCalledWith('9b85b39b-efab-4553-a180-f4f314f8050c')
    expect(screen.getByText('Paket Assessment Korporat')).toBeInTheDocument()
    expect(screen.getByText('Tes Numerik')).toBeInTheDocument()
    expect(screen.queryByText('Paket tidak ditemukan.')).not.toBeInTheDocument()
  })
})
