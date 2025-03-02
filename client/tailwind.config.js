import forms from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // Use `content` instead of `purge`
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      screens: {
        mf: "990px",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(120%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
      },
    },
  },
  plugins: [forms],
};
