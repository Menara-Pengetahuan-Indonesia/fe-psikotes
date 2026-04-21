import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/tests/unit/**/*.{test,spec}.{ts,tsx}', 'src/tests/component/**/*.{test,spec}.{ts,tsx}', 'src/tests/schemas/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: [
        'src/tests/**',
        'src/components/ui/**',
        '**/*.d.ts',
      ],
      thresholds: {
        statements: 65,
        branches: 52,
        functions: 52,
        lines: 68,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
})