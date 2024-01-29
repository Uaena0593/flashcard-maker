/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: '#f2f2f2'
      },
      fontFamily: {
        custom: ['Roboto Mono', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

