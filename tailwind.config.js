/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'before-link': '100px 0px 50px 100px rgb(58 130 246 / 25%)',
        'before-nav': '-10px 120px 200px 200px rgb(34 197 94 / 15%)',
        'player': '0px 0px 50px 50px rgb(0 0 0 / 25%)',
      },
      maxHeight: {
        'content': 'calc(100vh - 102px)',
      },
      maxWidth: {
        'player': 'calc(100% - 280px)',
        'action-info': 'calc(100% - 65px)'
      },
    },
  },
  plugins: [],
}