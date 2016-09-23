/**
* @Author: eason
* @Date:   2016-09-05T18:16:21+08:00
* @Last modified by:   eason
* @Last modified time: 2016-09-06T14:02:15+08:00
*/



var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, './src/app.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      // ================
      // 自定义路径名
      // ================
      CONTAINERS: path.join('src', 'containers'),
      COMPONENTS: path.join('src', 'components'),
      ACTIONS: path.join('src', 'actions'),
      REDUCERS: path.join('src', 'reducers'),
      STORE: path.join('src', 'store'),
      CONFIG: path.join('src', 'conf'),
      //
      ROUTES: path.join('src', 'routes'),
      SERVICES: path.join('src', 'services'),
      UTILS: path.join('src', 'utils'),
      HOC: path.join('src', 'utils/HoC'),
      MIXIN: path.join('src', 'utils/mixins'),
      VIEWS: path.join('src', 'views'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'stage-2', 'react']
        }
      }, {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass'
      }, {
        test: /\.css$/,
        loader: 'style!css!postcss'
      },{
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      }
    ],
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      chunkSortMode: 'none'
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ],
  devtool: '#inline-source-map'
};
