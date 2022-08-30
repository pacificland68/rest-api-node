import express from 'express'
import config from 'config'
import connect from './utils/connect'
import logger from './utils/logger'
import routes from './routes'

import deserializaUser from './middleware/deserializeUser'

const port = config.get<number>('port')
const app = express()

app.use(express.json())

app.use(deserializaUser)

app.listen(port, async () => {
  logger.info(`app is running at http:// localhost:${port}`);
  
  await connect()

  routes(app)
})