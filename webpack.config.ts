import { structure } from './src/main/structure';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpackNodeExternals from 'webpack-node-externals';
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';
// import { HotElectronLauncherPlugin } from 'hot-electron-launcher-plugin';
// const hotElectronLauncherPlugin: any = new HotElectronLauncherPlugin();

const htmlTemplate = structure.renderer.html;
const mainEntry = structure.main.entry;
const rendererEntry = structure.renderer.entry;
const outputFolder = [__dirname, structure.publicPath].join('/');
const mainOutput = structure.main.output;
const rendererOutput = structure.renderer.output;
const isDev = process.env.NODE_ENV === 'development';
// eslint-disable-next-line no-unused-vars
export const ctorConfig: (scope: 'main' | 'renderer') => (webpack.Configuration & { devServer?: any }) = function (
    scope: 'main' | 'renderer'
) {
    console.log(`CREATING CONFIGURATION for: ${scope}`);
    console.log(`\tisDev: ${isDev.toString()}`);
    console.log(`\thtmlTemplate: ${htmlTemplate}`);
    const result = {
        mode: isDev ? 'development' : 'production',
        target: scope === 'main' ? 'electron-main' : 'electron-renderer',
        entry: scope === 'main' ? mainEntry : rendererEntry,
        output: {
            path: outputFolder,
            filename: scope === 'main' ? mainOutput : rendererOutput,
            assetModuleFilename: '[path][name].[ext]'
        },
        plugins: [
            scope === 'renderer'
                ? new HtmlWebpackPlugin({
                      template: htmlTemplate,
                      title: 'Junk-in-the-Trunk, Inc.'
                  })
                : null,
            new MiniCssExtractPlugin({
                filename: 'syles.css'
            }),
            // hotElectronLauncherPlugin,
            new webpack.ProvidePlugin({
                React: 'react',
                ReactDOM: 'react-dom',
                chalk: 'chalk',
                supportsColor: 'supports-color'
                // Realm: 'realm',
                // Electron: 'electron',
                // remote: '@electron/remote'
            })
        ].filter(Boolean),
        resolve: {
            alias: {
                '@root': './src/',
                '@css': './assets/css/',
                '@common': './src/common/',
                '@main': './src/main/',
                '@renderer': './src/renderer/'
            },
            plugins: [new TsconfigPathsWebpackPlugin()],
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.jpg', '.svg', '.png', '.woff', '.webp', '.ttf', '.otf']
        },
        devtool: 'inline-source-map',
        externals: [
            webpackNodeExternals({
                allowlist: [/webpack(\/.*)?/, 'electron-devtools-installer', 'chalk']
            })
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        'postcss-import',
                                        'tailwindcss',
                                        'postcss-nesting',
                                        'postcss-custom-properties',
                                        'autoprefixer',
                                        'postcss-preset-env'
                                    ]
                                }
                            }
                        }
                    ]
                },
                { test: /\.(png|jpe?g|gif|webp|svg|woff2?|otf|ttf)$/, type: 'asset/resource' },
                { test: /\.tsx?$/, use: 'ts-loader' },
                { test: /\.jsx?$/, use: 'babel-loader' }
            ]
        },
        devServer: {
            port: 8000,
            hot: true
        }
    };
    return result as any;
};

export const config = [ctorConfig('main'), ctorConfig('renderer')];
export default config;
