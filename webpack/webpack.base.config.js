var path = require('path');
var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
var node_modules_dir = path.resolve(__dirname, '../node_modules');

var deps = [
  'moment/min/moment.min.js'
];

var config = {
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.ProvidePlugin({
      log: "loglevel"
    })
  ],
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=100000',
        exclude: /node_modules/
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {},
    modulesDirectories: [
      'src',
      'vendor',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  }
};

deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = new WebpackConfig().merge(config);
