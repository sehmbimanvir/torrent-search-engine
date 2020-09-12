import { BaseService } from './BaseService'
import { getSize } from '../helpers'
import { TorrentServiceInterface, QueryParams } from './../interfaces/torrent.interface'

class Nyaa extends BaseService implements TorrentServiceInterface {

  getSearchUrl (params: QueryParams) {
    return `${this.config.url}/?q=${params.query}`
  }

  getLink (element: CheerioElement) {
    return `${this.config.url}${this.domObj(element).find('td:nth-child(2) > a').attr('href')}`
  }

  getTitle (element: CheerioElement) {
    return this.domObj(element).find('td:nth-child(2) > a').text().trim()
  }

  getSizeInBytes (element: CheerioElement) {
    let size = this.domObj(element).find('td:nth-child(4)').text().replace('GiB', 'GB').replace('MiB', 'MB').replace('KiB', 'KB')
    return getSize(size)
  }

  getSeeds (element: CheerioElement): number {
    return +this.domObj(element).find('td:nth-child(6)').text()
  }

  getLeechers (element: CheerioElement): number {
    return +this.domObj(element).find('td:nth-child(7)').text()
  }

  getMagnetLink (element: CheerioElement) {
    return this.domObj(element).find('td:nth-child(3) > a:nth-child(2)').attr('href') || ''
  }

  setResults () {
    this.domObj('table.torrent-list tbody > tr').each((index: number, element: CheerioElement) => {
      let link = this.getLink(element)
      let title = this.getTitle(element)
      let size = this.getSizeInBytes(element)
      let seeds = this.getSeeds(element)
      let leech = this.getLeechers(element)
      let magnet_link = this.getMagnetLink(element)
      this.setItem({ link, title, size, seeds, leech, magnet_link })
    })
  }

  setDetails () {
    let $panelFooter = this.domObj('.panel-footer')
    this.details.download_link = (this.config.url) + $panelFooter.find('a').attr('href') || ''
    this.details.magnet_link = $panelFooter.find('a.card-footer-item').attr('href') || ''
  }
}

export default Nyaa