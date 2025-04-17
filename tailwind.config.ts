module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', 
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        'tm-blue': '#4380EC',
        'tm-green': '#22C55E',
      },
    },
    screens: {
      sm: '480px',  // custom size for sm
      md: '768px',  // custom size for md
      lg: '1024px', // custom size for lg
      xl: '1280px', // custom size for xl
    },
  },
  plugins: [],
};
