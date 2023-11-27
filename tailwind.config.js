/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './react-bricks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        mmd: '925px',
        container: '1151px',
      },
      textColor: {
        primary: '#F2A71B',
        secondary: '#2D4191',
        tertiary: '#F37335',
      },
      backgroundColor: {
        primary: '#FA6400',
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans'],
        kanit: ['Kanit', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        'dancing-script': ['Dancing Script', 'cursive'],
      },
      backgroundImage: {
        'gradient-custom-130': 'linear-gradient(130deg, #F7B500, #155799)',
        'gradient-custom-orange':
          'linear-gradient(180deg, #FDC830 0%, #F37335 100%)',
        'gradient-custom-blue':
          'linear-gradient(180deg, #159957 0%, #155799 100%)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { transform: 'translate3d(0, 100%, 0)', opacity: 0 },
          '100%': { transform: 'none', opacity: 1 },
        },
        stretch: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'none' },
        },
      },
      animation: {
        fadeInUp1: 'fadeInUp 1s linear 0s 1 normal both',
        fadeInUp2: 'fadeInUp 1s linear 0.15s 1 normal both',
        fadeInUp3: 'fadeInUp 1s linear 0.3s 1 normal both',
        fadeInUp4: 'fadeInUp 1s linear 0.45s 1 normal both',
        stretch1: 'stretch 1s linear 0s 1 normal both',
      },
      borderWidth: {
        0.5: '0.5px',
      },
      rotate: {
        flip: { transform: 'rotate3d(0, 1, 0, 180deg)' },
      },
    },
  },
  plugins: [],
}
