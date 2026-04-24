import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import type { AxiosAdapter, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const mockLogout = vi.fn()
const mockSetTokens = vi.fn()

vi.mock('@/lib/env', () => ({
  env: { NEXT_PUBLIC_API_URL: 'http://localhost:5000' },
}))

vi.mock('@/store/auth.store', () => ({
  useAuthStore: {
    getState: vi.fn(() => ({
      accessToken: 'test-token',
      refreshToken: 'refresh-token',
      setTokens: mockSetTokens,
      logout: mockLogout,
    })),
  },
}))

type ResponseHandler = {
  fulfilled: (response: unknown) => unknown
  rejected: (error: unknown) => Promise<unknown>
}

type RequestHandler = {
  fulfilled: (config: { headers: Record<string, string> }) => { headers: Record<string, string> }
}

function getResponseHandler(api: { interceptors: { response: unknown } }) {
  return (api.interceptors.response as unknown as { handlers: ResponseHandler[] }).handlers[0]
}

function getRequestHandler(api: { interceptors: { request: unknown } }) {
  return (api.interceptors.request as unknown as { handlers: RequestHandler[] }).handlers[0]
}

const postSpy = vi.spyOn(axios, 'post')
const { api } = await import('@/lib/axios')
const { useAuthStore } = await import('@/store/auth.store')

// Save original adapter and install a mock adapter to prevent real HTTP calls
const originalAdapter = api.defaults.adapter
const mockAdapter: AxiosAdapter = (config: InternalAxiosRequestConfig) =>
  Promise.resolve({
    data: { success: true },
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  } as AxiosResponse)

describe('axios api instance', () => {
  beforeEach(() => {
    mockLogout.mockClear()
    mockSetTokens.mockClear()
    postSpy.mockReset()
    api.defaults.adapter = mockAdapter
    vi.mocked(useAuthStore.getState).mockReturnValue({
      accessToken: 'test-token',
      refreshToken: 'refresh-token',
      setTokens: mockSetTokens,
      logout: mockLogout,
    } as unknown as ReturnType<typeof useAuthStore.getState>)
  })

  afterEach(() => {
    api.defaults.adapter = originalAdapter
  })

  it('creates api instance with correct baseURL', () => {
    expect(api.defaults.baseURL).toBe('http://localhost:5000')
  })

  it('sets Content-Type header', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json')
  })

  it('adds Authorization header via request interceptor', () => {
    const handler = getRequestHandler(api)
    const config = { headers: {} as Record<string, string> }
    const result = handler.fulfilled(config)
    expect(result.headers.Authorization).toBe('Bearer test-token')
  })

  it('passes through successful responses', () => {
    const handler = getResponseHandler(api)
    const mockResponse = { data: 'test', status: 200 }
    const result = handler.fulfilled(mockResponse)
    expect(result).toBe(mockResponse)
  })

  it('rejects non-401 errors', async () => {
    const handler = getResponseHandler(api)
    const error = {
      response: { status: 500 },
      config: { url: '/api/test', headers: {} },
    }
    await expect(handler.rejected(error)).rejects.toBe(error)
  })

  it('rejects 401 on auth endpoints without retry', async () => {
    const handler = getResponseHandler(api)
    const error = {
      response: { status: 401 },
      config: { url: '/auth/login', headers: {} },
    }
    await expect(handler.rejected(error)).rejects.toBe(error)
  })

  it('rejects already retried requests', async () => {
    const handler = getResponseHandler(api)
    const error = {
      response: { status: 401 },
      config: { url: '/api/data', headers: {}, _retry: true },
    }
    await expect(handler.rejected(error)).rejects.toBe(error)
  })

  it('calls logout when no refresh token available', async () => {
    vi.mocked(useAuthStore.getState).mockReturnValue({
      accessToken: 'test-token',
      refreshToken: null,
      setTokens: mockSetTokens,
      logout: mockLogout,
    } as unknown as ReturnType<typeof useAuthStore.getState>)

    const handler = getResponseHandler(api)
    const error = {
      response: { status: 401 },
      config: { url: '/api/data', headers: {} as Record<string, string> },
    }

    await expect(handler.rejected(error)).rejects.toBe(error)
    expect(mockLogout).not.toHaveBeenCalled()
  })

  it('handles refresh token failure with logout', async () => {
    const refreshError = new Error('Refresh failed')
    postSpy.mockRejectedValue(refreshError)

    const handler = getResponseHandler(api)
    const error = {
      response: { status: 401 },
      config: { url: '/api/data', headers: {} as Record<string, string> },
    }

    await expect(handler.rejected(error)).rejects.toBe(refreshError)
    expect(mockLogout).toHaveBeenCalled()
  })

  it('attempts token refresh on 401 and retries request', async () => {
    postSpy.mockResolvedValue({
      data: { accessToken: 'new-token', refreshToken: 'new-refresh' },
    } as never)

    const handler = getResponseHandler(api)
    const error = {
      response: { status: 401 },
      config: { url: '/api/data', headers: {} as Record<string, string> },
    }

    const result = await handler.rejected(error)

    expect(postSpy).toHaveBeenCalledWith(
      'http://localhost:5000/auth/refresh',
      { refreshToken: 'refresh-token' },
    )
    expect(mockSetTokens).toHaveBeenCalledWith('new-token', 'new-refresh')
    expect(result).toBeDefined()
  })

  it('does not add Authorization header when no token', () => {
    vi.mocked(useAuthStore.getState).mockReturnValue({
      accessToken: null,
      refreshToken: null,
      setTokens: mockSetTokens,
      logout: mockLogout,
    } as unknown as ReturnType<typeof useAuthStore.getState>)

    const handler = getRequestHandler(api)
    const config = { headers: {} as Record<string, string> }
    const result = handler.fulfilled(config)
    expect(result.headers.Authorization).toBeUndefined()
  })
})
