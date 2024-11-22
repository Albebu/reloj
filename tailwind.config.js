/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        host: ["Host Grotesk", "sans-serif"],
      },
      colors: {
        primary: "#3D348B",
        secondary: "#7678ED",
        tertiary: "#F7B801",
        quaternary: "#F18701",
        quinary: "#F35B04",
      },
    },
  },
  plugins: [],
};
