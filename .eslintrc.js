module.exports = {
  root: true,
  extends: ['@react-native-community', 'airbnb', 'airbnb/hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'no-null'],
  rules: {
    'no-null/no-null': ['error'],
    'react/jsx-filename-extension': ['error', {extensions: ['.tsx']}],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ], // force to define function return type
    'class-methods-use-this': [
      'error',
      {
        exceptMethods: ['componentDidCatch', 'componentDidAppear', 'componentDidDisappear'],
      },
    ],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['test-utils', '@app', '@core', '@assets', '@test'],
      },
    ], // ignore module import
    'max-len': ['error', 120], // change max length for a line to 120
    'no-console': 'error', // don't allow console
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['draft', 'draftState'],
      },
    ], // no params reassigned except using immer
    'no-unused-expressions': ['error', {allowShortCircuit: true}], // don't use unused expressions except short circuit
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}], // don't use unused var except with _ prefix
    '@typescript-eslint/no-explicit-any': ['error'], // forbid to use 'any' type
    'react/jsx-closing-bracket-location': 'off', // let prettier formats the code
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    jest: true,
  },
};
