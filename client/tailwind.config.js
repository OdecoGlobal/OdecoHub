/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#DB4444',
        secondary: '#e2e8f0',
        secondary2: '#A0BCE0',
        tetiary: '#F5F5F5',
        accent: '#00FF66',

        loginBackground: '#cbe4e8',
      },
    },
  },
  plugins: [],
};
