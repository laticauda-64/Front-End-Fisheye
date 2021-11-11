module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    sourceType: 'script',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'script',
    },
    rules: { 'no-unused-vars': 'warn' },
    plugins: ['html'],
};
