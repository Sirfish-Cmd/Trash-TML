/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js,css}",
    "./public/components/**/*.html",
    "./public/js/**/*.{html,js,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class", // Enables dark mode with the 'dark' class
};
