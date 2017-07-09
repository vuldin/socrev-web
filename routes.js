const routes = (module.exports = require('next-routes')())

routes.add('program').add('post', '/:slug')
//.add({ name: 'post', pattern: '/:slug', page: 'post' })
//.add({ name: 'beta', pattern: '/v3', page: 'v3' })
