/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "card-color": "#f2f2f2",
        "blue-pokemon": "#30a7d7",
        "number-color": "#919191",
      },
    },
  },
  plugins: [],
};
