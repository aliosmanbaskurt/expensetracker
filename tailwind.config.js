/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'purple-heart': {
          '50': '#f8f3ff',
          '100': '#f1e9fe',
          '200': '#e6d6fe',
          '300': '#d1b5fd',
          '400': '#b68bfa',
          '500': '#985cf6',
          '600': '#803aed',
          '700': '#6d28d9',
          '800': '#5b21b6',
          '900': '#4c1d95',
          '950': '#311065',
      },
      },
    },
  },
  
  plugins: [],
}
