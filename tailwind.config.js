

/** 
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        anotherbg:"var(--another-background-color)",
        default: "var(--default-color)",
        heading: "var(--heading-color)",
        accent: "var(--accent-color)",
        darkaccent: "var(--dark-accent-color)",
        surface: "var(--surface-color)",
        contrast: "var(--contrast-color)",
        pink: "var(--pink-color)",
        graph:"var(--graph-light-color)",
        grey: "var(--grey-color)",
        buttonhover: "var(--button-hover)",
        accentshade: "var(--light-shade-accent-color)",
        fadeshade: "var(--all-section-title-fade-color)",
        nav: "var(--nav-color)",
        "nav-hover": "var(--nav-hover-color)",
        "nav-mobile-background": "var(--nav-mobile-background-color)",
        "nav-dropdown-background": "var(--nav-dropdown-background-color)",
        "nav-dropdown": "var(--nav-dropdown-color)",
        "nav-dropdown-hover": "var(--nav-dropdown-hover-color)",
        footer: "var(--footer-background)",
        "footer-text": "var(--footer-color)",
        "footer-heading": "var(--foote-heading-color)",
      },
      fontFamily: {
        sans: ["var(--default-font)"],
        heading: ["var(--heading-font)"],
        nav: ["var(--nav-font)"],
      },
      fontWeight: {
        light: 100,
        regular: 400,
        medium: 500,
        bold: 700,
        "extra-bold": 900,
      },
      fontSize: {
        base: "1rem",
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "24px",
        "3xl": "2.5rem",
        "4xl": "3rem",
      },
      boxShadow: {
        DEFAULT: "0 2px 4px rgba(0, 0, 0, 0.1)",
        md: "0px 10px 50px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
        xl: "0px 5px 90px 0px rgba(0, 0, 0, 0.1)",
        hover:"0px 5px 35px 0px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        fadeInUp: "fadeInUp 0.7s ease-out",
        fadeInDown: "fadeInDown 0.7s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, 100%, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
        fadeInDown: {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, -100%, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
      },
	  translate: {
        '-8': '-8px', 
      },
      container: {
        center: true, 
        padding: '1rem', 
        screens: {
          DEFAULT: '100%', 
          lg: '1320px', 
        },
      },
      containerfluid: {
        center: true, 
        padding: '2rem', 
        screens: {
          DEFAULT: '100%', 
          lg: '100%', 
        },
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right top, #ada1c0, #b9aec9, #c5bcd3, #d1c9dc, #ddd7e6, #ddd7e6, #ddd7e6, #ddd7e6, #d1c9dc, #c5bcd3, #b9aec9, #ada1c0)',
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
