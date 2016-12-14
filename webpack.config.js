module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: './public/js'
  },

  devServer: {
    inline: true,
    contentBase: './public'
  },

  devtool: 'eval-source-map',

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader!babel-loader'
      }
    ]
  }


};