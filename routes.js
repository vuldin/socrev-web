const routes = (module.exports = require('next-routes')())

routes.add(`/find/:parent/:child`, 'search')
routes.add(`/find/:parent`, 'search')
routes.add(`/find`, 'search')
routes.add('/newpost/:slug', 'newpost') // TODO remove
routes.add(`/newpost`, 'newpost') // TODO remove
routes.add('/scroll/:slug', 'scroll') // TODO remove
routes.add(`/scroll`, 'scroll') // TODO remove
routes.add('/:slug', 'post')
routes.add('/', 'index')
