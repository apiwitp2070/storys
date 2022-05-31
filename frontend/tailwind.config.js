module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './providers/ts/bg-gen.ts',
  ],
  theme: {
    extend: {
      height: {
        '112': '28rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
