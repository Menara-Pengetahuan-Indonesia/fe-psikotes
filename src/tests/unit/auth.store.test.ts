import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuthStore, useAuthStoreHydrated } from '@/store/auth.store'
import type { User } from '@/store/auth.store'

const MOCK_USER: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user',
}

// Mock localStorage for persist middleware
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('useAuthStore', () => {
  beforeEach(() => {
    localStorageMock.clear()
    useAuthStore.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      _hasHydrated: false,
    })
  })

  it('has correct initial state', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.accessToken).toBeNull()
    expect(state.refreshToken).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('setAuth updates user and tokens', () => {
    act(() => {
      useAuthStore.getState().setAuth(
        MOCK_USER,
        'access-token',
        'refresh-token',
      )
    })

    const state = useAuthStore.getState()
    expect(state.user).toEqual(MOCK_USER)
    expect(state.accessToken).toBe('access-token')
    expect(state.refreshToken).toBe('refresh-token')
    expect(state.isAuthenticated).toBe(true)
  })

  it('setTokens updates only tokens', () => {
    act(() => {
      useAuthStore.getState().setAuth(
        MOCK_USER,
        'old-access',
        'old-refresh',
      )
      useAuthStore.getState().setTokens(
        'new-access',
        'new-refresh',
      )
    })

    const state = useAuthStore.getState()
    expect(state.accessToken).toBe('new-access')
    expect(state.refreshToken).toBe('new-refresh')
    expect(state.user).toEqual(MOCK_USER)
  })

  it('logout clears all auth state', () => {
    act(() => {
      useAuthStore.getState().setAuth(
        MOCK_USER,
        'access-token',
        'refresh-token',
      )
      useAuthStore.getState().logout()
    })

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.accessToken).toBeNull()
    expect(state.refreshToken).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })
})

describe('useAuthStoreHydrated', () => {
  beforeEach(() => {
    localStorageMock.clear()
    useAuthStore.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      _hasHydrated: false,
    })
  })

  it('returns safe defaults before hydration', () => {
    useAuthStore.setState({
      user: MOCK_USER,
      accessToken: 'token',
      refreshToken: 'refresh',
      isAuthenticated: true,
      _hasHydrated: false,
    })

    const { result } = renderHook(() => useAuthStoreHydrated())

    expect(result.current.user).toBeNull()
    expect(result.current.accessToken).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('returns real state after hydration', () => {
    useAuthStore.setState({
      user: MOCK_USER,
      accessToken: 'token',
      refreshToken: 'refresh',
      isAuthenticated: true,
      _hasHydrated: true,
    })

    const { result } = renderHook(() => useAuthStoreHydrated())

    expect(result.current.user).toEqual(MOCK_USER)
    expect(result.current.accessToken).toBe('token')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('exposes store actions', () => {
    useAuthStore.setState({ _hasHydrated: true })
    const { result } = renderHook(() => useAuthStoreHydrated())

    expect(typeof result.current.setAuth).toBe('function')
    expect(typeof result.current.logout).toBe('function')
    expect(typeof result.current.setTokens).toBe('function')
  })
})
