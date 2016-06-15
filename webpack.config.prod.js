const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: [
    
    './client/mango'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.scss', '.css', '.js', '.json'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  plugins: [
    new ExtractTextPlugin('react-toolbox.css', { allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
    // js
    {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: { presets: ['es2015', 'stage-0', 'react'] }
    }, {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
      }
    ]
  },
  postcss: [autoprefixer]
};
