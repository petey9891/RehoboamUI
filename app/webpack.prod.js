const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['regenerator-runtime/runtime', './src/js/index.js', './src/css/rehoboam.css'],
	mode: 'production',
	output: {
		filename: 'main.bundle.js',
		path: path.resolve(__dirname, './dist'),
		publicPath: '/'
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	optimization: {
		minimize: true,
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{
				test: /\.css$|\.scss$/,
				sideEffects: false,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: 'src/index.html' }]
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
			inject: false
		})
	]
};
