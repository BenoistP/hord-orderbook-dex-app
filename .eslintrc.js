module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-debugger': 'off',
    'linebreak-style': ['error', 'unix'],
    'allowTemplateLiterals': 0,
    'jsx-quotes': [2, 'prefer-single'],
    'quotes': 'off',
    'semi': ['error', 'always'],
    'react/prop-types': 'off',
    'import/no-anonymous-default-export': 'off'
  },
};
