/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
          buttonPrimary: '#383838',
          buttonPecondaryHover:'#f2f2f2',
          browny: '#8f6b5d',
      }
    },
  },
  plugins: [],
}