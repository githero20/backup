var path = require('path');
// var webpack = require('webpack');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
     loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, './src'),
      loader: 'babel-loader',
      query: {
        presets: ["react", "es2015", "stage-1"]
      }
    },
    {
      test: /\.(gif|svg|jpg|png)$/,
      loader: "file-loader",
    }],
  },
}