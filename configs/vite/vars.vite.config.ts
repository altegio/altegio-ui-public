import { defineConfig } from 'vite'
import path from 'path'
import cssInjectPlugin from './plugins/cssInjectPlugin.ts'
import extractConstsFromTokensPlugin from './plugins/extractConstsFromTokensPlugin.ts'
import cssBreakpointsInjectPlugin from './plugins/cssBreakpointsInjectPlugin.ts'
import scssBreakpointsPlugin from './plugins/scssBreakpointsPlugin.ts'
import commonConfig from './shared/common.vite.config.ts'
import { cssContent } from '../../tokens/index.ts'

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
        entry: path.resolve(import.meta.dirname, CONSTANTS_ENTRY_PATH),
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
