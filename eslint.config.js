import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';
import tseslint from 'typescript-eslint';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginRouter from '@tanstack/eslint-plugin-router';
import prettier from 'eslint-plugin-prettier';
import formatjs from 'eslint-plugin-formatjs';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      // use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      ...pluginQuery.configs['flat/recommended'],
      ...pluginRouter.configs['flat/recommended'],
      reactX.configs['recommended-typescript'],
      reactRefresh.configs.vite,
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
      reactHooks.configs['recommended-latest'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier,
      formatjs,
      import: importPlugin,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      'formatjs/no-camel-case': 'error',
      'formatjs/no-offset': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '{@tanstack/**, @mantine/**}',
              group: 'external',
              position: 'before',
            },
            { pattern: '@app/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
    },
  },
);
