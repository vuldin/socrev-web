import React from 'react'
import Layout from '../components/layout'
import 'isomorphic-fetch'
import { Flex, Box } from 'grid-styled'
import Feature from '../components/feature'
import Excerpt from '../components/excerpt'

const contentPaddingX = '90px'
const contentMargin = 20

export default class extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const [postsRes, usersRes, categoriesRes] = await Promise.all([
      fetch('http://jlpwptest.localtunnel.me/wp-json/wp/v2/posts'),
      fetch('http://jlpwptest.localtunnel.me/wp-json/wp/v2/users'),
      fetch('http://jlpwptest.localtunnel.me/wp-json/wp/v2/categories')
    ])
    const [postsJson, usersJson, categoriesJson] = await Promise.all([
      postsRes.json(),
      usersRes.json(),
      categoriesRes.json()
    ])
    let featureCategoryId = categoriesJson.filter(
      cat => cat.name === 'Feature'
    )[0].id
    //console.log(`feature category id ${featureCategoryId}`)
    let features = []
    postsJson.forEach((post, i) => {
      usersJson.forEach(author => {
        if (post.author == author.id) post.author = author.name
      })
      if (post.categories.indexOf(featureCategoryId) > -1) features.push(i)
    })
    //console.log('feature')
    //console.log(feature)
    let featureId = features[Math.floor(Math.random() * features.length)]
    let feature = postsJson.splice(featureId, 1)[0]
    return {
      posts: postsJson,
      users: usersJson,
      feature
    }
  }
  render () {
    return (
      <Layout>
        <Feature post={this.props.feature} />
        <Flex wrap px={contentPaddingX} mb={`${contentMargin}px`}>
          {this.props.posts.map((post, i) => {
            //console.log(i % 3)
            let result = (
              <Excerpt
                key={i}
                post={post}
                ml={i % 3 !== 0 ? contentMargin / 2 : 0}
                mr={i % 3 !== 2 ? contentMargin / 2 : 0}
              />
            )
            return result
          })}
        </Flex>
      </Layout>
    )
  }
}
