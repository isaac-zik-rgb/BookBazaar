import { colors, sizes, spacing } from './src/configs/constants';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  important: '#root',
  theme: {
    extend: {
      colors,
      fontSize: sizes,
      spacing,
    },
  },
  plugins: [],
};
