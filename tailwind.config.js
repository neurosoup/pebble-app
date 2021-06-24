const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: { colors: require('daisyui/colors') },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
