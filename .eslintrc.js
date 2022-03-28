module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    'eslint-config-prettier',
  ],
  plugins: ['eslint-plugin-prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser', // the typescript-parser for eslint, instead of tslint
    sourceType: 'module', // allow the use of imports statements
    ecmaVersion: 2020, // allow the parsing of modern ecmascript
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unused-vars': ['off'],
    '@typescript-eslint/camelcase': ['off', { properties: 'never' }],
    'no-alert': 'warn',
    'no-new': 0,
    // indent: [
    //   'warn',
    //   2,
    //   {
    //     ignoredNodes: ['TemplateLiteral'],
    //   },
    // ],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'no-shadow': 0,
    'no-tabs': 0,
    'max-len': 'off',
    'no-useless-concat': 0,
    'template-curly-spacing': ['off'],
    'prettier/prettier': ['error'],
    'no-underscore-dangle': ['off'],
    'no-param-reassign': ['warn'],
    'consistent-return': ["error", { "treatUndefinedAsUnspecified": true }],
  },
  // settings: {
  //   'import/resolver': {
  //     node: {
  //       extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  //     }
  //   },
  // },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
