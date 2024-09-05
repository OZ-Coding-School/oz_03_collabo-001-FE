/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'breakPoint': '398px',
      },
    },
    colors: {
      'transparent': 'transparent',
      'white': '#ffffff',
      'primary': '#f78222',
      'background': '#f6f6f6',
      'border': '#dddddd',
      'tag': '#f2f2f2',
      'tag2': '#fde6d2',
      // text color
      'main': '#000000',
      'caption': '#666666',
      'nav': '#b1b1b1',
      'black-50': 'rgba(0,0,0,0.5)'
    },
    backgroundImage: {
      'checkBox': "url('/src/assets/Icon/Detail_Icon/Check.svg')",
    },
  },
  plugins: [
    function ({ addComponents }) {
      const components = {
        '.col': {
          backgroundColor: '#fff',
          padding: '0 12px',
        },
        '.colTitle': {
          padding: '18px 0',
        },
      };

      addComponents(components);
    },
  ]
}