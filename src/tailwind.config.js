/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        colors: {
          'light-blue': '#E6F3FF',
          'medium-blue': '#4A90E2',
          'dark-blue': '#2C3E50',
          'yellow-accent': '#F9CE69',
        },
        fontFamily: {
          'sf-pro': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'bounce-slow': 'bounce 2s infinite',
          'spin-slow': 'spin 3s linear infinite',
        },
        backdropBlur: {
          'xs': '2px',
        },
        scale: {
          '102': '1.02',
        },
        boxShadow: {
          'glow': '0 0 20px rgba(249, 206, 105, 0.3)',
          'glow-lg': '0 0 50px rgba(249, 206, 105, 0.4)',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
      },
    },
    plugins: [],
  }