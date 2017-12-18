//import { action, observable } from 'mobx'
import 'isomorphic-fetch'

let store = null

class Store {
  constructor() {
    this.apiUrl = 'https://socrev-api-cmodjtynev.now.sh'
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

  getPostsByPage = async page => {
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
}

export function initStore(isServer) {
  if (isServer && typeof window === 'undefined') {
    return new Store()
  } else {
    if (store === null) {
      store = new Store()
    }
    return store
  }
}
