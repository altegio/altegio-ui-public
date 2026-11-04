import path from 'path'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import esX from 'eslint-plugin-es-x'

// Dist compatibility check for every browser in .browserslistrc.
// The rules are picked by hand, not computed: the es-x restrict-to-es2021 preset plus the
// adjustments below, checked against MDN compat data for SUPPORTED_TARGET. The guard stops
// the build when .browserslistrc resolves to anything else.
// Supported browsers are a product decision. Do not edit SUPPORTED_TARGET or relax the rules
// to make CI pass: fix the build output, or re-pick the rules from MDN data when the browser
// list itself changes.
const SUPPORTED_TARGET = ['chrome109', 'edge120', 'firefox115', 'ios16', 'opera95', 'safari14.1']

const target = browserslistToEsbuild(undefined, { path: path.resolve(import.meta.dirname, '..') })
if (target.join() !== SUPPORTED_TARGET.join()) {
  throw new Error(
    `.browserslistrc resolves to ${target.join(', ')}, but configs/eslint.dist.config.mjs is set up for ` +
    `${SUPPORTED_TARGET.join(', ')}. Update the es-x rules there together with .browserslistrc.`,
  )
}

export default [
  {
    files: ['**/*.mjs', '**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'off',
    },
    plugins: {
      'es-x': esX,
    },
    rules: {
      // The preset keeps every ES2022 class field forbidden. Safari 14.1 parses private and static
      // fields, but public fields are partial before Safari 16 (https://webkit.org/b/236843), and
      // the build lowers all class fields together for this target.
      ...esX.configs['flat/restrict-to-es2021'].rules,
      'es-x/no-regexp-lookbehind-assertions': 'error', // ES2018, missing in Safari 14.1 and iOS 16
      // es-x cannot infer every collection type after chunk splitting. Keep the known
      // unsupported collection API guarded even when its receiver is in another chunk.
      'no-restricted-syntax': ['error', {
        selector: 'CallExpression[callee.type="MemberExpression"][callee.property.name="at"]',
        message: 'Array/string .at() is outside the Safari 14.1 contract; use compatible indexing.',
      }],
      'es-x/no-using-declarations': 'error', // not in the preset yet, missing in Safari and iOS
    },
  },
]
