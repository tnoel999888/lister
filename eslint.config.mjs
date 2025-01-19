import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
      files: ["src/**/*.{js,mjs,cjs,jsx}"],
      plugins: {
          "unused-imports": unusedImports,
      },
      rules: {
          "semi": "warn",
          "no-unused-vars": "warn",
          "unused-imports/no-unused-imports": "warn",
          "indent": ["error", 4],
          "quotes": [
              "warn",
              "double"
          ],
      }
  },
  {
      languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];