export const structure = {
    main: {
        entry: './src/main/app.ts',
        output: 'app.js'
    },
    renderer: {
        html: './src/renderer/index.html',
        entry: './src/renderer/index.tsx',
        output: 'jitt-bundle.js'
    },
    publicPath: 'public'
};