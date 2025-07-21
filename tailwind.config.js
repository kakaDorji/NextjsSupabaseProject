/** @type {import('tailwindcss').Config} */
module.exports = {
  // CORRECTED: The paths now include the 'src' directory.
 content: [
  "./src/app/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  "./src/pages/**/*.{js,ts,jsx,tsx}",
],

  theme: {
    extend: {},
  },
  plugins: [],
  // REMOVED: The extra ']' typo at the end.
};