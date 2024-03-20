/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
            'blockquote p': { fontStyle: 'normal' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

