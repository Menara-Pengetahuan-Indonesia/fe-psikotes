import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { CameraProctoring } from '@/features/psikotes/components/CameraProctoring'

describe('CameraProctoring', () => {
  it('renders enable button when disabled', () => {
    render(<CameraProctoring isEnabled={false} onToggle={vi.fn()} />)
    expect(screen.getByText('Aktifkan Kamera')).toBeInTheDocument()
  })

  it('renders camera active header when enabled', () => {
    render(<CameraProctoring isEnabled={true} onToggle={vi.fn()} />)
    expect(screen.getByText('Kamera Aktif')).toBeInTheDocument()
  })

  it('renders waiting status when enabled', () => {
    render(<CameraProctoring isEnabled={true} onToggle={vi.fn()} />)
    expect(screen.getByText('Menunggu izin kamera...')).toBeInTheDocument()
  })
})
