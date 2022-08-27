module.exports = {
    content: ["./public/**/*.{html, css, js}", "./public/js/**/*.js"],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'),
      // ...
    ],
  }