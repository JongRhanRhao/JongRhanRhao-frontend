/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#89fc00",
        secondary: "#121212",
        text: "#e7ecef",
        bg: "#070707",
        bg2: "#070707",
      },
    },
    fontFamily: {
      sans: ["Lexend Deca", "sans-serif"],
      thai: ["Kanit", "sans-serif"],
    },
  },
  plugins: [daisyui],
};
