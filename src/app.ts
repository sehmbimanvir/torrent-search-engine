import { TrendingTorrents, SearchTorrents, TorrentDetail } from './Controller/TorrentController'
import express, { Application } from 'express'

const app: Application = express()

const PORT = process.env.PORT || 3000

app.get('/trending', TrendingTorrents)

app.get('/search', SearchTorrents)

app.get('/details', TorrentDetail)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))