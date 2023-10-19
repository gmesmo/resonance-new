/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        content: "rgb(var(--color-content) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        bg: "rgb(var(--color-bg) / <alpha-value>)",
      },
      height: {
        menu: "calc(100dvh - 1.5rem)",
      },
      translate: {
        menu: "123%",
      },
    },
  },
  plugins: [],
};
