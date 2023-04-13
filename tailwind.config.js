/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "starry-night": "url(/starry-night-sky.jpg)",
      },
    },
    fontFamily: {
      bak: ["var(--font-bakbakOne)"],
    },
  },
  plugins: [],
};
