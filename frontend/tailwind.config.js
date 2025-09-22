export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Roboto", "sans-serif"], // font mặc định
                hotel: ["Playfair Display", "serif"], // font cho chữ Hotel
            },
        },
    },
    plugins: [],
};
