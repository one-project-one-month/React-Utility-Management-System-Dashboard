// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            secondary: {
              DEFAULT: "#2D9CDB",
            },
            danger: {
              DEFAULT: "#DD0303",
            },
          },
        },
        light: {
          colors: {
            background: "#F5F5F5",
            foreground: "#000000",
            focus: "#FF9950",
            // primary: {
            //   50: "#F8F8F8",
            //   100: "#F0F0F0",
            //   200: "#E6E6E6",
            //   300: "#DCDCDC",
            //   400: "#C8C8C8",
            //   500: "#B4B4B4",
            //   600: "#999999",
            //   700: "#7F7F7F",
            //   800: "#4C4C4C",
            //   900: "#262626",
            //   DEFAULT: "#C9CDCF",
            // },
            secondary: {
              DEFAULT: "#2D9CDB",
            },
            danger: {
              DEFAULT: "#DD0303",
            },
          },
          layout: {
            disabledOpacity: "0.4",

            radius: { sm: "4px", md: "6px", lg: "8px", full: "9999px" },

            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
