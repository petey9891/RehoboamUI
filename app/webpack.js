const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry: ['regenerator-runtime/runtime', './src/js/index.js', './src/css/rehoboam.css'],
	mode: 'development',
	output: {
		filename: 'main.bundle.js',
		path: path.resolve(__dirname, './dist'),
		publicPath: '/'
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
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
			inject: false
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
