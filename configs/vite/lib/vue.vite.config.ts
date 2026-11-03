import { defineConfig, mergeConfig } from 'vite'
import path from 'path'
import baseConfig from '../shared/base.vite.config.ts'
import commonVueViteConfig from '../shared/commonVue.vite.config.ts'
import { getRollupOptionsInput } from '../utils/helpers.ts'

export const VUE_PATH = 'web/vue'
const LIB_ENTRY_PATH = path.resolve(import.meta.dirname, `../../../${VUE_PATH}/src/index.ts`)
const DEV_ENTRY_PATH = `/${VUE_PATH}/playground/index.html`
const ROLLUP_OPTIONS_INPUT_PATH = path.resolve(import.meta.dirname, `../../../${VUE_PATH}/src/**/index.ts`)

const rollupOptionsInput = getRollupOptionsInput({
  inputFilePath: (file) => {
    // Turn the file path under src/ into an entry name: drop the .ts extension and the ui/ segment
    const filePath = (file.match(/\/src\/(.+)$/)?.[1] || '').replace(/(ui\/)|\.ts$/g, '')
    return `${VUE_PATH}/${filePath}`
  },
  rollupOptionsInputPath: ROLLUP_OPTIONS_INPUT_PATH,
})

export default defineConfig(mergeConfig(
  baseConfig({
    basePath: VUE_PATH,
    libEntryPath: LIB_ENTRY_PATH,
    devEntryPath: DEV_ENTRY_PATH,
    rollupOptionsInput,
    dtsRoot: path.resolve(import.meta.dirname, '../vue-types'),
    dtsExclude: [
      'web/**/*.stories.ts',
      'web/**/*.test.ts',
      'web/angular/**/*',
    ],
  }),
  commonVueViteConfig,
))
