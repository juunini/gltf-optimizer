module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  ignorePatterns: [
    '*.d.ts'
  ],
  rules: {
    '@typescript-eslint/prefer-ts-expect-error': 'off'
  }
}
