/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        content: "rgb(var(--color-content) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        "bg-menu": "rgb(var(--bg-menu) / <alpha-value>)",
        contrast: "rgb(var(--color-contrast) / <alpha-value>)",
      },
      height: {
        menu: "calc(100dvh - 1.5rem)",
      },
      width: {
        menu: "calc(100dvw - 1.5rem)",
      },
      translate: {
        menu: "120%",
      },
      inset: {
        "35%": "35%",
      },
      fontWeight: {
        weight: "var(--font-weight)",
      },
    },
  },
  plugins: [],
};
