import React from 'react'
import Layout from '../components/layout'
import 'isomorphic-fetch'
import { Flex, Box } from 'grid-styled'
import Feature from '../components/feature'
import Excerpt from '../components/excerpt'

export default class extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch(
      'http://jlpwptest.localtunnel.me/wp-json/wp/v2/posts'
    )
    const json = await res.json()
    const usersRes = await fetch(
      'http://jlpwptest.localtunnel.me/wp-json/wp/v2/users'
    )
    const usersJson = await usersRes.json()
    const categoriesRes = await fetch(
      'http://jlpwptest.localtunnel.me/wp-json/wp/v2/categories'
    )
    const categoriesJson = await categoriesRes.json()
    let featureCategoryId = 0
    json.forEach(post => {
      usersJson.forEach(author => {
        if (post.author == author.id) post.author = author.name
        featureCategoryId = categoriesJson.filter(
          cat => cat.name === 'Feature'
        )[0].id
      })
    })
    return {
      featureCategoryId,
      posts: json,
      users: usersJson
    }
  }
  render () {
    return (
      <Layout>
        <Flex wrap>
          {this.props.posts.map((post, i) => {
            let result = <Excerpt key={i} post={post} />
            if (post.categories.indexOf(this.props.featureCategoryId) > -1)
              result = <Feature key={i} post={post} />
            return result
          })}
        </Flex>
      </Layout>
    )
  }
}
