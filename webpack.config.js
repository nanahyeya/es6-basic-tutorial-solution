const path = require('path');

module.exports = {
  //entry: './js/main.js',
  entry: {
    app: './js/main.js',  //app.bundle.js
    ratefinder: './js/ratefinder.js'  //ratefinder.bundle.js
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
   module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-env']
             }
           }
         }
       ]
     },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    mode: 'development'
};