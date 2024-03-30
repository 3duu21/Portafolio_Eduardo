/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#006666  ",
        "secondary": "#FFFF00 ",
        "tertiary": "#0F2929 ",
      }
    },
    screens: {
      'lg': { 'max': '2023px' },
      // => @media (max-width: 1023px) { ... }

      'sm': { 'max': '1000px' },
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
}