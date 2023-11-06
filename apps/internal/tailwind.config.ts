import type { Config } from 'tailwindcss'

import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx,mdx}",
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
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        dark : {
          colors: {
            danger: "#A72920",
            foreground: "#c0c0c0",
            warning: "#FFFF00",
          }
        }
      },
    })
  ],
}

export default config;
