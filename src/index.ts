import express, { Express, Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {
	RutaObtenerProductosActivos,
} from './rutas/producto'

dotenv.config()

const { FRONTEND_URL, API_PORT } = process.env

// Creación de servidor

const app: Express = express()
app.use(express.json())
const apiRouter: Router = express.Router()

apiRouter.get('/productosActivos', RutaObtenerProductosActivos)

const corsOptions = {
	origin: [FRONTEND_URL, 'http://localhost:3000'],
	optionsSuccessStatus: 200
}

// @ts-ignore
app.use(cors(corsOptions))
app.use(apiRouter)

const port = API_PORT || 3011
app.listen(port, () => {
  console.log(`⚡️[servidor]: Servidor corriendo en http://localhost:${port}`)
})
