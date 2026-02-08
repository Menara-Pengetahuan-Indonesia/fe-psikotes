import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RegisterForm } from '@/features/auth/components/register-form'

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>,
  )
}

describe('RegisterForm', () => {
  it('renders all fields', () => {
    renderWithProviders(<RegisterForm />)

    expect(screen.getByLabelText(/nama depan/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nama belakang/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nomor hp/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/konfirmasi password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /daftar sekarang/i })).toBeInTheDocument()
  })

  it('validates password requirements', async () => {
    const user = userEvent.setup()
    renderWithProviders(<RegisterForm />)

    const passwordInput = screen.getByLabelText(/^password$/i)
    await user.type(passwordInput, 'weak')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/password minimal 8 karakter/i)).toBeInTheDocument()
    })
  })

  it('validates password mismatch', async () => {
    const user = userEvent.setup()
    renderWithProviders(<RegisterForm />)

    await user.type(screen.getByLabelText(/^password$/i), 'Password123')
    await user.type(screen.getByLabelText(/konfirmasi password/i), 'Different123')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/password tidak cocok/i)).toBeInTheDocument()
    })
  })

  it('calls onSuccess on valid submission', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    renderWithProviders(<RegisterForm onSuccess={onSuccess} />)

    await user.type(screen.getByLabelText(/nama depan/i), 'John')
    await user.type(screen.getByLabelText(/nama belakang/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/nomor hp/i), '081234567890')
    await user.type(screen.getByLabelText(/^password$/i), 'Password123')
    await user.type(screen.getByLabelText(/konfirmasi password/i), 'Password123')
    await user.click(screen.getByRole('button', { name: /daftar sekarang/i }))

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })

  it('renders login link', () => {
    renderWithProviders(<RegisterForm />)

    expect(screen.getByText(/masuk sekarang/i)).toBeInTheDocument()
  })
})
