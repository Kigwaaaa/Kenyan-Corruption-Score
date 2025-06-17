/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kenya-red': '#CE1126',
        'kenya-black': '#000000',
        'kenya-white': '#FFFFFF',
        'kenya-green': '#009A49',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      fontSize: {
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
      },
      minHeight: {
        '12': '48px',
      },
    },
  },
  plugins: [],
} 