const rules = {
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-floating-promises': 'off',
  'n/no-callback-literal': 'off',
  'spaced-comment': 'off',
  '@typescript-eslint/restrict-template-expressions': 'off',
  '@typescript-eslint/no-invalid-void-type': 'off',
  '@typescript-eslint/no-misused-promises': 'off',
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/promise-function-async': 'off',
  '@typescript-eslint/no-unnecessary-condition': 'off',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  'prefer-destructuring': 'off',
  endOfLine: 'off',
  '@typescript-eslint/no-unnecessary-type-assertion': 'off',
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/explicit-member-accessibility': 'off',
  '@typescript-eslint/sort-type-constituents': 'off',
  '@typescript-eslint/unified-signatures': 'off',
  '@typescript-eslint/no-unused-expressions': 'off',
  '@typescript-eslint/no-confusing-void-expression': 'off',
  'no-unused-vars': 'off',
  'solid/components-return-once': 'off',
  '@typescript-eslint/method-signature-style': 'off',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      'newlines-between': 'ignore'
    }
  ]
}

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    'cypress/globals': true
  },
  globals: {
    require: 'off',
    window: 'off'
  },
  overrides: [
    {
      files: ['./*.js'],
      extends: '@giveerr/eslint-config-prettier-javascript',
      rules: {
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
            'newlines-between': 'ignore'
          }
        ]
      }
    },
    {
      files: ['./**/*.ts'],
      extends: '@giveerr/eslint-config-prettier-typescript',
      rules: {
        ...rules,
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error'
      }
    },
    {
      files: ['./**/*.tsx'],
      extends: '@giveerr/eslint-config-solid',
      rules: {
        ...rules,
        'solid/no-innerhtml': 'off',
        'solid/no-unknown-namespaces': 'off',
        'solid/reactivity': 'off',
        'solid/no-proxy-apis': 'off'
      }
    }
  ],
  plugins: ['cypress'],
  rules
}
