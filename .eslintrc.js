// Copyright (c) 2018 - 2019, Ayogo Health Inc.  All rights reserved.  Confidential.

module.exports = {
  root: true,
  extends: [
    "plugin:prettier/recommended",
    /* Some recommended ESLint configurations
       More detail here: https://eslint.org/docs/rules/
    */
    "eslint:recommended", //Some default ESLint best-practice rules

    /* Some recommended Jest configurations
       More detail here: https://github.com/jest-community/eslint-plugin-jest#rules
    */
    "plugin:jest/recommended"
  ],
  env: {
    node: true,
    jest: true,
    es6: true
  },

  globals: {
    page: true //for jest
  },

  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        trailingComma: "none"
      }
    ],

    /* ESLint rules */
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-unused-vars": ["error", { vars: "all", args: "none" }],
    "no-useless-escape": 0
  },

  overrides: [
    {
      files: ["test/**/*.js"],
      rules: {
        "no-console": "off"
      }
    }
  ],
  parser: "babel-eslint",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  }
};
