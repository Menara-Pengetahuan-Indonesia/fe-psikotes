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

    expect(screen.getByPlaceholderText(/alamat email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/kata sandi/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /masuk sekarang/i })).toBeInTheDocument()
  })

  it('shows validation error for empty email on submit', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    await user.type(screen.getByPlaceholderText(/kata sandi/i), 'password123')
    await user.click(screen.getByRole('button', { name: /masuk sekarang/i }))

    await waitFor(() => {
      expect(screen.getByText(/email wajib diisi/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for short password on submit', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    await user.type(screen.getByPlaceholderText(/alamat email/i), 'test@example.com')
    await user.type(screen.getByPlaceholderText(/kata sandi/i), '123')
    await user.click(screen.getByRole('button', { name: /masuk sekarang/i }))

    await waitFor(() => {
      expect(screen.getByText(/password minimal 8 karakter/i)).toBeInTheDocument()
    })
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    const passwordInput = screen.getByPlaceholderText(/kata sandi/i) as HTMLInputElement
    const toggleButton = screen.getByRole('button', { name: /tampilkan sandi/i })

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

    await user.type(screen.getByPlaceholderText(/alamat email/i), 'test@example.com')
    await user.type(screen.getByPlaceholderText(/kata sandi/i), 'password123')
    await user.click(screen.getByRole('button', { name: /masuk sekarang/i }))

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })

  it('renders Google login button', () => {
    renderWithProviders(<LoginForm />)

    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument()
  })

  it('renders register link', () => {
    renderWithProviders(<LoginForm />)

    expect(screen.getByRole('link', { name: /daftar/i })).toBeInTheDocument()
  })
})
