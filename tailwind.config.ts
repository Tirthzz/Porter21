import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                lama: "#F35C7A", // keep existing if needed
                primary: "#2E574D",      // header top note, primary buttons
                accent: "#F8962C",       // header text accent
                text: "#333333",         // general text
                border: "#EBE2E2",       // borders
                icon: "#007F99",         // icons, hover highlights
                background: "#FFFFFF",   // default background
                footerbg: "#F6F6F6",     // footer background
                secondary: "#222222",    // secondary buttons
            },
        },
    },
    plugins: [],
};

export default config;
