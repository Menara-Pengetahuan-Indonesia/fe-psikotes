import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'

describe('ConfirmDialog', () => {
  const defaultProps = {
    open: true,
    title: 'Hapus Item',
    description: 'Yakin ingin menghapus?',
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  }

  it('renders title and description', () => {
    render(<ConfirmDialog {...defaultProps} />)
    expect(screen.getByText('Hapus Item')).toBeInTheDocument()
    expect(screen.getByText('Yakin ingin menghapus?')).toBeInTheDocument()
  })

  it('renders default button texts', () => {
    render(<ConfirmDialog {...defaultProps} />)
    expect(screen.getByText('Hapus')).toBeInTheDocument()
    expect(screen.getByText('Batal')).toBeInTheDocument()
  })

  it('renders custom button texts', () => {
    render(<ConfirmDialog {...defaultProps} confirmText="Ya" cancelText="Tidak" />)
    expect(screen.getByText('Ya')).toBeInTheDocument()
    expect(screen.getByText('Tidak')).toBeInTheDocument()
  })

  it('calls onConfirm when confirm clicked', async () => {
    const onConfirm = vi.fn()
    const user = userEvent.setup()
    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />)
    await user.click(screen.getByText('Hapus'))
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it('calls onCancel when cancel clicked', async () => {
    const onCancel = vi.fn()
    const user = userEvent.setup()
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />)
    await user.click(screen.getByText('Batal'))
    expect(onCancel).toHaveBeenCalledOnce()
  })

  it('shows spinner and disables confirm button when isPending', () => {
    render(<ConfirmDialog {...defaultProps} isPending={true} />)
    const confirmBtn = screen.getByRole('button', { name: '' })
    expect(confirmBtn).toBeDisabled()
  })

  it('does not render when closed', () => {
    render(<ConfirmDialog {...defaultProps} open={false} />)
    expect(screen.queryByText('Hapus Item')).not.toBeInTheDocument()
  })
})
