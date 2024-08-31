/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f8b602",
        secondary: "#ffffff",
        accent: "#2e2e2e",
        accent2: "#363636",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      thai: ["Pridi", "sans-serif"],
    },
  },
  plugins: [daisyui],
};
