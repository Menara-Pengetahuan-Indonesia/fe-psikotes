import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { ActivityLog } from '@/features/psikotes/components/ActivityLog'

const mockEntries = [
  { timestamp: new Date('2026-03-03T10:00:00'), action: 'Test dimulai', questionIndex: 0 },
  { timestamp: new Date('2026-03-03T10:01:00'), action: 'Jawab soal', questionIndex: 1, details: 'Pilih: o1' },
]

describe('ActivityLog', () => {
  it('renders toggle button with count', () => {
    render(<ActivityLog entries={mockEntries} isOpen={false} onToggle={vi.fn()} />)
    expect(screen.getByText('Log (2)')).toBeInTheDocument()
  })

  it('shows entries when open', () => {
    render(<ActivityLog entries={mockEntries} isOpen={true} onToggle={vi.fn()} />)
    expect(screen.getByText('Activity Log')).toBeInTheDocument()
    expect(screen.getByText('Test dimulai')).toBeInTheDocument()
    expect(screen.getByText('Jawab soal')).toBeInTheDocument()
  })

  it('shows empty state when no entries', () => {
    render(<ActivityLog entries={[]} isOpen={true} onToggle={vi.fn()} />)
    expect(screen.getByText('Belum ada aktivitas')).toBeInTheDocument()
  })

  it('calls onToggle when button clicked', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    render(<ActivityLog entries={mockEntries} isOpen={false} onToggle={onToggle} />)
    await user.click(screen.getByText('Log (2)'))
    expect(onToggle).toHaveBeenCalledOnce()
  })
})
