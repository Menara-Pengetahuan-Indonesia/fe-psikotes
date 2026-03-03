import axios from 'axios'
import { env } from './env'
import { useAuthStore } from '@/store/auth.store'

const AUTH_ENDPOINTS = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh',
]

export const api = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
})

// For development, if frontend is on different port, adjust API URL
if (typeof window !== 'undefined' && window.location.port !== '3000') {
  // Frontend is on different port, API should still be on 5000
  // This is already handled by NEXT_PUBLIC_API_URL env var
}

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

function processQueue(
  error: unknown,
  token: string | null,
) {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    const isAuthEndpoint = AUTH_ENDPOINTS.some(
      (ep) => originalRequest?.url?.includes(ep),
    )

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isAuthEndpoint
    ) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization =
          `Bearer ${token}`
        return api(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    const { refreshToken, setTokens, logout } =
      useAuthStore.getState()

    if (!refreshToken) {
      isRefreshing = false
      logout()
      if (typeof window !== 'undefined') {
        window.location.href = '/masuk'
      }
      return Promise.reject(error)
    }

    try {
      const { data } = await axios.post(
        `${env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
        { refreshToken },
      )

      setTokens(data.accessToken, data.refreshToken)
      processQueue(null, data.accessToken)

      originalRequest.headers.Authorization =
        `Bearer ${data.accessToken}`
      return api(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      logout()
      if (typeof window !== 'undefined') {
        window.location.href = '/masuk'
      }
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)
