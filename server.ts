import e from 'express'
import next from 'next'

const port = parseInt(process.env.PORT!, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = app.getRequestHandler()

app.prepare().then(() => {
    const server = e()

    server.get('/uzytkownik/:id', (req, res) => {
        return app.render(req, res, '/user', { id: req.params.id })
    })

    server.get('*', (req, res) => {
        return handler(req, res)
    })

    server.listen(port, (err: Error) => {
        if (err) {
            throw err
        }

        console.log(`> Ready on http://localhost:${port}`)
    })
})
