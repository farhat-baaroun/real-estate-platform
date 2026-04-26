module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: '19',
    },
  },
  overrides: [
    {
      files: ['packages/**/*.{ts,tsx}'],
      env: {
        node: true,
        browser: false,
      },
      rules: {
        'react/prop-types': 'off',
      },
    },
    {
      files: ['packages/types/src/index.ts'],
      rules: {
        '@typescript-eslint/no-empty-object-type': 'off',
      },
    },
    {
      files: ['apps/web/**/*.{ts,tsx}'],
      env: {
        browser: true,
        node: false,
      },
    },
  ],
};
