/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'custom': 'cubic-bezier(.16, 1, .3, 1)',
      },
      transitionDuration: {
        '600': '600ms',
      },
      fontFamily:{
        'ds':'ds',
        'inr':'inr'
      },
      // : {
      //   'first': "url('./assets/img/hero-bg.svg')",
      //   'third': "url('./components/img/gym.jpg')",
      //   'brucelee': "url('./components/img/home-testimonial-bg.jpg')",
      //   'footer': "url('./components/img/dumbells.jpg')",
      
       
     
      // },
    },
  },
  plugins: [],
}