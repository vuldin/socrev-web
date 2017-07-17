const express = require('express')
const next = require('next')
const { join } = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

// next-routes
const routes = require('./routes')
const handler = routes.getRequestHandler(app)

const redirects = require('./redirects')

const rootStaticFiles = ['/favicon.ico', '/apple-touch-icon.png']

app.prepare().then(() => {
  const server = express()

  // static files
  const options = { root: join(__dirname, 'static') }
  rootStaticFiles.forEach(file => {
    console.log(file)
    server.get(file, (req, res) => {
      res.sendFile(file.slice(1), options)
    })
  })

  // redirects
  redirects.forEach(({ from, to, type = 301, method = 'get' }) => {
    server[method](from, (req, res) => {
      res.redirect(type, to)
    })
  })

  // dynamic routing via next-routes
  server.use(handler)

  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
