/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        btnclr: "#3F5EEE",
        ptext : "#D1D5DB",
        bcolor : "#CCCCCC",
        card : "#27272A"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "san-serif"],
      },
    },
  },
  plugins: [],
};
