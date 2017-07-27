const routes = (module.exports = require('next-routes')())

routes.add('/search/:id', 'search')
routes.add('/:slug', 'post')
routes.add('/', 'index')
