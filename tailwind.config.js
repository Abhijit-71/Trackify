const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      width:{
        '90': '90%'
      },
      fontFamily: {
        degular: ['Degular', 'sans-serif'],
        jetsbrain:['Jetsbrain','monospace']
      },
    },
  },
  plugins: [flowbiteReact],
}