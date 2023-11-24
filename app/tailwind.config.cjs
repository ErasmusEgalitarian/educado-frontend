/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#5ECCE9',
                secondary: '#F1F9FB',
                tertiary: '#FFFFFF',
                primaryHover: ' #4DAACB',
                primaryLight: '#c9e4eb',
                warning: '#FF4949',
                white: "#FFFFFF",
                black: "#383838",
                grayLight: "#E4E4E4",
                grayMedium: "#A1ACB2",
                grayDark: "#383838",
                error: "#CF6679",
                success: "#4AA04A",
                disabled: "#E4F2F5",
                star: "#F1CC4F",
                darkBG: 'rgba(0,0,0,0.2)'
            },
            display: ["group-hover"],
            keyframes: {
                slidePopIn: {
                    '0%': { transform: 'scale(0.5) translateX(20rem)' },
                    '100%': { transform: 'scale(1) translateX(0)' }
                }
            },
            animation: {
                slidePopIn: 'slidePopIn 350ms cubic-bezier(0.57, 0.22, 0.24, 1.18) forwards',
                'bounce-short': 'bounce 1s ease-in-out 1.5',
                'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require("daisyui")
    ],
    // TODO: Add educado theme for daisyui?
    daisyui: {
        themes: ["light"],
    },
}