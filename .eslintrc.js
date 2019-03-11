module.exports = {
  // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "useJSXTextNode": true,
    "project": "./tsconfig.json",
  },

  // 以当前目录为根目录，不再向上查找 .eslintrc.js
  root: true,

  plugins: [
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    "@typescript-eslint",
    "react-hooks",
  ],

  extends: [
    "eslint:recommended",
    // https://alloyteam.github.io/eslint-config-alloy/
    "eslint-config-alloy",
    "plugin:@typescript-eslint/recommended",
    // https://github.com/prettier/eslint-config-prettier
    "prettier",
    "prettier/@typescript-eslint",
  ],

  rules: {
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-object-literal-type-assertion": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-use-before-define": 0,

    "handle-callback-err": 0,
    "max-nested-callbacks": 0,
    "no-fallthrough": 0,
    "no-undefined": 0,
  }
}
