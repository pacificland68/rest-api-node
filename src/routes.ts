import {Express, Request, Response} from 'express'
import { createUserSessionHandler, deleteSessionHandler } from './controller/session.controller'
import { createUserHandler } from './controller/user.controller'
import {getUserSessionsHandler} from './controller/session.controller'
import valiate from './middleware/validateResource'
import { createUserSchema } from './schema/user.schema'
import {createSessionSchema} from './schema/session.schema'
import requireUser from './middleware/requireUser'
import validateResource from './middleware/validateResource'
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from './schema/product.schema'
import { createProductHandler, getProductHandler, updateProductHandler } from './controller/product.controller'

function routes(app: Express){
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  app.post('/api/users', valiate(createUserSchema), createUserHandler)

  // app.get('/api/users', )

  app.post("/api/session", valiate(createSessionSchema), createUserSessionHandler)

  app.get('/api/session', requireUser, getUserSessionsHandler)

  app.delete('/api/session', requireUser, deleteSessionHandler)

  app.post('/api/products', [requireUser, validateResource(createProductSchema)], createProductHandler)

  app.put('/api/products/:productId', [requireUser, validateResource(updateProductSchema)], updateProductHandler)

  app.get('/api/products/:productId', validateResource(getProductSchema), getProductHandler)

  app.delete('/api/products/:productId', [requireUser, validateResource(deleteProductSchema)], getProductHandler)
}

export default routes