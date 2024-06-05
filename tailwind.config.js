/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, ts}"],
  prefix: 'tw-',
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },
}

