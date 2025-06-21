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
    },
  },
  plugins: [],
} 