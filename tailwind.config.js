/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
      'imperium-green': '#005F50',
      'imperium-gold': '#B09A70',
      'imperium-hover': '#003300'
    },},
  },
  plugins: [require('@tailwindcss/forms')],
}
