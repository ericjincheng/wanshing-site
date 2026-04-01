import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Brand Colors ─────────────────────────────────────────────
      colors: {
        ws: {
          red:        '#C8102E',
          'red-light': '#E0253F',
          'red-dark':  '#A00D24',
          'red-50':   '#FEF2F2',
          'red-100':  '#FEE2E2',
          'red-200':  '#FECACA',
        },
        steel: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
      },

      // ─── Typography ───────────────────────────────────────────────
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        accent:  ['"Instrument Serif"', 'serif'],
      },

      // ─── Animations ───────────────────────────────────────────────
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease-out both',
        'fade-up-d1': 'fadeUp 0.8s ease-out 0.15s both',
        'fade-up-d2': 'fadeUp 0.8s ease-out 0.3s both',
        'fade-up-d3': 'fadeUp 0.8s ease-out 0.45s both',
        'fade-up-d4': 'fadeUp 0.8s ease-out 0.6s both',
        'slide-right': 'slideRight 0.7s ease-out 0.2s both',
        'scale-in':   'scaleIn 0.6s ease-out 0.1s both',
        'marquee':    'marquee 30s linear infinite',
      },

      // ─── Box Shadows ──────────────────────────────────────────────
      boxShadow: {
        'ws-red':    '0 10px 40px -10px rgba(200, 16, 46, 0.2)',
        'ws-red-lg': '0 20px 60px -15px rgba(200, 16, 46, 0.25)',
      },
    },
  },
  plugins: [],
}

export default config
