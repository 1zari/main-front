/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 또는 app 디렉토리를 포함할 수도 있음: "./src/app/**/*.{js,ts,jsx,tsx}"
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
