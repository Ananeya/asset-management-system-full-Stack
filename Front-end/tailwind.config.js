/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Include root HTML
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Include Vue and JS/TS files
  ],
  theme: {
    extend: {}, // Add custom theme configurations here
  },
  plugins: [], // Add Tailwind plugins here
};
