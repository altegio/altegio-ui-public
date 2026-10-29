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
    // Only main releases update CHANGELOG.md; feature-branch prereleases skip it
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
          'bin',
          'files',
          'exports',
          'repository',
          'peerDependencies',
          'peerDependenciesMeta',
          'dependencies',
          'engines',
          'browserslist'
        ]
      }
    ],
    '@semantic-release/npm',
    // Only main releases commit the new version in package.json and CHANGELOG.md back to the repository
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
