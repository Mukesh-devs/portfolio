/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-flow': 'gradient-flow 15s ease infinite',
        'shape-float-1': 'shape-float 20s ease-in-out infinite',
        'shape-float-2': 'shape-float 25s ease-in-out infinite',
        'shape-float-3': 'shape-float 18s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'shape-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(45deg)' },
        }
      },
      colors: {
        'light-bg-start': '#F0F2F5',
        'light-bg-end': '#E6E9EE',
        primary: {
          50: '#e8f2f7',
          400: '#a8dadc',
          500: '#98c1d9',
          600: '#457b9d',
          700: '#355f7a',
          800: '#264456',
        },
        secondary: {
          50: '#e8f2f7',
          400: '#98c1d9',
          500: '#457b9d',
          600: '#264456',
        },
        accent: {
          light: '#a8dadc',
          DEFAULT: '#98c1d9',
          dark: '#457b9d',
        },
      },
    },
  },
  plugins: [],
};