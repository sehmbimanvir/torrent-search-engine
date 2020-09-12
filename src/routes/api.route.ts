import express, { Router } from 'express'
import TorrentRoutes from './torrent.route'

const router: Router = express.Router()

router.use('/torrents', TorrentRoutes)

export default router