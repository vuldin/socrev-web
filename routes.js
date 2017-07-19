const routes = (module.exports = require('next-routes')())

routes.add('program').add('post', '/:slug')
