const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const { NODE_ENV } = process.env
const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production'

const mode = isProduction ? 'production' : 'development'
const devtool = isProduction ? false : 'inline-source-map'
const dist = path.resolve(__dirname, '..', '..', 'dist')

module.exports = merge(
	{},
	{
		entry: './server/src/index.ts',
		mode,
		devtool,
		target: 'node',
		stats: 'minimal',
		externals: [nodeExternals()],
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
				{
					exclude: [/\.js$/, /\.html$/, /\.json$/],
					loader: 'file-loader',
					options: {
						name: 'static/media/[name].[hash:8].[ext]',
						publicPath: '/',
						emitFile: false
					}
				}
			]
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			path: dist,
			filename: 'server.js'
		}
	}
)
