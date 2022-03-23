const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require("path");

module.exports = {
    entry: "./src/js/app.js",
    output: {
        filename: "bundle.min.js",
        path: path.resolve(__dirname, "./dist")
    },
    watch: false,
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'), // Prefer `dart-sass`
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp|awif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: 'public',
                            name: '/images/[name]-[hash].[ext]',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: "My App",
            filename: "index.html",
            template: "src/index.html"
        })
    ]
}