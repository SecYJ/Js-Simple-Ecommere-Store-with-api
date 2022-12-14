/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: "#6A33F8",
					light: "#9D7FEA",
					dark: "#5434A7",
					"extra-dark": "#301E5F",
				},
				danger: "#C72424",
			},
		},
	},
	plugins: [],
};
