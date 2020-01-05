const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const conf = {
   entry: './src/index.js',
   output: {
       path: path.resolve(__dirname, 'dist'),
       filename : 'main.js',
       publicPath: 'dist/'
   },
   devServer: {
       contentBase: path.join(__dirname, "dist"),
       overlay: true
   },
   module: {
       rules: [
           {
               test: /\.js$/,
               loader: 'babel-loader',
               exclude: '/node_modules/'
           },
           {
               test: /\.css$/,
               use: ExtractTextPlugin.extract({
                 use: "css-loader"
               })
           },
           {
                test: /\.hbs/,
                loader: 'handlebars-loader'
           },
           {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader?name=images/[name].[ext]'
           },
           {
            test: /\.(eot|svg|ttf|woff|woff2)$/i,
            loader: 'file-loader?name=fonts/[name].[ext]'
            }
       ]
   },
   plugins: [
       new ExtractTextPlugin("styles.css"),
       new HtmlWebpackPlugin({
           template: './src/index.hbs',
           inject: false,
           title: 'GeoFeedback'
       }),
       new CleanWebpackPlugin()
   ]
}
 
module.exports = conf;