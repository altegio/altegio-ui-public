import { defineConfig, mergeConfig } from 'vite'
import path from 'node:path'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import commonViteConfig from '../shared/common.vite.config.ts'
import { canonicalRuntimePlugin, compiledAngular, root } from '../../../scripts/canonical-runtime.mjs'
import { componentEntries } from '../../../scripts/component-entries.mjs'

export default defineConfig(mergeConfig(commonViteConfig, {
  plugins: [canonicalRuntimePlugin()],
  build: {
    target: browserslistToEsbuild(undefined, { path: root }),
    emptyOutDir: false,
    sourcemap: true,
    lib: { entry: path.resolve(compiledAngular, 'index.js'), formats: ['es'] },
    rolldownOptions: {
      input: {
        'web/angular/fesm2022/altegio-ui-workspace': path.resolve(compiledAngular, 'index.js'),
        ...Object.fromEntries(componentEntries('angular').map(({ directory, name }) => [
          `web/angular/components/${name}/index`, path.resolve(compiledAngular, `ui/${directory}/index.js`),
        ])),
      },
      external: (id: string) => id.startsWith('@angular/') || id === 'rxjs' || id.startsWith('rxjs/'),
      output: {
        entryFileNames: '[name].mjs',
        chunkFileNames: 'web/angular/chunks/[name]-[hash].mjs',
        assetFileNames: 'web/angular/[name].[ext]',
      },
    },
  },
}))
