import { defineConfig } from 'vite'
import path from 'path'
import removeInternalLinksPlugin from '../plugins/removeInternalLinksPlugin.ts'

export default defineConfig({
  define: {
    STORYBOOK_ANGULAR_OPTIONS: JSON.stringify({ experimentalZoneless: true }),
  },
  css: {
    postcss: path.resolve(import.meta.dirname, '../../'),
  },
  resolve: {
    alias: {
      '~web': path.resolve(import.meta.dirname, '../../../web'),
      '~core': path.resolve(import.meta.dirname, '../../../web/core/src'),
      '~vue': path.resolve(import.meta.dirname, '../../../web/vue/src'),
      '~ng': path.resolve(import.meta.dirname, '../../../web/angular/src'),
      '~shared': path.resolve(import.meta.dirname, '../../../web/shared'),
      '~tokens': path.resolve(import.meta.dirname, '../../../tokens'),
      '~configs': path.resolve(import.meta.dirname, '../../../configs'),
      '~root': path.resolve(import.meta.dirname, '../../../'),
    },
  },

  plugins: [
    process.env.STORYBOOK_PUBLIC_BUILD === '1'
      ? removeInternalLinksPlugin()
      : undefined
  ]
})
