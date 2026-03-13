import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: 'var(--destructive)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        brand: {
          DEFAULT: '#318CE7',
          light: '#5BA3F0',
          dark: '#1E6BB8',
        },
        'surface-dark': 'var(--surface-dark)',
        'surface-dark-modal': 'var(--surface-dark-modal)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        display: ['var(--font-shrikhand)', 'cursive'],
        sans: ['var(--font-inter-tight)', 'sans-serif'],
        // Alternativas de tipografía para títulos - para testear
        title1: ['var(--font-bebas-neue)', 'sans-serif'], // Bebas Neue - Impactante, bold
        title2: ['var(--font-montserrat)', 'sans-serif'], // Montserrat - Moderno, versátil
        title3: ['var(--font-oswald)', 'sans-serif'], // Oswald - Condensed, elegante
      },
    },
  },
  plugins: [],
}
export default config









