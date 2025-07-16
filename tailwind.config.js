/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        perceive: {
          purple: '#3F1470',
          'purple-light': '#5B2A91',
          'purple-dark': '#2A0B4F',
          gold: '#FFA301',
          'gold-light': '#FFB533',
          'gold-dark': '#CC8200',
        },
        dark: {
          bg: 'var(--color-bg, #0A0A0A)',
          'bg-secondary': 'var(--color-bg-secondary, #1A1A1A)',
          'bg-tertiary': 'var(--color-bg-tertiary, #2A2A2A)',
          border: 'var(--color-border, #333333)',
          text: 'var(--color-text, #E5E5E5)',
          'text-secondary': 'var(--color-text-secondary, #A0A0A0)',
        },
        light: {
          bg: 'var(--color-bg-light, #F8F9FB)',
          'bg-secondary': 'var(--color-bg-secondary-light, #FFFFFF)',
          'bg-tertiary': 'var(--color-bg-tertiary-light, #F1F3F7)',
          border: 'var(--color-border-light, #E0E0E0)',
          text: 'var(--color-text-light, #222222)',
          'text-secondary': 'var(--color-text-secondary-light, #666666)',
        },
        custom: {
          bg: 'var(--color-bg-custom, #FFF8E1)',
          'bg-secondary': 'var(--color-bg-secondary-custom, #FFE0B2)',
          'bg-tertiary': 'var(--color-bg-tertiary-custom, #FFD54F)',
          border: 'var(--color-border-custom, #FFA301)',
          text: 'var(--color-text-custom, #3F1470)',
          'text-secondary': 'var(--color-text-secondary-custom, #5B2A91)',
        }
      },
      animation: {
        'confidence-fill': 'confidence-fill 2s ease-out forwards',
        'slide-in': 'slide-in 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.2s ease-out forwards',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      keyframes: {
        'confidence-fill': {
          '0%': { transform: 'rotate(-90deg) scale(0.8)', opacity: '0.5' },
          '100%': { transform: 'rotate(-90deg) scale(1)', opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
};