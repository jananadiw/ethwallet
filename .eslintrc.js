module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'standard-with-typescript', 'plugin:@next/next/recommended', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'react/react-in-jsx-scope': 'off',
        'react/prop-styles': 'off',
        '@typescript-eslint/explicit-function-return-type': 'warn',
    },
};
