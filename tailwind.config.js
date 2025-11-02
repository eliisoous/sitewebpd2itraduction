/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./components/*.js",
    "./assets/js/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'pd2i-blue': '#0083CA',
        'pd2i-black': '#000000',
        'pd2i-white': '#FFFFFF'
      },
      fontFamily: {
        'roboto': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif']
      }
    },
  },
  plugins: [],
}

