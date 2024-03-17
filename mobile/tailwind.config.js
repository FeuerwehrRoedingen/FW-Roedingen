/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        silver: '#C0C0C0',
        ral: {
          1026: "#FFFF00",
          3000: "#A72920",
          3001: "#9B2423"
        },
      },
    },
  },
  plugins: [],
}

