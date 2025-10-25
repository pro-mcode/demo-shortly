/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust to match your file structure
  ],
  safelist: [
    "border-gray-300",
    "border-black",
    "opacity-50",
    "cursor-not-allowed",
    "h-[18rem]",
    "rounded-b-2xl",
    "gap-x-2",
    "group-hover:translate-x-1/2",
    "transition",
    "ease-in-out",
    "duration-150",
  ],
  theme: {
    screens: {
      md: "800px",
      lg: "1020px",
      xxl: "4000px",
    },
    extend: {
      backgroundImage: {
        boostDesktop: "url('../images/bg-boost-desktop.svg')",
        boostMobile: "url('../images/bg-boost-mobile.svg')",
      },
      colors: {
        primary: "hsl(180, 66%, 49%)",
        extraPrimary: "hsl(180, 66%, 69%)",
        secondary: "hsl(257, 27%, 26%)",
        extraSecondary: "hsl(257, 7%, 63%)",
        postSecondary: "hsl(260, 8%, 14%)",
        intermediate: "hsl(0, 87%, 67%)",
        tertiary: "hsl(257, 11%, 22%)",
      },
      fontFamily: {
        sans: ["Epunda Sans", "sans-serif"],
        adm: ["Playwrite CA", "cursive"],
      },
      spacing: {
        180: "32rem",
      },
    },
  },
  plugins: [],
};
