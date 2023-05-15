/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
        },
        extend: {
            gridTemplateColumns: {
                sidebar: "300px auto", //for sidebar layout
                "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}