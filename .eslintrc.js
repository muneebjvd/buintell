module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  rules: {
    // Custom rules here
  },
  ignorePatterns: ['dist', '.next', 'node_modules']
};
