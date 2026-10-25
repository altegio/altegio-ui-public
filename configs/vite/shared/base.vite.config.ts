import { defineConfig, mergeConfig, type UserConfig } from 'vite'
import dts, { type PluginOptions } from 'vite-plugin-dts'
import checker from 'vite-plugin-checker'
import commonViteConfig from './common.vite.config.ts'
// import { sentryVitePlugin } from '@sentry/vite-plugin'
// import { version } from '../../../package.json'
import path from 'path'

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
// const env = loadEnv(
//   process.env.NODE_ENV ?? 'development',
//   process.cwd(),
// )

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
      // sentryVitePlugin({
      //   disable: env.VITE_SENTRY_ENABLED !== 'true',
      //   release: { name: `${env.VITE_SENTRY_PROJECT}@${version}` },
      //   telemetry: false,
      //   url: env.VITE_SENTRY_URL,
      //   org: env.VITE_SENTRY_ORG,
      //   project: env.VITE_SENTRY_PROJECT,
      //   authToken: env.VITE_SENTRY_AUTH_TOKEN,
      //   sourcemaps: { filesToDeleteAfterUpload: ['dist/**/*.map'] },
      // }),
    ],
    server: { open: devEntryPath },
  },
))
