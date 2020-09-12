import { AxiosResponse } from 'axios';

export interface TorrentDetails {
  magnet_link: string,
  download_link?: string
}

export interface TorrentServiceInterface {
  html: string | object | Array<{}>;

  domObj: CheerioStatic;

  details: TorrentDetails;

  getSearchUrl (params: object): string;

  getSearchData (params: object): Promise<AxiosResponse>

  getHomePageUrl (): string | void;

  getHomePageData (params: object): Promise<AxiosResponse> | void;

  getLink (element: any): string;

  getTitle (element: any): string;

  getSizeInBytes (element: any): number;

  getSeeds (element: any): number;

  getLeechers (element: any): number;

  getMagnetLink?(element: any): string;

  setResults (): void;

  setDetails?(): void;

  getDetails?(url: string): Promise<TorrentDetails>;

}

export interface QueryParams {
  query: string,
  category?: string
}

export interface ServiceConfig {
  name: string,
  status: boolean,
  url: string,
  home?: boolean,
}

export interface TorrentItem {
  link: string,
  title: string,
  size: number,
  seeds: number,
  leech: number,
  magnet_link?: string,
  name?: string
}
