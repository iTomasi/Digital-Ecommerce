module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      "DK-header": "850px",
      "MB-header": {"min": "1px", "max": "849px"}
    },

    maxWidth: {
      "180px": "180px",
      "220px": "220px"
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
