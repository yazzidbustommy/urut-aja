/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-green": "#57663d",
        "main-green-darker": "#3f4a2c",
        "main-choc": "#926d57",
        "main-grey": "#f3f4f6",
      },
    },
    fontFamily: {
      inter: ['"Inter"', "sans-serif"],
      prompt: ["Prompt", "sans-serif"],
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          colors: {
            secondary: "#FFFFF",
            primary: "#967258",
          },
        },
        dark: {
          // ...
          colors: {},
        },
        // ... custom themes
      },
    }),
  ],
};
