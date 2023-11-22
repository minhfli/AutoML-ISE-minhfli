import { Router } from 'express'
import routeV1 from './v1/index'

const routes : Router = Router()
// Heath check
routes.get('/api/healthz', (req, res) => {
  return res.json({ status: 'OK' })
})

routes.use('/', routeV1)

export default routes
