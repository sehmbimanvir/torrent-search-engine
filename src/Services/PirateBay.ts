import { BaseService } from './BaseService'
import { TorrentServiceInterface, QueryParams } from './../interfaces/torrent.interface'

interface PirateBayItem {
  id: string,
  name: string,
  info_hash?: string,
  leechers: string,
  seeders: string,
  num_files?: string,
  size: string,
  username?: string,
  added?: string,
  status?: string,
  category?: string,
  imdb?: string
}

class PirateBay extends BaseService implements TorrentServiceInterface {

  trackers = [
    'tr=udp://tracker.coppersurfer.tk:6969/announce',
    'tr=udp://9.rarbg.to:2920/announce',
    'tr=udp://tracker.opentrackr.org:1337',
    'tr=udp://tracker.internetwarriors.net:1337/announce',
    'tr=udp://tracker.leechers-paradise.org:6969/announce',
    'tr=udp://tracker.coppersurfer.tk:6969/announce',
    'tr=udp://tracker.pirateparty.gr:6969/announce',
    'tr=udp://tracker.cyberia.is:6969/announce',
  ]

  getSearchUrl (params: QueryParams) {
    return `${this.config.url}/q.php?q=${params.query}`
  }

  getLink (item: PirateBayItem) {
    return `https://thepiratebay.org/description.php?id=${item.id}`
  }

  getTitle (item: PirateBayItem) {
    return item.name
  }

  getSizeInBytes (item: PirateBayItem) {
    return +item.size
  }

  getSeeds (item: PirateBayItem) {
    return +item.seeders
  }

  getLeechers (item: PirateBayItem) {
    return +item.leechers
  }

  getMagnetLink (item: PirateBayItem) {
    return `magnet:?xt=urn:btih:${item.info_hash}&dn=${item.name}&${this.trackers.join('&')}`
  }

  setResults () {
    this.html.forEach((item: any) => {
      let link = this.getLink(item)
      let title = this.getTitle(item)
      let size = this.getSizeInBytes(item)
      let seeds = this.getSeeds(item)
      let leech = this.getLeechers(item)
      let magnet_link = this.getMagnetLink(item)
      this.setItem({ link, title, size, seeds, leech, magnet_link })
    })
  }
}

export default PirateBay