/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#435ebe",
                secondary: "#10b981",
                "mazer-dark": "#1e1e2d",
                "mazer-bg-dark": "#1a1a2e",
            }
        },
    },
    plugins: [],
}
