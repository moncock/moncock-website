module.exports = {
    singleQuote: true,
    printWidth: 80,
    tabWidth: 2,
    requireConfig: false,
    useTabs: false,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    semi: true,
    endOfLine: 'auto',
    importOrder: [
        '^@components/(.*)$',
        '^@configs/(.*)$',
        '^@constant/(.*)$',
        '^@contexts/(.*)$',
        '^@hooks/(.*)$',
        '^@theme/(.*)$',
        '^@utils/(.*)$',
        '^[./]'
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true
};
