import {Express, Request, Response} from 'express'
import { createUserHandler } from './controller/user.controller'
import valiate from './middleware/validateResource'
import { createUserSchema } from './schema/user.schema'

function routes(app: Express){
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  app.post('/api/users', valiate(createUserSchema), createUserHandler)
}

export default routes