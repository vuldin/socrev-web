//import { action, observable } from 'mobx'
import 'isomorphic-fetch'

let store = null

class Store {
  constructor() {
    //this.apiUrl = 'https://api.socialistrevolution.org'
    this.apiUrl = 'https://socrev-api-vuyzeqasle.now.sh'
    this.site = 'https://socialistrevolution.org'
  }

  getCategories = async () => {
    const res = await fetch(`${this.apiUrl}/categories`)
    const result = await res.json()
    return result
  }

  getIndexPosts = async (isServer, page) => {
    let url = `${this.apiUrl}/posts?status=publish&page=${page}`
    const [countRes, postsRes] = await Promise.all([
      fetch(`${url}&count=true`),
      fetch(url),
    ])
    const [count, posts] = await Promise.all([countRes.json(), postsRes.json()])
    count.pagesLeft = Math.ceil(count.postsLeft / 12)
    count.page = page
    let result = {
      posts: posts,
      count: count,
    }
    return result
  }

  getSearchPosts = async (isServer, page, cat) => {
    //console.log(`getSearchPosts category: ${cat}`)
    /*
    if (!isServer && cat === undefined) {
      let path = window.location.pathname
      if (path.includes('/search/')) {
        console.log(`client, grabbing cat from url ${path}`)
        const segments = path.split('/')
        cat = segments[segments.length - 1]
      }
    }
    */
    let url = `${this.apiUrl}/posts?status=publish&page=${page}`
    if (cat) url = `${url}&category=${cat}`
    //console.log(`url ${url}`)
    const [countRes, postsRes] = await Promise.all([
      fetch(`${url}&count=true`),
      fetch(url),
    ])
    const [count, posts] = await Promise.all([countRes.json(), postsRes.json()])
    count.pagesLeft = Math.ceil(count.postsLeft / 12)
    count.page = page
    //console.log(`getSearchPosts ${JSON.stringify(count)}`)
    let result = {
      posts: posts,
      count: count,
    }
    return result
  }
}

export function initStore(isServer, lastUpdate = Date.now()) {
  if (isServer && typeof window === 'undefined') {
    return new Store(isServer, lastUpdate)
  } else {
    if (store === null) {
      store = new Store(isServer, lastUpdate)
    }
    return store
  }
}
