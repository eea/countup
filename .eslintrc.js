module.exports = {
  extends: ['react-app', 'prettier', 'plugin:jsx-a11y/recommended'],
  plugins: ['prettier', 'react-hooks', 'jsx-a11y'],
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
    jasmine: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@plone/volto', './src'],
          ['@plone/volto-slate', './packages/volto-slate/src'],
          ['@package', './src'],
          ['@root', './src'],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
    'import/core-modules': ['load-volto-addons'],
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'import/no-unresolved': [2, { devDependencies: true }],
    'no-alert': 1,
    'no-console': 1,
    'no-debugger': 1,
    'prettier/prettier': ['error', { trailingComma: 'all', singleQuote: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
};
