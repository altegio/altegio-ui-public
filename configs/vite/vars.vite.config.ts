import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'
import cssInjectPlugin from './plugins/cssInjectPlugin'
import extractConstsFromTokensPlugin from './plugins/extractConstsFromTokensPlugin'
import cssBreakpointsInjectPlugin from './plugins/cssBreakpointsInjectPlugin'
import scssBreakpointsPlugin from './plugins/scssBreakpointsPlugin'
import commonConfig from './shared/common.vite.config'
import { cssContent } from '../../tokens'

const LIB_FILE_NAME_OUTPUT = 'index'
const CONSTANTS_ENTRY_PATH = '../../web/shared/constants/index.ts'
const CONSTANTS_OUT_PATH = 'web/shared/constants/build'
const TOKENS_OUT_PATH = 'web/shared/constants/tokens'
const CSS_TOKENS_OUT_PATH = 'web/shared/assets/css/build'
const BREAKPOINTS_OUT_PATH = 'web/shared/assets/css/build'
const BREAKPOINTS_SCSS_OUT_PATH = 'web/shared/assets/scss/build'

export default defineConfig(
  {
    build: {
      lib: {
        name: LIB_FILE_NAME_OUTPUT,
        entry: path.resolve(__dirname, CONSTANTS_ENTRY_PATH),
        formats: ['es', 'cjs'],
        fileName: format => {
          return format === 'es'
            ? `${LIB_FILE_NAME_OUTPUT}.mjs`
            : `${LIB_FILE_NAME_OUTPUT}.cjs`
        },
      },
      outDir: CONSTANTS_OUT_PATH,
      emptyOutDir: true,
    },
    plugins: [
      dts({
        outDir: CONSTANTS_OUT_PATH,
        rollupTypes: true,
        exclude: [
          'web/core/**/*',
          'web/angular/**/*',
          'web/vue/**/*',
          'web/shared/types/**/*',
          'web/shared/tests/**/*',
          'web/shared/utils/**/*',
        ],
      }),
      extractConstsFromTokensPlugin({
        outPath: TOKENS_OUT_PATH,
        fileName: 'index.ts',
      }),
      cssInjectPlugin({
        outPath: CSS_TOKENS_OUT_PATH,
        cssContent,
        fileName: 'root-css-variables.css',
      }),
      cssBreakpointsInjectPlugin({
        outPath: BREAKPOINTS_OUT_PATH,
        fileName: 'root-css-breakpoints.css',
      }),
      scssBreakpointsPlugin({
        outPath: BREAKPOINTS_SCSS_OUT_PATH,
      }),
    ],
    resolve: commonConfig.resolve,
  },
)
