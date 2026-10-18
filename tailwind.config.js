/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgLight: '#FFFFFF',
        bgSubtle: '#F8F9FA',
        neutralBlack: '#111827',
        neutralDark: '#1F2937',
        neutralGray: '#6B7280',
        neutralMuted: '#9CA3AF',
        neutralLight: '#F3F4F6',
        neutralBorder: '#E5E7EB',
        neutralBorderDark: '#D1D5DB',
      },
      fontFamily: {
        sans: ['"Google Sans"', '"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
