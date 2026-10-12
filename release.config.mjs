/**
 * @type {import('semantic-release').GlobalConfig}
 */

const isMainBranch = process.env.CI_COMMIT_REF_NAME === 'main' || !process.env.CI_COMMIT_REF_NAME;

export default {
  branches: [
    { name: 'main', prerelease: false },
    { name: 'PFW-+([0-9])', prerelease: true, channel: '${name}' },
    { name: 'NW-+([0-9])', prerelease: true, channel: '${name}' }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    // Не создаём changelog для feature ветвей
    ...(isMainBranch ? [
      [
        '@semantic-release/changelog',
        {
          changelogTitle: '# 🚀 Release Notes',
          changelogFile: 'CHANGELOG.md'
        }
      ]
    ] : []),
    [
      '@anolilab/semantic-release-clean-package-json',
      {
        keep: [
          'name',
          'description',
          'author',
          'version',
          'type',
          'main',
          'module',
          'files',
          'exports',
          'repository',
          'peerDependencies',
          'peerDependenciesMeta',
          'engines',
          'browserslist'
        ]
      }
    ],
    '@semantic-release/npm',
    // Создаём tag в package.json только для main ветки
    ...(isMainBranch ? [
      [
        '@semantic-release/git',
        {
          assets: ['CHANGELOG.md', 'package.json'],
          message: 'chore(release): ${nextRelease.version} \n\n${nextRelease.notes}'
        }
      ]
    ] : [])
  ]
}
