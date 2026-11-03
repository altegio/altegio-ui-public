import type { UserConfig } from '@commitlint/types'

const headerPattern =
  /(feat|fix|build|chore|ci|docs|style|refactor|perf|test)(\([\S ]+\))?: [\S ]+/g

const Configuration: UserConfig = {
  parserPreset: {
    parserOpts: {
      headerCorrespondence: ['type', 'scope', 'subject'],
      headerPattern,
    },
  },
  rules: {
    HeaderMatchPattern: [2, 'always'],
  },
  plugins: [
    {
      rules: {
        HeaderMatchPattern: (parsed) => {
          const commitHeader = parsed?.header || ''
          if (!headerPattern.test(commitHeader)) {
            return [
              false,
              'Commit header must match "type(scope): task number description". See the commit convention: https://www.conventionalcommits.org/en/v1.0.0/',
            ]
          }

          return [true, '']
        },
      },
    },
  ],
}

module.exports = Configuration
