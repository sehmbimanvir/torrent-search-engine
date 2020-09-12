import Axios from 'axios'
import { TorrentItem, ServiceConfig, TorrentDetails, QueryParams } from './../interfaces/torrent.interface'
import cheerio from 'cheerio'

export abstract class BaseService {
  html: any = ''
  domObj = <CheerioStatic>{}
  items: TorrentItem[] = []
  details = <TorrentDetails>{}

  constructor(protected config: ServiceConfig) { }

  /**
   * Set Results for Listing (Needs to be define in Service Class)
   */
  setResults () { }

  /**
   * Set Torrent Details for Detail Page (Needs to be define in Service Class)
   */
  setDetails () { }

  /**
   * Get Search Url (Needs to be define in Service Class)
   * @param params QueryParams
   * 
   * @returns string
   */
  getSearchUrl (params: QueryParams) {
    return this.config.url
  }


  /**
   * Get Homepage Url - Trending Torrents (Needs to be define in Service Class)
   * @returns string
   */
  getHomePageUrl () {
    return this.config.url
  }


  /**
   * Get Search Data from Search Url
   * @param params QueryParams
   * 
   * @returns Promise<AxiosResponse>
   */
  getSearchData (params: QueryParams) {
    return Axios.get(this.getSearchUrl(params), {
      headers: { name: this.config.name }
    })
  }

  /**
   * Get Search Data from Homepage Url
   * @returns Promise<AxiosResponse>
   */
  getHomePageData () {
    return Axios.get(this.getHomePageUrl(), {
      headers: { name: this.config.name }
    })
  }


  /**
   * Set HTML, DOM Object for crawled URL
   * @param html string | object
   * 
   */
  setHTML (html: string | object) {
    this.html = html
    if (typeof html === 'string') {
      this.domObj = cheerio.load(html)
    }
    return this
  }

  /**
   * Set Item for Listing
   * @param item TorrentItem
   */
  setItem (item: TorrentItem) {
    this.items.push({ ...item, name: this.config.name })
  }


  /**
   * Set Torrent Detail Page
   * @param url string
   */
  async setDetailPage (url: string) {
    let { data } = await Axios.get(url)
    this.setHTML(data)
  }


  /**
   * Get Listing Items
   * 
   * @returns Array<TorrentItem>
   */
  getItems () {
    if (!this.items.length) {
      this.setResults()
    }
    return this.items
  }

  /**
   * Get Torrent Detais
   * @param url 
   * 
   * @returns TorrentDetails
   */
  async getDetails (url: string) {
    await this.setDetailPage(url)
    this.setDetails()
    return this.details
  }
}