module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mulish", "sans-serif"],
      },
      container: {
        center: true,
        screens: {
          lg: "1124px",
          xl: "1124px",
          "2xl": "1124px",
        },
      },
    },
  },
  // plugins: [require("@tailwindcss/forms")],
  plugins: [],
};
