/** @type {import('tailwindcss').Config} */
export const content = [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
    extend: {},
};
export const plugins = [require("daisyui")];
export const daisyui = {
    styled: true,
    themes: ["light", "dark"],
    base: true,
    utils: true,
};
