import {Express, Request, Response} from 'express'
import { createUserSessionHandler, deleteSessionHandler } from './controller/session.controller'
import { createUserHandler } from './controller/user.controller'
import {getUserSessionsHandler} from './controller/session.controller'
import valiate from './middleware/validateResource'
import { createUserSchema } from './schema/user.schema'
import {createSessionSchema} from './schema/session.schema'
import requireUser from './middleware/requireUser'

function routes(app: Express){
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))


  app.post('/api/users', valiate(createUserSchema), createUserHandler)

  app.post("/api/session", valiate(createSessionSchema), createUserSessionHandler)

  app.get('/api/session', requireUser, getUserSessionsHandler)

  app.delete('/api/session', requireUser, deleteSessionHandler)
}

export default routes