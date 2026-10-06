import { defineConfig } from 'vite'
import path from 'path'
import removeInternalLinksPlugin from '../plugins/removeInternalLinksPlugin'

export default defineConfig({
  define: {
    STORYBOOK_ANGULAR_OPTIONS: JSON.stringify({ experimentalZoneless: true }),
  },
  css: {
    postcss: path.resolve(__dirname, '../../'),
  },
  resolve: {
    alias: {
      '~web': path.resolve(__dirname, '../../../web'),
      '~core': path.resolve(__dirname, '../../../web/core/src'),
      '~vue': path.resolve(__dirname, '../../../web/vue/src'),
      '~ng': path.resolve(__dirname, '../../../web/angular/src'),
      '~shared': path.resolve(__dirname, '../../../web/shared'),
      '~tokens': path.resolve(__dirname, '../../../tokens'),
      '~configs': path.resolve(__dirname, '../../../configs'),
      '~root': path.resolve(__dirname, '../../../'),
    },
  },

  plugins: [
    process.env.STORYBOOK_PUBLIC_BUILD === '1'
      ? removeInternalLinksPlugin()
      : undefined
  ]
})
