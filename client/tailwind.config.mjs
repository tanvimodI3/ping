/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        desktop:"url('/images/background.jpg')"
      },
      fontFamily:{
        w95:["w95"]
      },
      colors:{
        contrastbg:"var(--contrastbg)",
        lightest:"var(--lightest)",
        light:"var(--light)",
        mid :"var(--mid)",
        shadow :"var(--shadow)",
        dark :"var(--dark)",
        darkest :"var(--darkest)"
},                            
      
    },
  },
  variants: {},
  plugins: [],
}