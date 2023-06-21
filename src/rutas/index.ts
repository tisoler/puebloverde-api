
import express, { Router } from 'express'
import { RutaObtenerProductosActivos } from './producto'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

export const apiRouter: Router = express.Router()

// --- Swagger ---//
// Documento Swagger dinámico
const options = {
	definition: {
	  openapi: '3.0.0',
	  info: {
			title: 'API - Pueblo Verde',
			version: '1.0.0',
			license: {
				name: "MIT"
			}
	  },
	},
	apis: ['./src/rutas/index.ts', './rutas/index.js'],
}

const openapiSpecification = swaggerJsdoc(options)

apiRouter.use('/api-docs', swaggerUi.serve);
apiRouter.get('/api-docs', swaggerUi.setup(openapiSpecification))

// --- Rutas --- //

/**
 * @openapi
 * /productosActivos:
 *    get:
 *     description: Lista de productos activos
 *     tags:
 *       - productos
 *     responses:
 *       200:
 *         description: Retorna la lista de productos activos.
*/
apiRouter.get('/productosActivos', RutaObtenerProductosActivos)
