import { BaseService } from './BaseService'
import { getSize } from './../helpers'
import { QueryParams, TorrentServiceInterface } from './../interfaces/torrent.interface'

class RarGB extends BaseService implements TorrentServiceInterface {

  getSearchUrl (params: QueryParams) {
    return `${this.config.url}/search/?search=${params.query}`
  }

  getHomePageUrl () {
    return `${this.config.url}`
  }

  getLink (element: CheerioElement) {
    return `${this.config.url}${this.domObj(element).find('td:nth-child(2) > a').attr('href')}`
  }

  getTitle (element: CheerioElement) {
    return this.domObj(element).find('td:nth-child(2) > a').text().trim()
  }

  getSizeInBytes (element: CheerioElement) {
    let size = this.domObj(element).find('td:nth-child(5)').text()
    return getSize(size)
  }

  getSeeds (element: CheerioElement): number {
    return +this.domObj(element).find('td:nth-child(6)').text()
  }

  getLeechers (element: CheerioElement): number {
    return +this.domObj(element).find('td:nth-child(7)').text()
  }

  setResults () {
    this.domObj('table.lista2t tr.lista2').each((index: number, element: CheerioElement) => {
      let link = this.getLink(element)
      let title = this.getTitle(element)
      let size = this.getSizeInBytes(element)
      let seeds = this.getSeeds(element)
      let leech = this.getLeechers(element)
      this.setItem({ link, title, size, seeds, leech })
    })
  }

  setDetails () {
    this.details.magnet_link = this.domObj('#hvicwlo').attr('href') || ''
  }
}

export default RarGB