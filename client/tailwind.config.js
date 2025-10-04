/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      white: "#ffffff",
      red: {
        100: "rgb(249, 115, 22)",
        200: "rgb(239, 97, 37)",
        900: "rgb(30, 15, 9)",
      },
      zinc: {
        50: "rgb(229, 231, 235)",
      },
      gray: {
        50: "rgb(166, 165, 164)",
        500: "rgb(70, 67, 63)",
        900: "rgb(229, 231, 235)",
      },
    },
    screens: {
      md: "576px",
      lg: "768px",
      xl: "1080px",
    },
    extend: {
      keyframes: {
        borderAnimation: {
          "0%": { borderColor: "violet" },
          "15%": { borderColor: "indigo" },
          "45%": { borderColor: "blue" },
          "60%": { borderColor: "rgb(239, 97, 37)"},
          "100%": { borderColor: "red"},
        },
      },
      animation: {
        "border-anim": "borderAnimation 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
