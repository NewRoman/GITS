// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    historyApiFallback: true,
    inline: true
  },
  module: {
    rules: [
      
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }, {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 70
            }
          }
        },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        },
        
      },

    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      template: './src/index.html',
      filename: 'index.html',
      favicon: './src/favicon.ico'

    }),
    // new WebpackMd5Hash(),
    // new StyleLintPlugin({
    //   configFile: './stylelint.config.js',
    //   files: './src/scss/*.scss',
    //   syntax: 'scss'
    // })
  ]
};
