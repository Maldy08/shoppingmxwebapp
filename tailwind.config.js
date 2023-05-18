/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            gridTemplateColumns: {
                sidebar: "300px auto", //for sidebar layout
                "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
            },
        },
    },
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],

    plugins: [
        require('@tailwindcss/forms'),
    ],
}