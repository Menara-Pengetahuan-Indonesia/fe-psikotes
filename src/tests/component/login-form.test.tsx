import { render, screen, waitFor, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginForm } from '@/features/auth/components/login-form'

vi.mock('@/features/auth/services', () => ({
  authService: {
    login: vi.fn().mockResolvedValue({
      user: { id: '1', email: 'test@example.com', name: 'Test', role: 'user' },
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
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

describe('LoginForm', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders login form with all fields', () => {
    renderWithProviders(<LoginForm />)

    expect(screen.getByLabelText(/alamat email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^masuk$/i })).toBeInTheDocument()
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    const emailInput = screen.getByLabelText(/alamat email/i)
    await user.type(emailInput, 'invalid-email')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/format email tidak valid/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for short password', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    const passwordInput = screen.getByLabelText(/^password$/i)
    await user.type(passwordInput, '123')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/password minimal 8 karakter/i)).toBeInTheDocument()
    })
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    const passwordInput = screen.getByLabelText(/^password$/i) as HTMLInputElement
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i })

    expect(passwordInput.type).toBe('password')

    await user.click(toggleButton)
    expect(passwordInput.type).toBe('text')

    await user.click(toggleButton)
    expect(passwordInput.type).toBe('password')
  })

  it('calls onSuccess callback on valid submission', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    renderWithProviders(<LoginForm onSuccess={onSuccess} />)

    await user.type(screen.getByLabelText(/alamat email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'password123')
    await user.click(screen.getByRole('button', { name: /^masuk$/i }))

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })

  it('renders Google login button', () => {
    renderWithProviders(<LoginForm />)

    expect(screen.getByText(/masuk dengan google/i)).toBeInTheDocument()
  })

  it('renders register link', () => {
    renderWithProviders(<LoginForm />)

    expect(screen.getByText(/daftar sekarang/i)).toBeInTheDocument()
  })
})
