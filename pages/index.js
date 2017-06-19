import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import 'isomorphic-fetch'
import Post from '../components/post'

export default class extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch(
      'http://jlpwptest.localtunnel.me/wp-json/wp/v2/posts'
    )
    const json = await res.json()
    return { posts: json }
  }
  render () {
    return (
      <Layout>
        {this.props.posts.map((post, i) => <Post key={i} post={post} />)}
      </Layout>
    )
  }
}
