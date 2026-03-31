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
        cream: {
          DEFAULT: '#F9F6F1',
          50: '#FDFCF9',
          100: '#F9F6F1',
          200: '#F0E9DC',
          300: '#E5DACB',
        },
        charcoal: '#2A2420',
        muted: '#8C7E6E',
        warm: {
          100: '#EDE6DB',
          200: '#D9D0C5',
          300: '#C4B5A2',
          400: '#A89080',
          500: '#8C7E6E',
          600: '#6B5D4E',
          700: '#4E4138',
          800: '#332D26',
        },
        honey: {
          DEFAULT: '#C49A6C',
          50: '#FBF0E2',
          100: '#F3D9B5',
          200: '#E8BE84',
          dark: '#A67C4E',
        },
        sage: {
          DEFAULT: '#7A9B7E',
          50: '#EAF2EB',
          100: '#C8DBC9',
          200: '#9DBFA0',
          dark: '#5D7A61',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #F9F6F1 0%, #F0E9DC 100%)',
        'gradient-sage': 'linear-gradient(135deg, #EAF2EB 0%, #C8DBC9 100%)',
        'gradient-honey': 'linear-gradient(135deg, #FBF0E2 0%, #E8BE84 100%)',
      },
    },
  },
  plugins: [],
}

export default config
