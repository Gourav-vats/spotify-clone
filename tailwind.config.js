module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      lime: {
        550: "#1ed760",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
