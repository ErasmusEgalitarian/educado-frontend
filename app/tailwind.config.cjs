/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
 
    extend: {
      colors: {
        primary: '#5ECCE9',
        secondary: '#F1F9FB',
        tertiary: '#FFFFFF',
        primaryHover: ' #4DAACB',
        primaryLight: '#c9e4eb',
        warning: '#FF4949'
      },
    },
    
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("daisyui")
  ],
  daisyui: {
    themes: true,
  },
}