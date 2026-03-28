/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 사이버 블루 액센트 + 딥 다크 배경 톤
        surface: {
          DEFAULT: "#0a0a0a",
          elevated: "#111111",
          glass: "rgba(255, 255, 255, 0.04)",
        },
        accent: {
          DEFAULT: "#22d3ee",
          muted: "#0891b2",
          glow: "rgba(34, 211, 238, 0.35)",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.4)",
        accent: "0 0 40px -8px rgba(34, 211, 238, 0.25)",
      },
    },
  },
  plugins: [],
};
