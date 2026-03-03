import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/forgot-password',
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form'

describe('ForgotPasswordForm', () => {
  it('renders email input', () => {
    render(<ForgotPasswordForm />)
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  it('renders heading text', () => {
    render(<ForgotPasswordForm />)
    expect(screen.getByText('Lupa Password?')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<ForgotPasswordForm />)
    expect(screen.getByRole('button', { name: /Kirim Link Reset/i })).toBeInTheDocument()
  })

  it('renders back to login link', () => {
    render(<ForgotPasswordForm />)
    expect(screen.getByText(/Kembali ke Halaman Masuk/)).toBeInTheDocument()
  })

  it('shows validation error on empty email submit', async () => {
    const user = userEvent.setup()
    render(<ForgotPasswordForm />)
    const submitBtn = screen.getByRole('button', { name: /Kirim Link Reset/i })
    await user.click(submitBtn)
    const errorMsg = await screen.findByText('Email wajib diisi')
    expect(errorMsg).toBeInTheDocument()
  })
})
