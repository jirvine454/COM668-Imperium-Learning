/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {

      // that is animation class
      animation: {
        fade: 'fadeOut 1s ease-in-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeOut: {
          '0%': { opacity: '100%'},
          '100%': { opacity: '0%' },
        },
      }),

      colors: {
      'imperium-green': '#005F50',
      'imperium-gold': '#B09A70',
      'imperium-hover-green': '#003300',
      'imperium-hover-gold': '#a67b5b',
      'imperium-purple': '#8F00FF'
    },},
  },
  plugins: [require('@tailwindcss/forms'), require("tailwindcss-animation-delay")],
}
