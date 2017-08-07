const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        './src'
    ],
    module: {
        rules: [
            { test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader' },
            {
              test: /\.png$/,
              loader: "url-loader",
              query: { mimetype: "image/png" }
            },
            {
              test: /\.svg$/,
              loader: 'svg-inline-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.scss']
    },
    output: {
        path: path.join(__dirname, '/public'),
        publicPath: '/',
        filename: 'bundle.js'
    }
};
