module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      "desktop": "850px",
      "mobile": {"min": "1px", "max": "849px"}
    },

    maxWidth: {
      "180px": "180px",
      "220px": "220px",
      "450px": "450px",
      "1200px": "1200px"
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover"],
      padding: ["hover"]
    }
  },
  plugins: [],
}
