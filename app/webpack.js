const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: ['./src/js/index.js', './src/css/rehoboam.css'],
	mode: 'development',
	output: {
		filename: 'main.bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/rehoboam/'
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		hot: true,
		port: 8090,
		publicPath: 'http://localhost:8090',
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
		new CopyPlugin({
			patterns: [{ from: 'src/index.html' }]
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
