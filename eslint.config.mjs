import eslint from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'

export default eslint({
  ...oxlint.configs['flat/recommended'],
  rules: {
    'no-empty': 'off',
    'node/prefer-global/process': 'off',
    'vue/html-self-closing': 'off',
    'array-callback-return': 'off',
    '@stylistic/indent': ['error', 2],
    '@stylistic/space-before-function-paren': ['error', 'always'],
    'ts/no-empty-object-type': 'off',
    'ts/no-unsafe-function-type': 'off',
  },
  ignores: [
    'node_modules',
    'dist',
    '*.md',
    'docs/vite.config.mts',
  ],
})
