import { defineConfig, mergeConfig, type UserConfig } from 'vite'
import dts, { type PluginOptions } from 'vite-plugin-dts'
import checker from 'vite-plugin-checker'
import commonViteConfig from './common.vite.config.ts'
import path from 'path'
import browserslistToEsbuild from 'browserslist-to-esbuild'

const BUILD_TARGET = browserslistToEsbuild(undefined, { path: path.resolve(import.meta.dirname, '../../../') })

type TBaseViteConfigPayload = {
  basePath: string
  libEntryPath: string
  devEntryPath: string
  rollupOptionsInput: Record<string, string>
  rollupOptionsExternal?: string[]
  dtsInclude?: PluginOptions['include']
  dtsExclude?: PluginOptions['exclude']
  dtsRoot?: string
  publicDir?: UserConfig['publicDir']
}

export default ({
  basePath,
  libEntryPath,
  devEntryPath,
  rollupOptionsInput,
  rollupOptionsExternal,
  dtsInclude,
  dtsExclude,
  dtsRoot,
  publicDir,
}: TBaseViteConfigPayload) => defineConfig(mergeConfig(
  commonViteConfig,
  {
    build: {
      // Vite 8 defaults to baseline-widely-available (Safari 16.4), which emits class static blocks
      // that older Safari cannot parse. Keep the output within .browserslistrc.
      target: BUILD_TARGET,
      sourcemap: true,
      lib: {
        entry: libEntryPath,
        formats: ['es'],
      },
      emptyOutDir: false,
      rolldownOptions: {
        input: rollupOptionsInput,
        output: {
          format: 'es',
          entryFileNames: '[name].mjs',
          chunkFileNames: `${basePath}/[name].mjs`,
          assetFileNames: `${basePath}/[name].[ext]`,
        },
        external: rollupOptionsExternal,
      },
    },
    publicDir,
    plugins: [
      checker({
        typescript: true,
        vueTsc: true,
        enableBuild: false,
      }),
      dts({
        root: dtsRoot,
        outDir: path.resolve(import.meta.dirname, '../../../dist', basePath),
        rollupTypes: true,
        include: dtsRoot && dtsInclude ? [dtsInclude].flat().map(glob => path.resolve(import.meta.dirname, '../../../', glob)) : dtsInclude,
        exclude: dtsRoot && dtsExclude ? [dtsExclude].flat().map(glob => path.resolve(import.meta.dirname, '../../../', glob)) : dtsExclude,
        pathsToAliases: false,
        tsconfigPath: path.resolve(import.meta.dirname, '../../../tsconfig.json'),
        insertTypesEntry: true,
        staticImport: true,
      }),
    ],
    server: { open: devEntryPath },
  },
))
