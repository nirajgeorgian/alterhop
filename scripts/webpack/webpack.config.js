const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const StartServerPlugin = require('start-server-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const { NODE_ENV } = process.env
const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production'
const mode = isProduction ? 'production' : 'development'
const devtool = isProduction ? false : 'inline-source-map'
const dist = path.resolve(__dirname, '..', '..', 'dist')
const plugins = [new webpack.NamedModulesPlugin(), new CleanWebpackPlugin({})]

console.log(`Building for NODE_ENV : ${mode} `)
const entry = isProduction ? ['webpack/hot/poll?1000', './server/index.ts'] : ['./server/index.ts']
const configFile = path.join(__dirname, '..', '..', 'tsconfig.server.json')

module.exports = merge(
	{},
	{
		entry,
		watch: !isProduction,
		mode,
		devtool,
		target: 'node',
		stats: 'minimal',
		externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
					options: {
						configFile
					}
				},
				{
					test: /\.less$/,
					use: [
						{
							loader: 'isomorphic-style-loader'
						},
						{
							loader: 'css-loader'
						},
						{
							loader: 'less-loader'
						}
					]
				}
			]
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			plugins: [
				new TsconfigPathsPlugin({
					configFile
				})
			]
		},
		plugins: isProduction
			? [...plugins]
			: [
					...plugins,
					new StartServerPlugin({
						name: 'server.js'
					}),
					new webpack.HotModuleReplacementPlugin(),
					new webpack.NoEmitOnErrorsPlugin()
			  ],
		node: {
			__dirname: false,
			__filename: false
		},
		output: {
			path: dist,
			filename: 'server.js',
			hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
			hotUpdateMainFilename: '.hot/[hash].hot-update.json'
		}
	}
)
