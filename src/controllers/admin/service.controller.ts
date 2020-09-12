import Axios from 'axios'
import { Response, Request } from 'express'
import serviceModel from '../../models/service.model'

export const ListServices = async (req: Request, res: Response) => {
  let services = await serviceModel.find({}).lean()
  res.render('admin/services/index', { services })
}

export const EditService = async (req: Request, res: Response) => {
  let service = await serviceModel.findById(req.params.id).lean()
  if (!service) {
    return res.redirect('/admin/services')
  }
  res.render('admin/services/edit', { service, edit: 1 })
}

export const CreateService = async (req: Request, res: Response) => {
  let service = {}
  res.render('admin/services/edit', { service })
}

export const AddService = async (req: Request, res: Response) => {
  const data = {
    name: req.body.name,
    url: req.body.url,
    service: req.body.service,
    home: req.body.home ? true : false,
    status: req.body.status ? true : false
  }
  let service = new serviceModel(data)
  await service.save()
  res.redirect('/admin/services')
}

export const UpdateService = async (req: Request, res: Response) => {
  const data = {
    name: req.body.name,
    url: req.body.url,
    service: req.body.service,
    home: req.body.home ? true : false,
    status: req.body.status ? true : false
  }
  await serviceModel.findByIdAndUpdate(req.params.id, data)
  res.redirect('/admin/services')
}

export const DeleteService = async (req: Request, res: Response) => {
  await serviceModel.findByIdAndRemove(req.params.id)
  res.status(200).json({
    message: 'Service Deleted Successfully'
  })
}

export const CheckService = async (req: Request, res: Response) => {

  try {
    const service = await serviceModel.findById(req.params.id).lean()

    if (!service) {
      return res.status(404).json({
        message: 'Service not found'
      })
    }

    await Axios.get(service.url)

    res.status(200).json({
      message: `${service.name} Site is Up`
    })

  } catch (err) {
    res.status(400).json({
      message: 'Not Working...'
    })
  }
}