import _1337x from './Services/_1337x'
import RarGB from './Services/RarGB'
import EttvDl from './Services/EttvDl'
import KickAssTorrent from './Services/KickAssTorrent'
import PirateBay from './Services/PirateBay'
import Zooqle from './Services/Zooqle'
import Nyaa from './Services/Nyaa'

interface ServiceConfig {
  name: string,
  status: boolean,
  url: string,
  home?: boolean,
  getService (): any
}

export const services: Array<ServiceConfig> = [
  {
    name: '1337x',
    status: true,
    url: 'https://1337x.am',
    home: true,
    getService: function () {
      let { name, status, url, home } = this
      return new _1337x({ name, status, url, home })
    }
  },
  {
    name: 'Rargb',
    status: false,
    url: 'https://rargb.to',
    home: false,
    getService: function () {
      let { name, status, url, home } = this
      return new RarGB({ name, status, url, home })
    }
  },
  {
    name: 'KickAssTorrent',
    status: false,
    url: 'https://kickasstorrent.cr',
    getService: function () {
      let { name, status, url } = this
      return new KickAssTorrent({ name, status, url })
    }
  },
  {
    name: 'EttvDl',
    status: false,
    url: 'https://ettvdl.com',
    getService: function () {
      let { name, status, url } = this
      return new EttvDl({ name, status, url })
    }
  },
  {
    name: 'PirateBay',
    status: false,
    url: 'https://apibay.org',
    getService: function () {
      let { name, status, url } = this
      return new PirateBay({ name, status, url })
    }
  },
  {
    name: 'Zooqle',
    status: false,
    url: 'https://zooqle.unblockninja.com',
    getService: function () {
      let { name, status, url } = this
      return new Zooqle({ name, status, url })
    }
  },
  {
    name: 'Nyaa',
    status: true,
    url: 'https://nyaa.si',
    getService: function () {
      let { name, status, url } = this
      return new Nyaa({ name, status, url })
    }
  }
]

export const getServiceByName = (name: string) => {
  const index = services.findIndex((item: ServiceConfig) => item.name === name)
  return services[index].getService()
}

export const getServiceByUrl = (url: string) => {
  let { host } = new URL(url)
  host = host.toLowerCase()
  let index = services.findIndex((service: ServiceConfig) => host.includes(service.name.toLowerCase()))
  return index > -1 ? services[index].getService() : false
}