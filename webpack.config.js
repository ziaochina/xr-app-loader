var webpack = require("webpack");
var path = require("path");

var plugins = [
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
];


if (process.env.COMPRESS) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    );
}


module.exports = {
    entry: ["./src/index.js"],

    output: {
        path: path.join(__dirname, "/dist/"),
        library: "XRAppLoader",
        libraryTarget: "umd"
    },

    resolve: {
        extensions: [".js"]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDom",
        "redux": "Redux",
        "react-redux": "ReactRedux",
        "immutable": 'Immutable'
    },

    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                plugins: ['transform-runtime', 'transform-decorators-legacy', 'add-module-exports'],
                presets: ['react', 'es2015', 'stage-0'],
            }
        }]
    },

    plugins: plugins
};
