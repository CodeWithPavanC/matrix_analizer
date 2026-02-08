/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'calm-bg': '#f8f9fa',
        'calm-card': '#ffffff',
        'calm-border': '#e9ecef',
        'calm-text': '#212529',
        'calm-accent': '#6c757d',
        'calm-primary': '#5b7c99',
      },
      animation: {
        'gradient-slow': 'gradient 15s ease infinite',
        'fade-in': 'fadeIn 1.5s ease-in',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
