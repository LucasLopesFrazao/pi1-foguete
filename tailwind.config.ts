import type { Config } from 'tailwindcss'
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial-foguete': 'radial-gradient(circle at 3% 100%, rgba(16,11,31,1) 0%, rgba(26,101,112,0.84) 50%, rgba(0,0,0,1) 100%)',
        'gradient-radial-tela-inicial': 'radial-gradient(circle at 3% 100%, rgba(16,11,31,1) 0%, rgba(112,26,70,0.84) 50%, rgba(0,0,0,1) 100%)'
      },
      colors: {
        'color1Foguete': '#100B1F',
        'color2Foguete': '#1A6570',
        'color3Foguete': '#000000',
      }
    },
  },
  plugins: [],
}) 


