import { BaseService } from './BaseService'
import { getSize } from '../helpers'
import { QueryParams, TorrentServiceInterface } from '../interfaces/torrent.interface'

class Zooqle extends BaseService implements TorrentServiceInterface {

  getSearchUrl (params: QueryParams) {
    return `${this.config.url}/search/?q=${params.query}`
  }

  getLink (element: CheerioElement) {
    return `${this.config.url}${this.domObj(element).find('td.text-trunc').find('a').attr('href')}`
  }

  getTitle (element: CheerioElement) {
    return this.domObj(element).find('td.text-trunc').find('a').text().trim()
  }

  getSizeInBytes (element: CheerioElement) {
    let size = this.domObj(element).find('td:nth-child(4) > .progress > .progress-bar').text()
    return getSize(size)
  }

  getSeeds (element: CheerioElement): number {
    return +this.domObj(element).find('td:nth-child(6)').find('.prog-green.prog-l').text()
  }

  getLeechers (element: CheerioElement): number {
    return +this.domObj(element).find('td:nth-child(6)').find('.prog-green.prog-r').text()
  }

  getMagnetLink (element: CheerioElement) {
    return this.domObj(element).find('td > ul.nav > li > a[title="Magnet link"]').attr('href') || ''
  }

  setResults () {
    this.domObj('table.table-torrents tbody tr').each((index: number, element: CheerioElement) => {
      let link = this.getLink(element)
      let title = this.getTitle(element)
      let size = this.getSizeInBytes(element)
      let seeds = this.getSeeds(element)
      let leech = this.getLeechers(element)
      let magnet_link = this.getMagnetLink(element)
      this.setItem({ link, title, size, seeds, leech, magnet_link })
    })
  }
}

export default Zooqle