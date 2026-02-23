import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import css from "@eslint/css";
import ts from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default defineConfig([
  globalIgnores([".astro", ".generated", ".github", "dist/", "tsconfig.json"]),

  js.configs.recommended,
  css.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.all,
  ...astro.configs["jsx-a11y-strict"],

  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
]);
