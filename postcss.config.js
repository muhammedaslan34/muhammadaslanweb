module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'is-pseudo-class': false,
      },
    },
    '@tailwindcss/postcss': {},
  },
}