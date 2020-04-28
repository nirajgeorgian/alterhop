import 'dotenv/config'

import App, { application } from './src/app'
import { Server, createServer } from 'http'

import { Application } from 'express'
import { normalizePort } from './src/util/normalize'

class OoJob {
	public app: Application
	public server: Server

	constructor(app: Application) {
		this.app = app
		this.server = createServer(app)

		console.info('Initialized OoJobServer')
	}

	startSyncServer = async (port: string) => {
		try {
			application.applyMiddleware()
			const PORT = normalizePort(port)
			this.server.listen(PORT, () => {
				console.info(`running on port: http://localhost:${port}`)
			})
		} catch (error) {
			console.error(new Error('Error Starting OoJob Server ...'))
			console.error(error)
			await this.stopServer()
		}
	}

	stopServer = async () => {
		process.on('SIGINT', async () => {
			console.warn('Closing OoJob Server ...')
			await application.closeServer()

			try {
				this.server.close()
				console.warn('OoJob Server Closed')
			} catch (error) {
				console.error('Error Closing OoJobServer Server Connection')
				console.error(error)
				process.kill(process.pid)
			}
		})
	}
}

const { startSyncServer, stopServer } = new OoJob(App)
const start = async () => {
	const { PORT } = process.env
	const port = PORT || '8080'

	try {
		await stopServer()
		await startSyncServer(port)
	} catch (error) {
		console.error('Server Failed to start')
		console.error(error)
		process.exit(1)
	}
}
start()
