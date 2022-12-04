/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["*.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
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
