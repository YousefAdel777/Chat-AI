/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    screens: {
      "md": "768px",
      "lg": "992px",
      "xl": "1200px",
      "2xl": "1350px",
    },
    colors: {
      "white": "#fff",
      "gray": {
        300: "#f7f7f8",
        400: "#eee",
        600: "rgb(77 77 79)",
      },
      "black": "#202123",
      "slate": "rgb(52 53 65)",
      "red": "#ff4343cf",
    },
    fontFamily: {
      "Vietnam": ["Be Vietnam Pro", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}

