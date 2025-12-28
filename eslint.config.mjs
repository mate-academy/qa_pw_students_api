import globals from 'globals';
import pluginJs from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/node_modules/*',
      'playwright.config.js',
      '**/playwright-report/**',
    ],
  },
  { languageOptions: { globals: globals.node } },
  eslintConfigPrettier,
  {
    ...pluginJs.configs.recommended,
    ...playwright.configs['flat/recommended'],
    rules: {
      ...pluginJs.configs.recommended.rules,
      'no-unused-vars': 'error',
      'max-len': [
        'error',
        {
          code: 800,
          comments: 800,
          ignorePattern: 'import *',
        },
      ],
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'off',
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
    },
    files: ['**/*.spec.js'],
  },
];
