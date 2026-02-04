import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { RegisterForm } from '@/features/auth/components/register-form'

describe('RegisterForm', () => {
  it('renders all fields', () => {
    render(<RegisterForm />)

    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  it('validates password requirements', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)

    const passwordInput = screen.getByLabelText(/^password/i)
    await user.type(passwordInput, 'weak')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/password minimal 8 karakter/i)).toBeInTheDocument()
    })
  })

  it('validates password mismatch', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)

    await user.type(screen.getByLabelText(/^password/i), 'Password123')
    await user.type(screen.getByLabelText(/confirm password/i), 'Different123')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/password tidak cocok/i)).toBeInTheDocument()
    })
  })

  it('calls onSuccess on valid submission', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    render(<RegisterForm onSuccess={onSuccess} />)

    await user.type(screen.getByLabelText(/^name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/^password/i), 'Password123')
    await user.type(screen.getByLabelText(/confirm password/i), 'Password123')
    await user.click(screen.getByRole('button', { name: 'Sign Up' }))

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })

  it('renders login link', () => {
    render(<RegisterForm />)

    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument()
  })
})
