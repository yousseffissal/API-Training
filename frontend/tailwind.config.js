/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        custom: '1050px', // Our brakepoint for the screen
      },
    },
  },
  plugins: [],
}