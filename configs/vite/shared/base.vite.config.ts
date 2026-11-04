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
        // The public package has a different name; keep the documented asset path stable.
        cssFileName: 'altegio-ui',
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
        entryRoot: path.resolve(import.meta.dirname, '../../../'),
        outDirs: path.resolve(import.meta.dirname, '../../../dist', basePath),
        bundleTypes: {
          extractorConfig: {
            compiler: {
              overrideTsconfig: {
                // The synthetic Vue package root has no sources; bundle the emitted entry.
                files: [path.resolve(import.meta.dirname, '../../../dist', basePath, 'index.d.ts')],
                include: [],
              },
            },
          },
        },
        processor: basePath === 'web/vue' ? 'vue' : 'ts',
        include: [dtsInclude ?? [`${basePath}/src/**/*`, 'web/core/src/**/*', 'web/shared/**/*', 'tokens/**/*']].flat(2).map(glob => path.resolve(import.meta.dirname, '../../../', glob)),
        exclude: [...[dtsExclude ?? []].flat(), 'web/**/stories/**', 'web/**/tests/**', 'web/**/test/**'].map(glob => path.resolve(import.meta.dirname, '../../../', glob)),
        pathsToAliases: false,
        tsconfigPath: path.resolve(import.meta.dirname, '../../../tsconfig.json'),
        insertTypesEntry: true,
        staticImport: true,
      }),
    ],
    server: { open: devEntryPath },
  },
))
