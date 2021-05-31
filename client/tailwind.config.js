module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      "DK-header": "850px",
      "MB-header": {"min": "1px", "max": "849px"}
    }
  },
  variants: {
    extend: {
      borderWidth: ["hover"],
      padding: ["hover"]
    }
  },
  plugins: [],
}
