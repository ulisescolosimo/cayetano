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
        display: ['var(--font-knewave)', 'cursive'],
        sans: ['var(--font-inter-tight)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config




