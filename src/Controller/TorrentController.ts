import { ServiceConfig, TorrentDetails } from './../Interfaces/Torrent'
import { getServiceByName, services, getServiceByUrl } from './../services'
import { Response, Request } from 'express'

export const TrendingTorrents = (req: Request, res: Response) => {
  let homePages = services.filter((item: ServiceConfig) => item.home && item.status).map(item => {
    return item.getService().getHomePageData()
  })

  Promise.allSettled(homePages).then((responses: any) => {
    let torrents: any = []
    responses.forEach((response: any) => {

      let { data, config } = response.value

      if (!response.value || response.value.status !== 200) {
        return;
      }

      let serviceInstance = getServiceByName(config.headers.name)
      torrents.push(...serviceInstance.setHTML(data).getItems())
    });
    res.json(torrents)
  })
}

export const SearchTorrents = (req: Request, res: Response) => {
  let query = req.query.query

  if (!query || typeof query !== 'string') {
    return res.status(400).json({
      error: 'Invalid search query.'
    })
  }

  let requestObject = { query }

  let searchPages = services.filter(item => item.status).map(item => {
    return item.getService().getSearchData(requestObject)
  })

  Promise.allSettled(searchPages).then((responses: any) => {
    let torrents: any = []
    responses.forEach((response: any) => {
      if (!response.value || response.value.status !== 200) {
        return;
      }
      let { data, config } = response.value
      let serviceInstance = getServiceByName(config.headers.name)
      torrents.push(...serviceInstance.setHTML(data).getItems())
    });
    res.json({ torrents })
  })
}


export const TorrentDetail = async (req: Request, res: Response) => {
  let { url } = req.query

  if (!url || typeof url !== 'string') {
    return res.status(400).json({
      error: 'URL Missing'
    })
  }

  const service = getServiceByUrl(url)
  if (!service) {
    return res.status(400).json({
      error: 'Service not found'
    })
  }

  try {
    const details: TorrentDetails = await service.getDetails(url)
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