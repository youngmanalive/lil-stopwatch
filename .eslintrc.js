module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  ignorePatterns: ['dist/*'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
