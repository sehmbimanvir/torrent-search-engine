import express, { Router } from 'express'
import ServiceRoutes from './admin/service.route'
import { join } from 'path'

const router: Router = express.Router()

router.use('/admin/services', ServiceRoutes)

export default router