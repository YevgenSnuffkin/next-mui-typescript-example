import express from 'express'
import { parse } from 'url'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // CUSTOM ROUTES GO HERE
  server.get('/blog/', (req, res) => {
    // const mergedQuery = Object.assign({}, req.query, req.params)

    console.log(req.query)
  })

  // THIS IS THE DEFAULT ROUTE, DON'T EDIT THIS
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  const port = process.env.PORT || 3000

  server.listen(port, (err: Error) => {
    if (err) {
        throw err
    }
    console.log(`> Ready on port ${port}...`)
  })
})
