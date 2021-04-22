const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_APP_INSTANCE === 'prod'

module.exports = {
	entry: ['regenerator-runtime/runtime', './src/js/index.js', './src/css/rehoboam.css'],
	mode: isProd ? 'production' : 'development',
	output: {
		filename: 'main.bundle.js',
		path: path.resolve(__dirname, './dist')
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		hot: true,
		port: 8090,
		publicPath: 'http://localhost:8090/',
		proxy: {
			'/api': {
				target: 'http://localhost:8091',
				secure: false
			}
		}
	},
	optimization: {
		minimize: isProd,
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{
				test: /\.css$|\.scss$/,
				sideEffects: true,
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
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
