/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#FFD700",
        yellowBright: "#FFEA00",
        orangeWarm: "#FF8C00",
        blackDeep: "#0D0D0D",
        graySoft: "#1E1E1E",
      },
    },
  },
  plugins: [],
}
