/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#082621',
          900: '#0b3d2e',
          800: '#0f4d3a',
          700: '#146349',
        },
        charcoal: {
          950: '#12130f',
          900: '#1a1b16',
          800: '#25261f',
        },
        gold: {
          600: '#a8811d',
          500: '#c9a227',
          400: '#d9b94a',
          200: '#ecd99a',
        },
        cream: {
          50: '#faf7f0',
          100: '#f3ecdc',
        },
        stone: {
          700: '#44433d',
          500: '#6b6a62',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        soft: '0 8px 30px -8px rgba(11, 61, 46, 0.25)',
        lift: '0 20px 45px -15px rgba(11, 61, 46, 0.35)',
      },
    },
  },
  plugins: [],
}
