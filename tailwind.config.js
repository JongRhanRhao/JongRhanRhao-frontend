/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#89fc00",
        secondary: "#121212",
        text: "#FAF9F6",
        bg: "#070707",
        bg2: "#070707",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
    fontFamily: {
      sans: ["Prompt", "sans-serif"],
    },
  },
  daisyui: {
    theme: {
      mytheme: {
        primary: "#89fc00",
        secondary: "#121212",
      },
    },
  },
  plugins: [daisyui],
};
