const variables = require('../web/shared/constants/build/index.cjs')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),
    require('postcss-mixins'),
    require('postcss-nested'),
    require('postcss-simple-vars')({ variables }),
    require('postcss-custom-media'),
  ],
}
