/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{html,js,ts,jsx,tsx}",
    "./src/layouts/**/*.{html,js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'pink': '#FFC0CB',
      },
    },
  },
  plugins: [],
} 