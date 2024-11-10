export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        ash: "#989E9C",
        textBlue: "#30414B",
        lightBlue: "#72858C",
        lightBg: "#DFD3BB",
        deepBg: "#AB9C85",
        secondaryBg: "#B3AE99"
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
