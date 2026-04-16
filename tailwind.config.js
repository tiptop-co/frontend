/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        terra: {
          DEFAULT: '#C2703E',
          light: 'rgba(194,112,62,0.08)',
        },
        forest: {
          DEFAULT: '#5B7C5A',
          light: '#EBF3EB',
        },
        muted: {
          DEFAULT: '#8A857D',
          bg: '#EDE8E0',
          light: '#F5F2ED',
        },
        danger: {
          DEFAULT: '#B84233',
          light: '#FDF0EC',
          border: '#E8A089',
        },
        ink: '#2D2A26',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'sans-serif',
        ],
      },
      maxWidth: {
        mobile: '430px',
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
