const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

var path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/i, // Regex fichiers javascript
                exclude: /node_modules/, // exclusion du répertoire node_modules
                use: {
                    loader: 'babel-loader', // lance le loader babel
                }
            },
            {
                test: /\.scss$/i, // regex fichiers scss
                exclude: /node_modules/,
                use: [
                    'style-loader', // lance le loader style
                    'css-loader', // lance loader css
                    'sass-loader', // lance loader sass
                ]
            },
            {
                test: /\.html$/i, // regex fichier html
                loader: 'html-loader', // lance loader html
            },

        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'    })
    ]
};
