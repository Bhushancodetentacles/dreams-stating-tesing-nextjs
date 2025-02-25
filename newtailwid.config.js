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
		  background: 'var(--background-color)',
		  default: 'var(--default-color)',
		  heading: 'var(--heading-color)',
		  accent: 'var(--accent-color)',
		  surface: 'var(--surface-color)',
		  contrast: 'var(--contrast-color)',
		  nav: 'var(--nav-color)',
		  'nav-hover': 'var(--nav-hover-color)',
		  'nav-mobile-background': 'var(--nav-mobile-background-color)',
		  'nav-dropdown-background': 'var(--nav-dropdown-background-color)',
		  'nav-dropdown': 'var(--nav-dropdown-color)',
		  'nav-dropdown-hover': 'var(--nav-dropdown-hover-color)',
		},
		fontFamily: {
		  sans: ['Montserrat', 'sans-serif'],
		  heading: ['Mulish', 'sans-serif'],
		},
		fontWeight: {
		  light: 100,
		  regular: 400,
		  medium: 500,
		  bold: 700,
		  'extra-bold': 900,
		},
		fontSize: {
		  base: '1rem', 
		  lg: '1.25rem', 
		  xl: '1.5rem', 
		  '2xl': '2rem', 
		  '3xl': '2.5rem', 
		  '4xl': '3rem', 
		},
		boxShadow: {
		  DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.1)',
		  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
		  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
		  xl: '0 15px 20px rgba(0, 0, 0, 0.1)',
		},
		screens: {
		  sm: '640px',
		  md: '768px',
		  lg: '1024px',
		  xl: '1280px',
		  '2xl': '1536px',
		},
	  },
	},
	plugins: [],
	darkMode: 'class', 
  };
  