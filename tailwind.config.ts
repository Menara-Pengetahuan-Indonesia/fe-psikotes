import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Color System - Teal & Amber Palette
        primary: {
          DEFAULT: '#14B8A6', // Teal - Main brand color
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6', // Base
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        secondary: {
          DEFAULT: '#134E4A', // Dark Teal - Professional
          50: '#E6F5F4',
          100: '#CDEBE9',
          200: '#9BD7D3',
          300: '#69C3BD',
          400: '#37AFA7',
          500: '#134E4A', // Base
          600: '#104240',
          700: '#0D3633',
          800: '#0A2A27',
          900: '#071E1C',
          950: '#041210',
        },
        accent: {
          DEFAULT: '#F59E0B', // Amber - CTAs, highlights
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Base
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        surface: {
          DEFAULT: '#CCFBF1', // Light Teal - Backgrounds, cards
          50: '#F0FDFA',
          100: '#E6FBF5',
          200: '#D9F9F0',
          300: '#CCFBF1',
          400: '#B2F5EA',
          500: '#CCFBF1', // Base
          600: '#81EDDD',
          700: '#5EEAD4',
          800: '#2DD4BF',
          900: '#14B8A6',
          950: '#0F766E',
        },

        // Pillar: Konseling - Indigo palette
        konseling: {
          DEFAULT: '#6366F1',
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          950: '#1E1B4B',
        },
        // Pillar: Pelatihan - Orange palette
        pelatihan: {
          DEFAULT: '#F97316',
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },

        // shadcn/ui system colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: '#14B8A6', // Primary teal for focus rings
        background: '#F0FDFA', // primary-50 light teal
        foreground: '#134E4A', // Secondary dark teal for text
        muted: {
          DEFAULT: '#CCFBF1', // Surface color
          foreground: '#134E4A',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#F0FDFA',
        },
        popover: {
          DEFAULT: '#CCFBF1', // primary-100
          foreground: '#134E4A',
        },
        card: {
          DEFAULT: '#CCFBF1', // primary-100
          foreground: '#134E4A',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'soft-xl': '0 8px 24px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-medium': 'float-medium 5s ease-in-out infinite',
        'float-fast': 'float-fast 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
