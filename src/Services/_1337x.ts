import { BaseService } from './BaseService'
import { getSize } from './../helpers'
import { TorrentServiceInterface, QueryParams } from './../interfaces/torrent.interface'

class _1337x extends BaseService implements TorrentServiceInterface {

  getSearchUrl (params: QueryParams) {
    return `${this.config.url}/search/${params.query}/1/`
  }

  getHomePageUrl () {
    return `${this.config.url}/trending`
  }

  getLink (element: cheerio.Cheerio) {
    return `${this.config.url}${this.domObj(element).find('td:nth-child(1) > a:not(.icon)').attr('href')}`
  }

  getTitle (element: cheerio.Cheerio) {
    let text = this.domObj(element).find('td:nth-child(1) > a:not(.icon)').text()
    return text.replace(/\n/g, '')
  }

  getSizeInBytes (element: cheerio.Cheerio) {
    let $sizeItemRow = this.domObj(element).find('td:nth-child(5)')
    $sizeItemRow.find('span.seeds').remove()
    let size = $sizeItemRow.text()
    return getSize(size)
  }

  getSeeds (element: cheerio.Cheerio): number {
    return +this.domObj(element).find('td.seeds').text()
  }

  getLeechers (element: cheerio.Cheerio): number {
    return +this.domObj(element).find('td.leeches').text()
  }

  setResults () {
    this.domObj('.table-list-wrap table tbody tr').each((index: number, element: cheerio.Cheerio) => {
      let link = this.getLink(element)
      let title = this.getTitle(element)
      let size = this.getSizeInBytes(element)
      let seeds = this.getSeeds(element)
      let leech = this.getLeechers(element)
      this.setItem({ link, title, size, seeds, leech })
    })
  }

  setDetails () {
    let $resultBox = this.domObj('div.no-top-radius ul')
    this.details.magnet_link = $resultBox.find('li > a').attr('href') || ''
    this.details.download_link = $resultBox.find('ul.dropdown-menu > li > a').attr('href')
  }
}

export default _1337x