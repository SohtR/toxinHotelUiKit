// webpack v4
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const images = require('file-loader');
module.exports = {
  entry: './src/index.js' ,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
            pretty: true
        }
      
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: [
               {
                   loader: 'file-loader?name=./fonts/[name]/[name].[ext]'
               }
               
           ]
    },
    {
      test: /\.(gif|png|jpg)$/,
      use: [
        {
            loader: 'file-loader?name=./img/[name].[ext]'
        }
        
    ]
    },
      
    
   
    {
      test : /\.react\.js$/,
      loader: 'webpack-bem-loader',
      options: {
          naming: 'react',
          levels: ['./pathToBlocks'],
          // OR:
          // levels: {
          //     './pathToBlocks': {
          //         default: true,
          //         scheme: 'nested',
          //         naming: 'origin'
          //     }
          // },
          techs: ['js', 'css'],
          techMap: {
              js : ['react.js']
          },
          langs: ['ru', 'en']
      }
  }
    ]
  },
  plugins: [
    // new ExtractTextPlugin(
    //   {filename: 'style.[hash].css', disable: false, allChunks: true }
    // ),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      
      template: './src/index.pug'
    })
    // new webpack.ProvidePlugin({
    //   $: "./src/js/jquery-1.12.4.min.js",
    //   jQuery: "./src/js/jquery-1.12.4.min.js",
    //   "window.jQuery": "./src/js/jquery-1.12.4.min.js"
    // })
    //new WebpackMd5Hash()
  ]
};
