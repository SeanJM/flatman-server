module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "globals": {
    "process": true,
    "require": true,
    "__dirname": true,
    "module": true
  },
  "env": {
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "emcaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "import/no-unresolved": [2, { commonjs: true, amd: true }],
    "no-useless-constructor": 2,
    "no-console": [
      "off"
    ],
    "no-multiple-empty-lines": ["error", {
      "max": 1,
      "maxEOF": 0,
      "maxBOF": 0
    }],
    "no-return-assign": 2,
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double",
      { "allowTemplateLiterals": true }
    ],
    "semi": [
      "error",
      "always"
    ]
  }
}