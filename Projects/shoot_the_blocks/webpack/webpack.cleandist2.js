const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	plugins: [
		new CleanWebpackPlugin([ 'dist2' ], {
			root: path.resolve(__dirname, '../')
		}),
	],
}
