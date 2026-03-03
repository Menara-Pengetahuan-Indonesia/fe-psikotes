import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { FormField } from '@/features/admin/components/Common/FormField'

describe('FormField', () => {
  it('renders label', () => {
    render(
      <FormField label="Nama Tes">
        <input />
      </FormField>
    )
    expect(screen.getByText('Nama Tes')).toBeInTheDocument()
  })

  it('renders required indicator', () => {
    render(
      <FormField label="Email" required>
        <input />
      </FormField>
    )
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <FormField label="Test">
        <input data-testid="child-input" />
      </FormField>
    )
    expect(screen.getByTestId('child-input')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(
      <FormField label="Email" error={{ type: 'required', message: 'Email wajib diisi' }}>
        <input />
      </FormField>
    )
    expect(screen.getByText('Email wajib diisi')).toBeInTheDocument()
  })

  it('does not render error when no error', () => {
    render(
      <FormField label="Email">
        <input />
      </FormField>
    )
    expect(screen.queryByText('Email wajib diisi')).not.toBeInTheDocument()
  })
})
