


const twColors = require('tailwindcss/colors')

const colors = {
  cell: "#101F3C",
  bgPrimary: "#081325",
  red: twColors.red,
  green: twColors.green,
  gray: twColors.gray,
  yellow: twColors.yellow,
  transparent: twColors.transparent
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: colors,
      gridTemplateRows: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}

