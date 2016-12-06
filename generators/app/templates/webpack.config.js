/**
* @Author: eason
* @Date:   2016-09-05T18:16:21+08:00
* @Last modified by:   eason
* @Last modified time: 2016-09-06T14:02:15+08:00
*/


var path = require('path');

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var px2rem = require('postcss-plugin-px2rem');
var ip = require('ip');
var SftpWebpackPlugin = require('sftp-webpack-plugin');

var src = path.resolve(__dirname, './src');
var SFTP_CONFIG = {
  on: process.env.SFTP || false, // default false
  conf: {
    host: 'example.com',
    port: '22', // default
    username: 'username',
    password: 'password',
    from: '/path/to/localDistPath',
    to: '/path/to/serverPath',
  }
};

var PX2REM_OPTIONS = {
  rootValue: 16,
  unitPrecision: 5,
  propWhiteList: [],
  propBlackList: [],
  selectorBlackList: [],
  ignoreIdentifier: false,
  replace: true,
  mediaQuery: false,
  minPixelValue: 0,
};

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(src, 'app.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js',
    publicPath: '/'
  },
  resolveLoader: {
    // 1 fallback: Resolve Problem: multi react lib
    fallback: path.join(__dirname, 'node_modules') // @TODO Doesnot work, for some packages will use local node_modules,
    // 2 root: @TODO unknown
    // modulesDirectories: [ path.join(__dirname, 'node_modules') ] // for some packages will use local node_modules,
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // ================
      // 自定义路径名
      // ================
      // 1 Client
      //   1.1 React
      COMPONENTS: path.join(src, 'components'),
      CONTAINERS: path.join(src, 'containers'),
      HOC: path.join(src, 'utils/HoC'),
      //   1.2 Redux
      ACTIONS: path.join(src, 'actions'),
      REDUCERS: path.join(src, 'reducers'),
      STORE: path.join(src, 'store'),
      // 2 Server
      ROUTES: path.join(src, 'routes'),
      VIEWS: path.join(src, 'views'),
      // 3 Common
      SERVICES: path.join(src, 'services'),
      UTILS: path.join(src, 'utils'),
      MIXIN: path.join(src, 'utils/mixins'),
      CONFIG: path.join(src, 'conf'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: [
            'transform-runtime',
            'transform-decorators-legacy'
          ].map(e => 'babel-plugin-'+e).map(require.resolve),
          presets: [
            'es2015',
            'react',
            'stage-0',
            'stage-2'
          ].map(e => 'babel-preset-'+e).map(require.resolve)
        }
      }, {
        test: /\.scss$/,
        // loader: 'style!css?modules&localIdentName=[name]__[local]!postcss!sass'
        loader: ExtractTextPlugin.extract('style-loader', "css-loader!postcss-loader!sass-loader")
      }, {
        test: /\.less$/,
        // loader: 'style!css?modules&localIdentName=[name]__[local]!postcss!less'
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
      }, {
        test: /\.css$/,
        // loader: 'style!css?modules&localIdentName=[name]__[local]!postcss'
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url?limit=25000&name=[path][name].[ext]?[hash]'
      }, {
        test: /\.(eot|woff|ttf|svg)$/,
        loader: 'url?limit=30000&name=[path][name]-[hash].[ext]'
      }
    ],
  },
  postcss: function () {
    return [ autoprefixer, precss, px2rem(PX2REM_OPTIONS) ];
  },
  plugins: process.env.NODE_ENV === 'production' ? SFTP_CONFIG.on ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        // remove all comments
        comments: false
      },
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      chunkSortMode: 'none'
    }),
    new SftpWebpackPlugin(SFTP_CONFIG.conf)
  ] : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        // remove all comments
        comments: false
      },
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      chunkSortMode: 'none'
    }),
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      chunkSortMode: 'none'
    }),
    new OpenBrowserPlugin({ url: `http://${ip.address()}:8080` })
  ],
  devtool: process.env.NODE_ENV === 'production' ? '' : '#inline-source-map'
};
