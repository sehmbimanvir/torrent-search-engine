import { BaseService } from './BaseService'
import { getSize } from './../helpers'
import { TorrentServiceInterface, QueryParams } from './../interfaces/torrent.interface'

class KickAssTorrent extends BaseService implements TorrentServiceInterface {

  getSearchUrl (params: QueryParams) {
    return `${this.config.url}/usearch/${params.query}/`
  }

  getLink (element: CheerioElement) {
    return `${this.config.url}${this.domObj(element).find('td:first-child').find('.markeredBlock  > a').attr('href')}`
  }

  getTitle (element: CheerioElement) {
    return this.domObj(element).find('td:first-child').find('.markeredBlock  > a').text()
  }

  getSizeInBytes (element: CheerioElement) {
    let size = this.domObj(element).find('td:nth-child(2)').text()
    return getSize(size)
  }

  getSeeds (element: CheerioElement): number {
    return +this.domObj(element).find('td:nth-child(5)').text()
  }

  getLeechers (element: CheerioElement): number {
    return +this.domObj(element).find('td:nth-child(6)').text()
  }

  setResults () {
    this.domObj('table.data.frontPageWidget tr:not(:first-child)').each((index: number, element: CheerioElement) => {
      let link = this.getLink(element)
      let title = this.getTitle(element)
      let size = this.getSizeInBytes(element)
      let seeds = this.getSeeds(element)
      let leech = this.getLeechers(element)
      this.setItem({ link, title, size, seeds, leech })
    })
  }

  setDetails () {
    this.details.magnet_link = this.domObj('a[title="Magnet link"]').attr('href') || ''
  }
}

export default KickAssTorrent