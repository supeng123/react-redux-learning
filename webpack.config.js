const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlWebpackPlugin = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, './src/index.html')
});

module.exports = {
    mode: 'development',

    entry: ['babel-polyfill', './src/app/index.jsx'],

    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js'
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/          
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 1208,
        open: true
    },
    plugins: [htmlWebpackPlugin],
};
