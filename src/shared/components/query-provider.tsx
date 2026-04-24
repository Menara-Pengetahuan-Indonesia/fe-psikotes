'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { useTokenRefresh } from '@/hooks/use-token-refresh'

function TokenRefreshManager() {
  useTokenRefresh()
  return null
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TokenRefreshManager />
      {children}
    </QueryClientProvider>
  )
}
