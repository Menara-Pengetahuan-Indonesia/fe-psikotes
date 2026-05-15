import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import { PsikotesDiagnostic } from '@/features/psikotes/components/psikotes-diagnostic'

const mockFetch = vi.fn()

function mockApiResponse(data: object) {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  })
}

function mockApiError() {
  mockFetch.mockResolvedValueOnce({ ok: false })
}

describe('PsikotesDiagnostic', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    mockFetch.mockReset()
  })

  it('renders initial bubbles', () => {
    render(<PsikotesDiagnostic />)
    expect(screen.getByText(/Stres & kelelahan/)).toBeInTheDocument()
    expect(screen.getByText(/Bingung soal karir/)).toBeInTheDocument()
  })

  it('renders textarea placeholder in initial phase', () => {
    render(<PsikotesDiagnostic />)
    expect(screen.getByPlaceholderText(/Ceritakan masalahmu di sini/)).toBeInTheDocument()
  })

  it('clicking a bubble sends message and transitions to chatting', async () => {
    mockApiResponse({ reply: 'Halo, aku di sini.', followUpBubbles: ['Karyawan', 'Mahasiswa'], recommendations: null })
    render(<PsikotesDiagnostic />)

    const bubble = screen.getByText(/Stres & kelelahan/)
    fireEvent.click(bubble)

    await waitFor(() => {
      expect(screen.getByText('Halo, aku di sini.')).toBeInTheDocument()
    })
  })

  it('shows user message in chat after bubble click', async () => {
    mockApiResponse({ reply: 'Aku mendengarmu.', followUpBubbles: null, recommendations: null })
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))

    await waitFor(() => {
      expect(screen.getByText('Stres & kelelahan terus-menerus')).toBeInTheDocument()
    })
  })

  it('shows loading indicator while waiting for API', async () => {
    mockFetch.mockReturnValueOnce(new Promise(() => {})) // never resolves
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))

    expect(await screen.findByText(/Moela sedang mengetik/)).toBeInTheDocument()
  })

  it('submits typed message on form submit', async () => {
    mockApiResponse({ reply: 'Terima kasih ceritanya.', followUpBubbles: null, recommendations: null })
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan masalahmu di sini/)
    fireEvent.change(textarea, { target: { value: 'Saya merasa stres' } })
    fireEvent.submit(textarea.closest('form')!)

    await waitFor(() => {
      expect(screen.getByText('Terima kasih ceritanya.')).toBeInTheDocument()
    })
  })

  it('submits on Enter key', async () => {
    mockApiResponse({ reply: 'Oke.', followUpBubbles: null, recommendations: null })
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan masalahmu di sini/)
    fireEvent.change(textarea, { target: { value: 'Enter test' } })
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false })

    await waitFor(() => {
      expect(screen.getByText('Oke.')).toBeInTheDocument()
    })
  })

  it('does not submit on Shift+Enter', () => {
    render(<PsikotesDiagnostic />)
    const textarea = screen.getByPlaceholderText(/Ceritakan masalahmu di sini/)
    fireEvent.change(textarea, { target: { value: 'No submit' } })
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true })

    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('does not submit when input is empty', () => {
    render(<PsikotesDiagnostic />)
    const textarea = screen.getByPlaceholderText(/Ceritakan masalahmu di sini/)
    fireEvent.submit(textarea.closest('form')!)

    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('clears input after submission', async () => {
    mockApiResponse({ reply: 'Ok.', followUpBubbles: null, recommendations: null })
    render(<PsikotesDiagnostic />)

    const textarea = screen.getByPlaceholderText(/Ceritakan masalahmu di sini/)
    fireEvent.change(textarea, { target: { value: 'Test message' } })
    fireEvent.submit(textarea.closest('form')!)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Ceritakan hal lain...')).toHaveValue('')
    })
  })

  it('renders follow-up bubbles from API response', async () => {
    mockApiResponse({ reply: 'Siapa kamu?', followUpBubbles: ['Karyawan', 'Mahasiswa', 'Pengusaha'], recommendations: null })
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))

    await waitFor(() => {
      expect(screen.getByText('Karyawan')).toBeInTheDocument()
      expect(screen.getByText('Mahasiswa')).toBeInTheDocument()
      expect(screen.getByText('Pengusaha')).toBeInTheDocument()
    })
  })

  it('clicking follow-up bubble sends it as message', async () => {
    mockApiResponse({ reply: 'Oke, kamu karyawan.', followUpBubbles: ['Karyawan', 'Mahasiswa'], recommendations: null })
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))
    await waitFor(() => screen.getByText('Karyawan'))

    mockApiResponse({ reply: 'Baik.', followUpBubbles: null, recommendations: null })
    fireEvent.click(screen.getByText('Karyawan'))

    await waitFor(() => {
      expect(screen.getByText('Baik.')).toBeInTheDocument()
    })
  })

  it('renders product recommendations from API', async () => {
    mockApiResponse({
      reply: 'Ini rekomendasinya.',
      followUpBubbles: null,
      recommendations: [
        { id: 'anxiety-burnout', name: 'Asesmen Anxiety & Burnout', category: 'Diri Pribadi', priceFrom: 30000, href: '/produk/anxiety-burnout' },
      ],
    })
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))

    await waitFor(() => {
      expect(screen.getByText('Asesmen Anxiety & Burnout')).toBeInTheDocument()
      expect(screen.getByText(/Diri Pribadi/)).toBeInTheDocument()
    })
  })

  it('recommendation card links to correct href', async () => {
    mockApiResponse({
      reply: 'Coba ini.',
      followUpBubbles: null,
      recommendations: [
        { id: 'self-worth', name: 'Asesmen Self-Worth', category: 'Diri Pribadi', priceFrom: 25000, href: '/produk/self-worth' },
      ],
    })
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))

    await waitFor(() => {
      const link = screen.getByRole('link', { name: /Self-Worth/ })
      expect(link).toHaveAttribute('href', '/produk/self-worth')
    })
  })

  it('shows error message on API failure', async () => {
    mockApiError()
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))

    await waitFor(() => {
      expect(screen.getByText(/gangguan koneksi/)).toBeInTheDocument()
    })
  })

  it('resets to initial phase on reset button click', async () => {
    mockApiResponse({ reply: 'Halo.', followUpBubbles: null, recommendations: null })
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))
    await waitFor(() => screen.getByText('Halo.'))

    fireEvent.click(screen.getByText('Mulai Dari Awal'))

    expect(screen.getByPlaceholderText(/Ceritakan masalahmu di sini/)).toBeInTheDocument()
    expect(screen.queryByText('Halo.')).not.toBeInTheDocument()
  })

  it('clears follow-up bubbles immediately when one is clicked', async () => {
    mockApiResponse({ reply: 'Ok.', followUpBubbles: ['Karyawan', 'Mahasiswa'], recommendations: null })
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))
    await waitFor(() => screen.getByText('Karyawan'))

    mockFetch.mockReturnValueOnce(new Promise(() => {}))
    fireEvent.click(screen.getByText('Karyawan'))

    expect(screen.queryByText('Mahasiswa')).not.toBeInTheDocument()
  })

  it('disables chat textarea while loading', async () => {
    mockApiResponse({ reply: 'Ok.', followUpBubbles: null, recommendations: null })
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))
    await waitFor(() => screen.getByPlaceholderText('Ceritakan hal lain...'))

    mockFetch.mockReturnValueOnce(new Promise(() => {}))
    const textarea = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(textarea, { target: { value: 'test' } })
    fireEvent.submit(textarea.closest('form')!)

    expect(screen.getByPlaceholderText('Ceritakan hal lain...')).toBeDisabled()
  })

  it('sends full message history to API', async () => {
    mockApiResponse({ reply: 'First reply.', followUpBubbles: null, recommendations: null })
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))
    await waitFor(() => screen.getByText('First reply.'))

    mockApiResponse({ reply: 'Second reply.', followUpBubbles: null, recommendations: null })
    const textarea = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(textarea, { target: { value: 'Second message' } })
    fireEvent.submit(textarea.closest('form')!)

    await waitFor(() => screen.getByText('Second reply.'))

    const lastCall = mockFetch.mock.calls[1]
    const body = JSON.parse(lastCall[1].body)
    expect(body.messages).toHaveLength(3) // user + assistant + user
  })

  it('clears follow-up bubbles after sending next message', async () => {
    mockApiResponse({ reply: 'Ok.', followUpBubbles: ['Karyawan', 'Mahasiswa'], recommendations: null })
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))
    await waitFor(() => screen.getByText('Karyawan'))

    mockFetch.mockReturnValueOnce(new Promise(() => {}))
    const textarea = screen.getByPlaceholderText('Ceritakan hal lain...')
    fireEvent.change(textarea, { target: { value: 'Next message' } })
    fireEvent.submit(textarea.closest('form')!)

    expect(screen.queryByText('Karyawan')).not.toBeInTheDocument()
  })

  it('shows price formatted in Indonesian locale', async () => {
    mockApiResponse({
      reply: 'Coba ini.',
      followUpBubbles: null,
      recommendations: [
        { id: 'konseling', name: 'Konseling Psikolog', category: 'Diri Pribadi', priceFrom: 350000, href: '/produk/konseling' },
      ],
    })
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))

    await waitFor(() => {
      expect(screen.getByText(/350\.000/)).toBeInTheDocument()
    })
  })

  it('handles fetch network error gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))

    await waitFor(() => {
      expect(screen.getByText(/gangguan koneksi/)).toBeInTheDocument()
    })
  })

  it('resets recommendations on reset', async () => {
    mockApiResponse({
      reply: 'Coba ini.',
      followUpBubbles: null,
      recommendations: [
        { id: 'anxiety-burnout', name: 'Asesmen Anxiety & Burnout', category: 'Diri Pribadi', priceFrom: 30000, href: '/produk/anxiety-burnout' },
      ],
    })
    render(<PsikotesDiagnostic />)

    fireEvent.click(screen.getByText(/Stres & kelelahan/))
    await waitFor(() => screen.getByText('Asesmen Anxiety & Burnout'))

    fireEvent.click(screen.getByText('Mulai Dari Awal'))

    expect(screen.queryByText('Asesmen Anxiety & Burnout')).not.toBeInTheDocument()
  })
})
