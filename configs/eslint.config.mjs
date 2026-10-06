import eslint from '@eslint/js'
import tslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { configs as pluginLit } from 'eslint-plugin-lit';
import stylistic from '@stylistic/eslint-plugin'
import sonarjs from 'eslint-plugin-sonarjs'
import compat from 'eslint-plugin-compat'

import { rules as customRules } from './rules/index.mjs'

export default tslint.config(
  eslint.configs.recommended,
  stylistic.configs.all,
  ...tslint.configs.strictTypeChecked,
  ...tslint.configs.stylisticTypeChecked,
  ...pluginVue.configs['flat/recommended'],
  pluginLit['flat/all'],
  sonarjs.configs.recommended,
  compat.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      custom: {
        rules: customRules,
      },
    },
    rules: {
      'no-console': ["warn", { allow: ["warn", "info"] }],
      'no-return-assign': 'error',

      // @typescript-eslint
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          modifiers: ['exported'],
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'typeAlias',
          modifiers: ['exported'],
          format: ['PascalCase'],
          prefix: ['T'],
        },
        {
          selector: 'enum',
          modifiers: ['exported'],
          format: ['PascalCase'],
          prefix: ['E'],
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-extraneous-class': [
        'error',
        {
          allowEmpty: true,
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/prefer-function-type': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',

      // lit
      'lit/no-native-attributes': 'off',
      'lit/no-template-arrow': 'off',

      // stylistic
      '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
      '@stylistic/multiline-comment-style': 'off',
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/space-before-function-paren': ['error', 'never'],
      '@stylistic/object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true },
        },
      ],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/indent': ['error', 2, { ignoredNodes: ['ConditionalExpression'], SwitchCase: 1 }],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'none',
            requireLast: true,
          },
        },
      ],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/no-confusing-arrow': 'off',
      '@stylistic/lines-between-class-members': 'off',
      '@stylistic/dot-location': ['error', 'property'],

      // sonar
      'sonarjs/prefer-function-type': 'off',
      'sonarjs/function-return-type': 'off',
      'sonarjs/prefer-nullish-coalescing': 'off',
      'sonarjs/todo-tag': 'off',
      'sonarjs/no-vue-bypass-sanitization': 'off',
      'sonarjs/no-nested-conditional': 'off',
      'sonarjs/no-selector-parameter': 'off',
      'sonarjs/redundant-type-aliases': 'off',

      // Цикломатическая сложность
      complexity: ['error', { max: 6 }],

      // Когнитивная сложность
      'sonarjs/cognitive-complexity': ['error', 6],

      // // Дополнительные правила для контроля сложности
      'max-depth': ['error', { max: 2 }], // глубина вложенности
      'max-nested-callbacks': ['error', { max: 2 }], // вложенные колбэки
      'max-lines-per-function': ['error', { max: 120, skipBlankLines: true, skipComments: true }],
    },
  },  
  {
    ignores: ['**/node_modules/**', '**/build/**', '**/dist/**', '**/tools/**/*', '**/*.cjs', '**/*.mjs'],
  },
  {
    files: ['**/web/**'],
    rules: {
      'compat/compat': 'error',
    },
  },
  {
    files: ['**/web/shared/.storybook/**'],
    rules: {
      'compat/compat': 'off',
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      '@stylistic/function-paren-newline': 'off',
      '@stylistic/comma-dangle': [
        'error',
        {
          functions: 'never',
        },
      ],
      '@stylistic/implicit-arrow-linebreak': ['error', 'below'],
    },
  },
  {
    files: ['**/web/angular/src/ui/**/*'],
    rules: {
      'custom/require-default-value': 'error',
    },
  },
  {
    files: ['**/web/**/*'],
    rules: {
      'custom/padding-line-between-tags': 'error',
    },
  },
  {
    files: ['**/web/vue/**/*'],
    rules: {
      // vue
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/no-deprecated-slot-attribute': [
        'warn',
        {
          ignore: ['div', 'span'],
        },
      ],
      'vue/script-indent': ['error', 2, { baseIndent: 1 }],
      '@stylistic/indent': 'off',
      "vue/padding-line-between-tags": ["error", [
        { "blankLine": "always", "prev": "*", "next": "*" }
      ]]
    },
  },
  {
    files: ['**/web/shared/icons/**/*'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  {
    files: ['**/web/**/*.stories.ts'],
    rules: {
      // Цикломатическая сложность
      complexity: 'off',
      // Когнитивная сложность
      'sonarjs/cognitive-complexity': 'off',
    },
  },
  {
    files: ['**/web/**/*.test.ts'],
    rules: {
      complexity: 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/no-nested-functions': 'off',
      'max-nested-callbacks': 'off',
      'max-lines-per-function': 'off',
    },
  },
  {
    files: ['**/web/cli/**/*'],
    rules: {
      'no-console': ['warn', { allow: ['log', 'error'] }],
    },
  }
);
