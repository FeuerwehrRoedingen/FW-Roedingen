/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ral: {
          3000: '#a72920',
          3020: '#bb1e10'
        },
        gold: '#daa520',
        silver: '#c0c0c0'
      },
      height: {
        '1/10': '10vh'
      },
      minHeight: {
        '40p': '40px'
      }
    },
  },
  variants: {
    extends: {}
  },
  plugins: [],
}
