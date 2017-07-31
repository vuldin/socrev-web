const routes = (module.exports = require('next-routes')())

/*
const parentCategories = ['47', '55', '58', '44']
let catString = ''
parentCategories.forEach((p, i) => {
  let result = `|${p}`
  if (i === 0) result = p
  catString += result
})
*/

//routes.add(`/:parent(${catString})/:child`, 'search')
//routes.add(`/:parent(${catString})`, 'search')
routes.add(`/find/:parent/:child`, 'search')
routes.add(`/find/:parent`, 'search')
routes.add(`/find`, 'search')
routes.add('/:slug', 'post')
routes.add('/', 'index')
