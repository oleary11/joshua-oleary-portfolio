/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      keyframes: {
        launchAndReturn: {
          '0%': { transform: 'translateX(0) scale(1)', opacity: 1 },
          '50%': { transform: 'translateX(300px) scale(1.2)', opacity: 0.8 },
          '100%': { transform: 'translateX(0) scale(1)', opacity: 1 },
        },
        launchSideways: {
          '0%': { transform: 'translateX(0) scale(1)', opacity: 1 },
          '50%': { transform: 'translateX(100px) scale(1.2)', opacity: 0.8 },
          '100%': { transform: 'translateX(300px) scale(0.8)', opacity: 0 },
        },
        bounceSlow: {
          '0%, 100%': {
            transform: 'translateY(-15%)',
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)"
          },
          '50%': {
            transform: "translateY(0)",
            "animation-timing-function":" cubic-bezier(0, 0, 0.2, 1)"
          }
        },
        moveAround: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(20px, -10px)' },
          '50%': { transform: 'translate(-40px, 20px)' },
          '75%': { transform: 'translate(30px, 10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(10px) translateX(10px)' },
        },
        smoothFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
      },
      animation: {
        'bounce2': 'bounceSlow 3s  infinite',
        'wiggle': 'wiggle 10s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'move-slow': 'moveAround 5s ease-in-out infinite',
        'float-slow': 'float 2s ease-in-out infinite',
        'smooth-float': 'smoothFloat 2s ease-in-out infinite',
        'launch-sideways': 'launchSideways 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards',
        'launch-return': 'launchAndReturn 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards',
      },
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        'text-gradient': 'linear-gradient(90deg, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 0) 120%)',
      },
      fontFamily: {
        roboto: ['Roboto','sans-serif'],
      },
      boxShadowColor: {
        custom: '0 0 4px 0 rgba(0, 0, 0, 0.25)'
      }
      
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.bg-clip-text': {
          '-webkit-background-clip': 'text',
        },
        '.text-fill-transparent': {
          '-webkit-text-fill-color': 'transparent',
        },
      })
    },
  ],
};