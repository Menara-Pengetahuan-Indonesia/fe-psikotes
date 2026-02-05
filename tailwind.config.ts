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
        // Brand Color System - Psikotes Palette
        primary: {
          DEFAULT: '#A0C878', // Medium Green - Main brand color
          50: '#F3F8EC',
          100: '#E6F1D9',
          200: '#D0E4B8',
          300: '#BAD797',
          400: '#A0C878', // Base
          500: '#8AB965',
          600: '#6FA04E',
          700: '#57803E',
          800: '#3F602F',
          900: '#27401F',
          950: '#1A2B15',
        },
        secondary: {
          DEFAULT: '#143D60', // Dark Navy - Professional, trustworthy
          50: '#E8EDF3',
          100: '#D1DBE7',
          200: '#A3B7CF',
          300: '#7593B7',
          400: '#476F9F',
          500: '#143D60', // Base
          600: '#103454',
          700: '#0C2B48',
          800: '#08223C',
          900: '#041930',
          950: '#021224',
        },
        accent: {
          DEFAULT: '#EB5B00', // Orange - CTAs, highlights
          50: '#FEF3E6',
          100: '#FDE7CC',
          200: '#FBCF99',
          300: '#F9B766',
          400: '#F79F33',
          500: '#EB5B00', // Base
          600: '#C24C00',
          700: '#993D00',
          800: '#702E00',
          900: '#471F00',
          950: '#331600',
        },
        surface: {
          DEFAULT: '#DDEB9D', // Light Yellow-Green - Backgrounds, cards
          50: '#FDFEF7',
          100: '#FBFDEF',
          200: '#F5FADB',
          300: '#EFF7C7',
          400: '#E9F4B3',
          500: '#DDEB9D', // Base
          600: '#C8DD6E',
          700: '#B3CF3F',
          800: '#8FA630',
          900: '#6B7D24',
          950: '#4D5A1A',
        },

        // shadcn/ui system colors (NO WHITE - using light greens)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: '#A0C878', // Use primary green for focus rings
        background: '#F3F8EC', // primary-50 light green
        foreground: '#143D60', // Use secondary navy for text
        muted: {
          DEFAULT: '#DDEB9D', // Use surface color
          foreground: '#143D60',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#F3F8EC', // primary-50 instead of white
        },
        popover: {
          DEFAULT: '#E6F1D9', // primary-100
          foreground: '#143D60',
        },
        card: {
          DEFAULT: '#E6F1D9', // primary-100
          foreground: '#143D60',
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
