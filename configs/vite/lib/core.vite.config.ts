import { defineConfig } from 'vite'
import path from 'path'
import baseConfig from '../shared/base.vite.config'
import { getRollupOptionsInput } from '../utils/helpers'

export const CORE_PATH = 'web/core'
const LIB_ENTRY_PATH = path.resolve(__dirname, `../../../${CORE_PATH}/src/index.ts`)
const DEV_ENTRY_PATH = `/${CORE_PATH}/playground/index.html`
const ROLLUP_OPTIONS_INPUT_PATH = path.resolve(__dirname, `../../../${CORE_PATH}/src/**/index.ts`)

const rollupOptionsInput = getRollupOptionsInput({
  inputFilePath: (file) => {
    // Находим файл в папке src, убираем расширение и ui папку из пути
    const filePath = (file.match(/\/src\/(.+)$/)?.[1] || '').replace(/(ui\/)|\.ts$/g, '')
    return `${CORE_PATH}/${filePath}`
  },
  rollupOptionsInputPath: ROLLUP_OPTIONS_INPUT_PATH,
})

export default defineConfig(
  baseConfig({
    basePath: CORE_PATH,
    libEntryPath: LIB_ENTRY_PATH,
    devEntryPath: DEV_ENTRY_PATH,
    rollupOptionsInput,
    dtsExclude: [
      'web/**/*.stories.ts',
      'web/**/*.test.ts',
      'web/angular/**/*',
      'web/vue/**/*',
    ],
    publicDir: path.resolve(__dirname, `../../../web/shared/public`),
  }),
)
