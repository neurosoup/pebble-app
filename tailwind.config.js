const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: { colors: require('daisyui/colors') },
    boxShadow: {
      'inner-md': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui'), require('tailwindcss-textshadow')],
};
