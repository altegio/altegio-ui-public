import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { root } from './canonical-runtime.mjs'
import { prepareAngularEntries } from './component-entries.mjs'

const run = (command, args) => execFileSync(command, args, { cwd: root, stdio: 'inherit' })
prepareAngularEntries()
// ng-packagr supplies supported flat declarations and package metadata. Its bundled
// runtime remains a build artifact; only the separately linked runtime is shipped.
run('pnpm', ['ng-build:raw'])
const declarations = resolve(root, 'artifacts/angular-declarations')
const output = resolve(root, 'dist/web/angular')
mkdirSync(output, { recursive: true })
cpSync(resolve(declarations, 'types'), resolve(output, 'types'), { recursive: true })
cpSync(resolve(declarations, 'package.json'), resolve(output, 'package.json'))
run('pnpm', ['exec', 'ngc', '-p', 'workspace/angular/tsconfig.runtime.json'])
run('pnpm', ['exec', 'vite', 'build', '-c', 'configs/vite/lib/angular-runtime.vite.config.ts'])
run(process.execPath, ['scripts/minify-ng-dist.mjs'])
