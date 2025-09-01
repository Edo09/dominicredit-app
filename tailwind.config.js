/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./App.{js,jsx,ts,tsx}",
  "./app/**/*.{js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}"
],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF4EB',
          100: '#FFE5D1',
          200: '#FFC29C',
          300: '#FF9E66',
          400: '#FF7A33',
          500: '#F45B0F', // Main
          600: '#D44E0C',
          700: '#B2410A',
          800: '#8F3308',
          900: '#6B2505',
        },
        secondary: {
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CFCFCF',
          300: '#A5A5A5',
          400: '#7A7A7A',
          500: '#0D0D0D', // Main dark
          600: '#0B0B0B',
          700: '#080808',
          800: '#050505',
          900: '#000000',
        },
        accent: {
          50: '#FFFFFF', // Main white
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#E5E5E5',
          400: '#D4D4D4',
          500: '#A3A3A3',
          600: '#737373',
          700: '#525252',
          800: '#404040',
          900: '#262626',
        },
      },
    },
  },
  plugins: [],
}
