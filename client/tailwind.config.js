/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      'purps' : '#e2dffe',
      'grn' : '#e6ff82',
      'darkBlue' : '#02006b',
      'lightBlue': '#00E0FF',
    },
    extend: {},
  },
  plugins: [],
}

