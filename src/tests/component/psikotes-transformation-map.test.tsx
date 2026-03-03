import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { PsikotesTransformationMap } from '@/features/psikotes/components/psikotes-transformation-map'

describe('PsikotesTransformationMap', () => {
  it('renders section heading', () => {
    render(<PsikotesTransformationMap />)
    expect(screen.getByText(/Peta Perjalanan/)).toBeInTheDocument()
  })

  it('renders badge text', () => {
    render(<PsikotesTransformationMap />)
    expect(screen.getByText('Transformation Journey')).toBeInTheDocument()
  })

  it('renders social proof', () => {
    render(<PsikotesTransformationMap />)
    expect(screen.getByText('+10k Wanita Berdaya')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<PsikotesTransformationMap />)
    expect(screen.getByText(/Empat langkah kunci/)).toBeInTheDocument()
  })

  it('renders all transformation steps', () => {
    render(<PsikotesTransformationMap />)
    const eksplorasiButtons = screen.getAllByText('Eksplorasi')
    expect(eksplorasiButtons.length).toBe(4)
  })

  it('calls scrollIntoView when clicking Eksplorasi button', () => {
    const mockElement = { scrollIntoView: vi.fn() }
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as unknown as HTMLElement)

    render(<PsikotesTransformationMap />)
    const buttons = screen.getAllByText('Eksplorasi')
    fireEvent.click(buttons[0])

    expect(document.getElementById).toHaveBeenCalled()
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    vi.restoreAllMocks()
  })

  it('handles scrollToSection when element not found', () => {
    vi.spyOn(document, 'getElementById').mockReturnValue(null)

    render(<PsikotesTransformationMap />)
    const buttons = screen.getAllByText('Eksplorasi')
    // Should not crash when element not found
    fireEvent.click(buttons[0])

    expect(document.getElementById).toHaveBeenCalled()
    vi.restoreAllMocks()
  })

  it('renders step titles', () => {
    render(<PsikotesTransformationMap />)
    // Verify step titles are rendered (from TRANSFORMATION_STEPS constant)
    const headings = screen.getAllByRole('heading', { level: 4 })
    expect(headings.length).toBe(4)
  })
})
