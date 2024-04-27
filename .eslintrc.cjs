module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["airbnb", "eslint-config-prettier", "prettier"],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        ".eslintrc.{js,cjs}"
      ],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    indent: ["error", 2]
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
  ]
};
