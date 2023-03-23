/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
      'imperium-green': '#005F50',
      'imperium-gold': '#B09A70',
      'imperium-hover-green': '#003300',
      'imperium-hover-gold': '#a67b5b',
      'imperium-purple': '#8F00FF'
    },},
  },
  plugins: [require('@tailwindcss/forms')],
}
