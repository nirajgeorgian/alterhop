import express, { Application } from 'express'

import { baseController } from './controller'
import middlewares from './middleware'
import path from 'path'

const app = express()

const BUILD_PATH = path.resolve(__dirname, '../../build')
console.log(BUILD_PATH)

export { app }

class App {
	public app: Application

	constructor() {
		this.app = express()

		app.use(express.static(BUILD_PATH, { index: false }))
		app.use(baseController)

		console.info('Initialized App')
	}

	public static bootstrap(): App {
		return new App()
	}

	closeServer = async () => {
		console.log('close server')
	}

	private applyMiddleware = () => {
		middlewares(this.app)
	}
}

export const application = new App()
export default application.app
