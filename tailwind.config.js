/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0D1B2A",
        "navy-mid": "#1B2A3B",
        "navy-light": "#253347",
        teal: "#00C9B1",
        purple: "#7B5EA7",
        gold: "#F5A623",
        muted: "#8A9BB0",
        danger: "#E05C5C"
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 201, 177, 0.18)"
      }
    }
  },
  plugins: []
};
