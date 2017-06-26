import React from 'react'
import Layout from '../components/layout'
import 'isomorphic-fetch'
import { Flex, Box } from 'grid-styled'
import Feature from '../components/feature'
import Excerpt from '../components/excerpt'

const contentPaddingX = '90px'
const contentMargin = 20
const apiUrl = 'https://socialistrevolution.xyz'

export default class extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const postsRes = await fetch(`${apiUrl}/posts`)
    const posts = await postsRes.json()
    const featureIndexes = []
    posts.forEach((p, i) => {
      if (p.isFeatured) featureIndexes.push(i)
    })
    const featureIndex =
      featureIndexes[Math.floor(Math.random() * featureIndexes.length)]
    const feature = posts.splice(featureIndex, 1)[0]
    return {
      posts: posts,
      feature: feature
    }
  }
  render () {
    const { feature, posts } = this.props
    return (
      <Layout>
        {feature !== undefined ? <Feature post={feature} /> : <div />}
        <Flex wrap px={contentPaddingX} mb={`${contentMargin}px`}>
          {posts.map((post, i) => {
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
