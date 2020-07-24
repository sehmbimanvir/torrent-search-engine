# Torrent Search Engine API
This is a torrent search engine API which will returns the list of torrents by crawling various torrent sites. API is designed in such a way that you can easily add any new torrent website.

### Features
- Easy to adapt. You can add any new torrent site by inheriting the Base service.
- Exclude any specific service.
- Include trending torrents for service.
- Typescript used for strict type checking.

### Enable / Disable Service
For Switching service **ON/OFF**. Navigate to **src/app/services.ts** file and set **status** field to True/False as per your need. 

### How to Install ?

**Step 1:** Clone this repository
```git clone ```

**Step 2:** Install NPM Packages
```npm install```

**Step 3:** 
For Development Mode, Run ```npm run dev```
For Build, Run ```npm run build```
For Production, Run ```npm start```

## API Routes
Details of API Endpoints

### Trending Torrents
List all the torrents for services where home url has been configured. 
- **URL**
/trending

- **Method**
GET

### Search Torrents
List all the torrents based on your search query
- **URL**
/search

- **Method**
GET

- **URL Params**
**Required:**
```query=[string]```

### Torrent Detail
It will give you the details for a given torrent link
- **URL**
/details

- **Method**
GET

- **URL Params**
**Required:**
```url=[string]```