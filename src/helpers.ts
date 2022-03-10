import { ServiceConfig } from './interfaces/torrent.interface'

export const getSize = (size: string): number => {
  if (!size) {
    return 0
  }
  size = size.replace(',', '').toLowerCase()
  let sizeNum = parseFloat(size)
  let units = ['kb', 'mb', 'gb']
  for (let i = 0; i < units.length; i++) {
    sizeNum *= 1000

    if (size.includes(units[i])) {
      break
    }
  }
  return sizeNum
}


export const resolveService = async (serviceRow: any) => {
  let { name, status, url, home, service } = serviceRow

  try {
    let serviceClass = await import(`./Services/${service}`)
    return {
      name, status, url, home,
      getService: function () {
        return new serviceClass.default(serviceRow)
      }
    }
  } catch (err: any) {
    console.log('Err', err.toString())
  }
}


export const initializeServices = async (data: any) => {
  let services: any = []
  for (let i in data) {
    let service = await resolveService(data[i])
    if (service) {
      services.push(service)
    }
  }
  return services
}

export const getServiceByName = (servicess: any, name: string) => {
  const index = servicess.findIndex((item: ServiceConfig) => item.name === name)
  return servicess[index].getService()
}

export const resolveServicesData = async (services: any, data: any) => {
  let responses: any = await Promise.allSettled(data)
  let torrents: any = []
  responses.forEach((response: any) => {
    if (!response.value || response.value.status !== 200) {
      return;
    }
    let { data, config } = response.value

    let serviceInstance = getServiceByName(services, config.headers.name)
    torrents.push(...serviceInstance.setHTML(data).getItems())
  });
  return torrents
}

