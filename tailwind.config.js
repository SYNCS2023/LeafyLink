/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#047857',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#047857',

          secondary: '#65a30d',

          accent: '#0f766e',

          neutral: '#2b3440',

          'base-100': '#ffffff',

          info: '#3abff8',

          success: '#36d399',

          warning: '#fbbd23',

          error: '#f87272',
        },
      },
    ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
};
