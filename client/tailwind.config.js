import { colors, sizes, spacing } from './src/configs/constants';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
      fontSize: sizes,
      spacing,
      fontFamily: {
        sans: ['Rambla', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
