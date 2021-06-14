module.exports = {
    extends: 'standard-with-typescript',
    env: {
      node: true,
      jest: true
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        typescript: {}
      }
    },
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: './',
      sourceType: 'module',
      ecmaVersion: 2019
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }