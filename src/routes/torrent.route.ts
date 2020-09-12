import {
  TrendingTorrents,
  SearchTorrents,
  TorrentDetail,
  TorrentSitesStatus
} from './../controllers/torrent.controller'

import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/trending', TrendingTorrents)

router.get('/search', SearchTorrents)

router.get('/status', TorrentSitesStatus)

router.get('/:service/details', TorrentDetail)

export default router