module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ['plugin:vue/essential'],
  // extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['vue'],
  globals: {
    wx: true,
    gio: true,
  },
  rules: {
    'vue/no-unused-components': 'warn',
    'vue/no-unused-vars': 'warn',
    'no-unused-vars': 'warn',
    'no-mixed-operators': 0,
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    semi: 0,
    'no-tabs': 0,
    'comma-dangle': 0,
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore',
        named: 'ignore',
        asyncArrow: 'ignore',
      },
    ],
  },
}
