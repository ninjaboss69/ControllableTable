/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0b2447",
        secondary: "#19376d",
        link: "#fff",
        success: "#47b548",
        danger: "#db2c23",
      },
    },
  },
  plugins: [],
};
