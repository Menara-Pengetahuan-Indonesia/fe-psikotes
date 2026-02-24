import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RegisterForm } from '@/features/auth/components/register-form'

vi.mock('@/features/auth/services', () => ({
  authService: {
    register: vi.fn().mockResolvedValue({
      user: { id: '1', email: 'john@example.com', name: 'John Doe', role: 'USER' },
      message: 'User registered successfully',
    }),
  },
  extractErrorMessage: vi.fn((e: Error) => e.message),
}))

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

    expect(screen.getByPlaceholderText(/nama depan/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/nama belakang/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/nomor hp/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/konfirmasi password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /daftar sekarang/i })).toBeInTheDocument()
  })

  it('validates password requirements on submit', async () => {
    const user = userEvent.setup()
    renderWithProviders(<RegisterForm />)

    await user.type(screen.getByPlaceholderText(/nama depan/i), 'John')
    await user.type(screen.getByPlaceholderText(/nama belakang/i), 'Doe')
    await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com')
    await user.type(screen.getByPlaceholderText(/nomor hp/i), '081234567890')
    await user.type(screen.getByPlaceholderText(/^password$/i), 'weak')
    await user.type(screen.getByPlaceholderText(/konfirmasi password/i), 'weak')
    await user.click(screen.getByRole('button', { name: /daftar sekarang/i }))

    await waitFor(() => {
      expect(screen.getByText(/password minimal 8 karakter/i)).toBeInTheDocument()
    })
  })

  it('validates password mismatch on submit', async () => {
    const user = userEvent.setup()
    renderWithProviders(<RegisterForm />)

    await user.type(screen.getByPlaceholderText(/nama depan/i), 'John')
    await user.type(screen.getByPlaceholderText(/nama belakang/i), 'Doe')
    await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com')
    await user.type(screen.getByPlaceholderText(/nomor hp/i), '081234567890')
    await user.type(screen.getByPlaceholderText(/^password$/i), 'Password123!')
    await user.type(screen.getByPlaceholderText(/konfirmasi password/i), 'Different123!')
    await user.click(screen.getByRole('button', { name: /daftar sekarang/i }))

    await waitFor(() => {
      expect(screen.getByText(/password tidak cocok/i)).toBeInTheDocument()
    })
  })

  it('calls onSuccess on valid submission', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    renderWithProviders(<RegisterForm onSuccess={onSuccess} />)

    await user.type(screen.getByPlaceholderText(/nama depan/i), 'John')
    await user.type(screen.getByPlaceholderText(/nama belakang/i), 'Doe')
    await user.type(screen.getByPlaceholderText(/^email$/i), 'john@example.com')
    await user.type(screen.getByPlaceholderText(/nomor hp/i), '081234567890')
    await user.type(screen.getByPlaceholderText(/^password$/i), 'Password123!')
    await user.type(screen.getByPlaceholderText(/konfirmasi password/i), 'Password123!')
    await user.click(screen.getByRole('button', { name: /daftar sekarang/i }))

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })

  it('renders login link', () => {
    renderWithProviders(<RegisterForm />)

    expect(screen.getByRole('link', { name: /masuk/i })).toBeInTheDocument()
  })
})
