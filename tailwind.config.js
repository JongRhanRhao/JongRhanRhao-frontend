/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3f37c9",
        secondary: "#ececec",
        accent: "#161a1d",
        accent2: "#15191c",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      thai: ["Pridi", "sans-serif"],
    },
  },
  plugins: [daisyui],
};
