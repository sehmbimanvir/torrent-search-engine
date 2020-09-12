import {
  EditService,
  ListServices,
  UpdateService,
  CreateService,
  AddService,
  DeleteService,
  CheckService
} from './../../controllers/admin/service.controller'

import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/create', CreateService)
router.get('/:id/check', CheckService)
router.post('/', AddService)
router.get('/:id', EditService)
router.post('/:id', UpdateService)
router.delete('/:id', DeleteService)
router.get('/', ListServices)

export default router