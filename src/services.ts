interface ServiceConfig {
  name: string,
  status: boolean,
  url: string,
  home?: boolean,
  getService (): any
}

