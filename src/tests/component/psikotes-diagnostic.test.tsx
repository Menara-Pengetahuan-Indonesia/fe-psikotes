import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { PsikotesDiagnostic } from '@/features/psikotes/components/psikotes-diagnostic'

describe('PsikotesDiagnostic', () => {
  it('renders input placeholder', () => {
    render(<PsikotesDiagnostic />)
    expect(screen.getByPlaceholderText(/Ceritakan kendala/)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<PsikotesDiagnostic />)
    expect(screen.getByText('Mulai Analisis')).toBeInTheDocument()
  })

  it('renders status badges', () => {
    render(<PsikotesDiagnostic />)
    expect(screen.getByText('Mental Health Insight')).toBeInTheDocument()
    expect(screen.getByText('Always Active')).toBeInTheDocument()
  })

  it('submit button is disabled when input is empty', () => {
    render(<PsikotesDiagnostic />)
    const btn = screen.getByText('Mulai Analisis')
    expect(btn).toBeDisabled()
  })
})
