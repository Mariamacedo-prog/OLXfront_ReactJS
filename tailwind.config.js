module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      Open: ["Open Sans", "ui-sans-serif"],
    },
    extend: {},
    backgroundColor: (theme) => ({
      ...theme("colors"),
      Verde: "#9bb83c",
    }),
    boxShadow: {
      new: "0 0 4px #999",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
