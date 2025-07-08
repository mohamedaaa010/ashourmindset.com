/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#243044',
        'coral': '#FF6A4D',
        'aqua': '#3FD0C9',
        'porcelain': '#FAF7F3',
      },
      fontFamily: {
        'head': ['Poppins', 'sans-serif'],
        'body': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

