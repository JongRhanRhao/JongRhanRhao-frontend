/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3f37c9",
        secondary: "#121212",
        text: "#e5e5f5",
        bg: "#000005",
        bg2: "#000005",
        accent: "#b40892",
      },
    },
    fontFamily: {
      sans: ["Lexend Deca", "sans-serif"],
      thai: ["Kanit", "sans-serif"],
    },
  },
  plugins: [daisyui],
};
