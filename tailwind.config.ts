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
        // Brand Color System - Emerald Green Palette
        primary: {
          DEFAULT: '#10B981', // Emerald - Main brand color
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981', // Base
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },
        secondary: {
          DEFAULT: '#064E3B', // Dark Emerald - Professional
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#064E3B', // Base
          600: '#053D2F',
          700: '#042F24',
          800: '#032219',
          900: '#02160F',
          950: '#010B08',
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
          DEFAULT: '#D1FAE5', // Light Emerald - Backgrounds, cards
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#C4F8DD',
          300: '#A7F3D0',
          400: '#6EE7B7',
          500: '#D1FAE5', // Base
          600: '#34D399',
          700: '#10B981',
          800: '#059669',
          900: '#047857',
          950: '#065F46',
        },

        // shadcn/ui system colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: '#10B981', // Emerald for focus rings
        background: '#F0FDF8', // Very soft emerald-tinted white
        foreground: '#064E3B', // Dark emerald for text
        muted: {
          DEFAULT: '#D1FAE5', // Emerald-100
          foreground: '#064E3B',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#ECFDF5',
        },
        popover: {
          DEFAULT: '#D1FAE5',
          foreground: '#064E3B',
        },
        card: {
          DEFAULT: '#D1FAE5',
          foreground: '#064E3B',
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config
