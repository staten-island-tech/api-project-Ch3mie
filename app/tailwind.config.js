/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./main.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/daisyui/dist/**/*.js", // Fixed typo
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
