import { BaseService } from './BaseService'
import { getSize } from './../helpers'
import { TorrentServiceInterface, QueryParams } from './../interfaces/torrent.interface'

class EttvDl extends BaseService implements TorrentServiceInterface {

  getSearchUrl (params: QueryParams) {
    return `${this.config.url}/torrents-search.php?search=${params.query}`
  }

  getLink (element: CheerioElement) {
    return `${this.config.url}${this.domObj(element).find('td:nth-child(2)').find('a').attr('href')}`
  }

  getTitle (element: CheerioElement) {
    return this.domObj(element).find('td:nth-child(2)').find('a').text()
  }

  getSizeInBytes (element: CheerioElement) {
    let size = this.domObj(element).find('td:nth-child(4)').text()
    return getSize(size)
  }

  getSeeds (element: CheerioElement): number {
    return +this.domObj(element).find('td:nth-child(6)').text()
  }

  getLeechers (element: CheerioElement): number {
    return +this.domObj(element).find('td:nth-child(7)').text()
  }

  setResults () {
    this.domObj('table.table.table-hover.table-bordered > tbody > tr').each((index: number, element: CheerioElement) => {
      let link = this.getLink(element)
      let title = this.getTitle(element)
      let size = this.getSizeInBytes(element)
      let seeds = this.getSeeds(element)
      let leech = this.getLeechers(element)
      this.setItem({ link, title, size, seeds, leech })
    })
  }

  setDetails () {
    this.details.magnet_link = this.domObj('a.download_link.magnet').attr('href') || ''
    this.details.download_link = this.domObj('a.download_link.file').attr('href') || ''
  }
}

export default EttvDl