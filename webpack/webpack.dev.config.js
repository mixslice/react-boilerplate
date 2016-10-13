var webpack = require('webpack');
var WebpackConfig = require('webpack-config');

var config = {
  devtool: 'eval',
  entry: [
    `webpack-dev-server/client?http://localhost:${process.env.DEV_SERVER_PORT || 3000}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/index'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(process.env.npm_package_version),
      __DEV__: true,  // <-------- DISABLE redux-devtools HERE
      __LOG_LEVEL__: JSON.stringify(process.env.LOG_LEVEL || 'trace'),
      __API_ROOT__: JSON.stringify(process.env.API_ROOT || 'http://api.example.com/')
    })
  ]
};

module.exports = new WebpackConfig()
  .extend('./webpack/webpack.base.config.js')
  .merge(config);
