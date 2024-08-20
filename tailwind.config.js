/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
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
    },
    borderRadius: {
      '10px': '10px',
    },
  },
  plugins: [
    function ({ addComponents }) {
      const components = {
        '.card': {
          backgroundColor: '#fff',
        },
        '.card:not(.last)': {
          marginBottom: '15px',
        },
        '.card2': {
          padding: '0 12px',
        },
        '.cardTitle': {
          padding: '18px 0',
        },
      };

      addComponents(components);
    },
  ]
}