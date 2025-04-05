/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['Homemade Apple', 'cursive'],
      },
    },
  },
  plugins: [],
};