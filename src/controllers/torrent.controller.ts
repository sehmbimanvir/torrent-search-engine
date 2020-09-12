import {
  initializeServices,
  resolveService,
  resolveServicesData
} from './../helpers'
import { TorrentDetails } from './../interfaces/torrent.interface'
import { Response, Request } from 'express'
import ServiceModel from '../models/service.model'

export const TrendingTorrents = async (req: Request, res: Response) => {

  const dbServices = await ServiceModel.find({ status: true, home: true }).lean()
  const services = await initializeServices(dbServices)

  let homePages = services.map((item: any) => {
    return item.getService().getHomePageData()
  })

  let torrents = await resolveServicesData(services, homePages)

  res.json({ torrents })

}

export const SearchTorrents = async (req: Request, res: Response) => {
  let query = req.query.query

  if (!query || typeof query !== 'string') {
    return res.status(400).json({
      error: 'Invalid search query.'
    })
  }

  let requestObject = { query }
  const dbServices = await ServiceModel.find({ status: true })
  const services = await initializeServices(dbServices)
  let searchPages = services.map((item: any) => {
    return item.getService().getSearchData(requestObject)
  })
  let torrents = await resolveServicesData(services, searchPages)
  res.json({ torrents })
}


export const TorrentDetail = async (req: Request, res: Response) => {
  let { url } = req.query
  let name: any = req.params.service || ''

  if (!url || typeof url !== 'string') {
    return res.status(400).json({
      error: 'URL Missing'
    })
  }

  let { host } = new URL(url)
  host = host.toLowerCase()

  const dbService = await ServiceModel.findOne({ name: { '$regex': name, '$options': 'i' } }).lean()

  if (!dbService) {
    return res.status(400).json({
      error: 'Service not found'
    })
  }

  const service = await resolveService(dbService)

  if (!service) {
    return res.status(400).json({
      error: `Service Class not found for ${name}`
    })
  }

  try {
    const details: TorrentDetails = await service.getService().getDetails(url)
    if (!details.magnet_link) {
      return res.json({ error: 'Details not found.' })
    }
    res.json({ details })
  } catch (err) {
    return res.status(400).json({
      error: 'Something went wrong.'
    })
  }
}

export const TorrentSitesStatus = async (req: Request, res: Response) => {
  const sites = await ServiceModel.find({}).select({ _id: 0, name: 1, status: 1 }).lean()

  res.json({ sites })
}