import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/react/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ral: {
          1026: "#FFFF00",
          3000: "#A72920",
          3001: "#9B2423"
        },
        silver: "#C0C0C0",
      }
    },
  },
  plugins: [],
}

export default config;
