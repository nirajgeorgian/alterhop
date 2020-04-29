import express, { Application } from 'express'

import { baseController } from './controller'
import middlewares from './middleware'
import path from 'path'

const BUILD_PATH = path.resolve(__dirname, '..', 'build')
class App {
	public app: Application

	constructor() {
		this.app = express()

		this.app.use(express.static(BUILD_PATH))
		this.app.use(baseController)

		console.info('Initialized App')
	}

	public static bootstrap(): App {
		return new App()
	}

	closeServer = async () => {
		console.log('close server')
	}

	applyMiddleware = () => {
		middlewares(this.app)
	}
}

export const application = new App()
export default application.app
