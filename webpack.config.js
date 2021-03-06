var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + '/app',
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./angular/app.js",
    output: {
        path: __dirname + "/app/build",
        filename: "scripts.min.js"
    },
    
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
    
};