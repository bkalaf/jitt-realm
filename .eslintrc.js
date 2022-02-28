module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        node: {
            tryExtensions: ['.js', '.jsx', '.ts', 'tsx'],
            allowModules: ['electron'],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        react: {
            version: 'detect',
        },
        // 'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        // 'import/parsers': {
        //     '@typescript-eslint/parser': ['.ts', '.tsx'],
        // },
        // 'import/resolver': {
        //     typescript: {
        //         alwaysTryTypes: true,
        //         project: '/home/bobby/Desktop/jitt-ts/tsconfig.json',
        //     },
        // },
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        // 'plugin:import/typescript',
        // 'airbnb',
        // 'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier/prettier',
        'plugin:jsx-a11y/recommended',
        // 'plugin:import/recommended',
        // 'plugin:node/recommended',
        // 'plugin:promise/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: './',
    },
    plugins: ['react', '@typescript-eslint', 'prettier', 'jsx-a11y', 'react-hooks',],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': ['off', {
            argsIgnorePattern: '^_'
        }],
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-arguments': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/restrict-template-access': 0,
        'dot-notation': 'error',
        // 'function-paren-newline': ['error', {
        //     minItems: 6
        // }],
        // 'import/extensions': ['error', 'never'],
        // 'import/no-cycle': ['error', {
        //     maxDepth: 2
        // }],
        indent: ['off', 4],
        'jsx-quotes': ['warn', 'prefer-single'],
        'max-len': ['off', {
            code: 130,
            tabWidth: 4
        }],
        'multiline-ternary': ['off', 'never'],
        'no-redeclare': 'off',
        'no-trailing-spaces': 'off',
        'no-undef': 'off',
        'no-unsed-vars': 'off',
        'no-unused-expressions': ['error', {
            allowTernary: true
        }],
        'no-unused-labels': ['error'],
        'no-unused-vars': ['error'],
        'no-use-before-define': 'off',
        "react/display-name": "off",
        // 'node/no-missing-import': ['error', {
        //     tryExtensions: ['.ts', '.tsx', '.js', '.jsx']
        // }],
        // 'node/no-unsupported-features/es-syntax': ['off', {
        //     ignores: [],
        //     version: '>=8.0.0'
        // }],
        'operator-linebreak': ['off', 'after'],
        'react/boolean-prop-naming': ['error', {
            rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
            validateNested: true
        }],
        'react/function-component-definition': ['error', {
            namedComponents: 'function-declaration'
        }],
        'react/jsx-filename-extension': ['error', {
            extensions: ['.jsx', '.tsx']
        }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-uses-react': ['off'],
        'react/jsx-uses-vars': ['error'],
        'react/react-in-jsx-scope': ['off'],
        'react/require-default-props': 'off',
        semi: ['warn', 'always'],
        'space-before-function-paren': 'off'
    },
};
