/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tesla-red': '#E31E2D',
        'tesla-red-dark': '#C41E3A',
        'tesla-red-darker': '#A01828',
        'tesla-red-light': '#FEE2E2',
        'tesla-dark': '#171A20',
        'tesla-gray': '#393C41',
      },
      fontFamily: {
        'sans': ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
