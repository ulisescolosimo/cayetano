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
        brand: {
          DEFAULT: '#318CE7',
          light: '#5BA3F0',
          dark: '#1E6BB8',
        },
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









