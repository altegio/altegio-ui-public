import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readPublicRelease } from './public-release.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
export const publicDirectory = resolve(root, 'artifacts/public/package')
export const publicName = '@altegio/ui'

export function publicManifest(source) {
  const release = readPublicRelease()
  if (source.name === publicName && source.version !== release.version) throw new Error('Public snapshot version does not match public-release.json')
  const keys = ['description', 'author', 'version', 'license', 'homepage', 'bugs', 'keywords', 'type', 'main', 'module', 'types', 'bin', 'sideEffects', 'exports', 'typesVersions', 'peerDependencies', 'peerDependenciesMeta', 'dependencies', 'engines']
  const manifest = Object.fromEntries(keys.filter(key => source[key] !== undefined).map(key => [key, structuredClone(source[key])]))
  manifest.name = publicName
  manifest.version = release.version
  manifest.repository = { type: 'git', url: 'git+https://github.com/altegio/altegio-ui-public.git' }
  manifest.files = ['dist/', 'licenses/', 'THIRD_PARTY_NOTICES.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'SECURITY.md', 'CODE_OF_CONDUCT.md', 'docs/PUBLICATION.md', 'docs/CONSUMER_VALIDATION.md', 'docs/DEPENDENCY_AUDIT.md', 'docs/HISTORICAL_BROWSER_VALIDATION.md', 'PUBLIC_CHANGELOG.md']
  manifest.publishConfig = { access: 'public', registry: 'https://registry.npmjs.org/', tag: release.channel }
  for (const key of Object.keys(manifest.exports ?? {})) if (key.startsWith('./ng/')) delete manifest.exports[key]
  for (const mapping of Object.values(manifest.typesVersions ?? {})) {
    for (const key of Object.keys(mapping)) if (key.startsWith('ng/')) delete mapping[key]
  }
  return manifest
}

export function* walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else if (entry.isFile()) yield path
    else throw new Error(`Package assembly rejects non-regular files: ${path}`)
  }
}

// Source maps name every bundled npm module, including the CLI-only dependency tree.
// Preserve each module's own license rather than assigning our MIT license to third-party code.
export function bundledLicenses(destination) {
  const packages = new Map()
  const visited = new Set()
  for (const map of [...walk(resolve(root, 'dist'))].filter(file => file.endsWith('.map'))) {
    for (const source of JSON.parse(readFileSync(map, 'utf8')).sources ?? []) {
      if (!source.includes('node_modules/')) continue
      const location = resolve(dirname(map), source)
      const offset = location.lastIndexOf('/node_modules/') + '/node_modules/'.length
      const segments = location.slice(offset).split('/')
      let path = location.slice(0, offset) + segments.slice(0, segments[0].startsWith('@') ? 2 : 1).join('/')
      if (visited.has(path)) continue
      visited.add(path)
      let found = false
      while (path.includes('node_modules')) {
        if (existsSync(join(path, 'package.json'))) {
          const pkg = JSON.parse(readFileSync(join(path, 'package.json'), 'utf8'))
          packages.set(`${pkg.name}@${pkg.version}`, { path, pkg })
          found = true
          break
        }
        path = dirname(path)
      }
      if (!found) throw new Error(`Cannot identify the bundled package license for ${source}`)
    }
  }
  const notices = []
  for (const [id, { path, pkg }] of [...packages].sort(([a], [b]) => a.localeCompare(b, 'en'))) {
    const files = readdirSync(path).filter(name => /^(?:licen[cs]e|copying|notice)(?:[.-]|$)/i.test(name))
    if (!files.length) {
      // Maskito's npm tarballs omit the upstream license. Keep a reviewed, version-specific copy.
      if (['@maskito/core', '@maskito/kit'].includes(pkg.name) && pkg.version === '3.11.1' && pkg.license === 'Apache-2.0') {
        const folder = id.replaceAll('/', '__')
        mkdirSync(join(destination, 'licenses', folder), { recursive: true })
        cpSync(resolve(root, 'licenses/maskito-LICENSE.txt'), join(destination, 'licenses', folder, 'LICENSE'))
        notices.push(`- ${id} (Apache-2.0): licenses/${folder}/ (upstream tag v3.11.1)`)
        continue
      }
      throw new Error(`Bundled dependency ${id} has no license notice`)
    }
    const folder = id.replaceAll('/', '__')
    for (const file of files) {
      mkdirSync(join(destination, 'licenses', folder), { recursive: true })
      cpSync(join(path, file), join(destination, 'licenses', folder, file))
    }
    notices.push(`- ${id} (${pkg.license ?? 'see notice'}): licenses/${folder}/`)
  }
  writeFileSync(join(destination, 'licenses/BUNDLED-DEPENDENCIES.md'), `# Bundled dependency notices\n\nGenerated from the source maps of this build. Unbundled npm dependencies retain the notices in their installed packages.\n\n${notices.join('\n')}\n`)
}

export function assemblePublicPackage() {
  const source = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
  if (!existsSync(resolve(root, 'dist/entries/core/button.mjs'))) throw new Error('Run make public-build to create canonical component entries first.')
  // Staging a private build would silently leak compatibility code. Require a clean canonical build.
  for (const file of walk(resolve(root, 'dist'))) {
    if (/\.(?:m?js|css|ts)$/.test(file) && readFileSync(file, 'utf8').includes('Private package compatibility with 2.x names')) {
      throw new Error('Public assembly rejects private compatibility aliases. Run make public-build.')
    }
  }
  rmSync(publicDirectory, { recursive: true, force: true })
  mkdirSync(publicDirectory, { recursive: true })
  cpSync(resolve(root, 'dist'), join(publicDirectory, 'dist'), { recursive: true, filter: path => !path.endsWith('.map') && (!path.endsWith('.ts') || path.endsWith('.d.ts')) })
  for (const file of ['LICENSE', 'README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'CODE_OF_CONDUCT.md', 'THIRD_PARTY_NOTICES.md', 'licenses', 'docs/PUBLICATION.md', 'docs/CONSUMER_VALIDATION.md', 'docs/DEPENDENCY_AUDIT.md', 'docs/HISTORICAL_BROWSER_VALIDATION.md', 'PUBLIC_CHANGELOG.md']) {
    mkdirSync(dirname(join(publicDirectory, file)), { recursive: true })
    cpSync(resolve(root, file), join(publicDirectory, file), { recursive: true })
  }
  bundledLicenses(publicDirectory)
  for (const file of walk(join(publicDirectory, 'dist'))) {
    if (file.endsWith('.map') || file.endsWith('.ts') && !file.endsWith('.d.ts')) rmSync(file)
    else if (/\.(?:m?js|css)$/.test(file)) {
      const text = readFileSync(file, 'utf8').replace(/\n?\/\/[#@] sourceMappingURL=.*(?:\n|$)/g, '\n').replace(/\/\*[#@] sourceMappingURL=[\s\S]*?\*\//g, '')
      writeFileSync(file, text)
    }
  }
  const manifest = publicManifest(source)
  writeFileSync(join(publicDirectory, 'package.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  writeFileSync(join(publicDirectory, 'CHANGELOG.md'), readFileSync(resolve(root, 'PUBLIC_CHANGELOG.md')))
  const result = JSON.parse(execFileSync('npm', ['pack', '--ignore-scripts', '--json', '--pack-destination', '..'], { cwd: publicDirectory, encoding: 'utf8' }))[0]
  const tarball = resolve(publicDirectory, '..', result.filename)
  const sha256 = createHash('sha256').update(readFileSync(tarball)).digest('hex')
  writeFileSync(resolve(publicDirectory, '../package-info.json'), `${JSON.stringify({ name: manifest.name, version: manifest.version, filename: result.filename, integrity: result.integrity, sha256 }, null, 2)}\n`)
  console.log(`Packed ${manifest.name}@${manifest.version}: artifacts/public/${result.filename} (sha256 ${sha256})`)
  return tarball
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv[2] === 'notices') {
    cpSync(resolve(root, 'licenses'), resolve(root, 'dist/licenses'), { recursive: true })
    bundledLicenses(resolve(root, 'dist'))
  } else assemblePublicPackage()
}
