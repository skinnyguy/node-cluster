import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import configs from '../configs/app.config'

import 'dotenv/config'

const app = express()

const initExpressServer = () => {
	// Create express server
	app.server = http.createServer(app)

	// Acitvate logger
	// We will use morgan here
	app.use(morgan('tiny'))

	// Parse request from client as json
	app.use(bodyParser.json())

	// Hide sensitive header using helmet package
	app.use(helmet())

	app.server.listen(configs.PORT, () => {
		console.log('')
		console.log('🔥 Starting server...')
		console.log('🚀 Your application running on http://localhost:' + configs.PORT)
	})
}

export default initExpressServer
