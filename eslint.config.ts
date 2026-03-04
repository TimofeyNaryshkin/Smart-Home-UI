import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default defineConfig([
  {
    ignores: ['**/*.{spec,config}.ts', '**/main.ts', '.angular'],
  },
  {
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommended, eslintPluginUnicorn.configs.recommended],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
    rules: {
      ...eslintPluginUnicorn.configs.recommended.rules,
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-null': 'off',
    },
  },
]);
