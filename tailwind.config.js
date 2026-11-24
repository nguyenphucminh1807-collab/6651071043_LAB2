/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Breakpoint đúng đề bài: <640 mobile · 640–1024 tablet · >1024 desktop
    screens: {
      sm: '640px',
      lg: '1025px',
      xl: '1280px',
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#059669',
          dark: '#047857',
          darker: '#065F46',
          light: '#D1FAE5',
        },
        surface: '#FFFFFF',
        canvas: '#F8FAFC',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', '-apple-system', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
