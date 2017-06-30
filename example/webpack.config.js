var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
        filename: './index.html', //生成的html存放路径，相对于 path
        template: './index.html', //html模板路径
        inject: true, //允许插件修改哪些内容，包括head与body`
    }),
];

module.exports = {
    devtool: 'source-map',
    entry: ["./index.js"],

    output: {
        path: path.join(__dirname, "/dist/"),
        filename: '[name].[hash:8].bundle.js',
        chunkFilename: '[name].[hash:8].chunk.js'
    },

    resolve: {
        extensions: [".js"],
    },

     externals: {
        "react": "React",
        "react-dom": "ReactDom",
        "immutable": 'Immutable'
    },


    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    plugins: plugins
};