import { defineConfig, mergeConfig, type UserConfig } from 'vite'
import dts, { type PluginOptions } from 'vite-plugin-dts'
import checker from 'vite-plugin-checker'
import commonViteConfig from './common.vite.config'
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
      rollupOptions: {
        input: rollupOptionsInput,
        output: {
          format: 'es',
          entryFileNames: '[name].mjs',
          chunkFileNames: `${basePath}/[name].mjs`,
          manualChunks: { main: [libEntryPath] },
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
      }),
      dts({
        outDir: `dist/${basePath}`,
        rollupTypes: true,
        include: dtsInclude,
        exclude: dtsExclude,
        pathsToAliases: false,
        tsconfigPath: path.resolve(__dirname, '../../../tsconfig.json'),
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
