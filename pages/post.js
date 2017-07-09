import React from 'react'
import { Parser } from 'html-to-react'
import 'isomorphic-fetch'
import Layout from '../components/layout'
import Article from '../components/article'

const htmlToReactParser = new Parser()
//const apiUrl = 'https://socialistrevolution.xyz'
const apiUrl = 'https://api.socialistrevolution.org'
//const apiUrl = 'http://localhost:3001'

export default class extends React.Component {
  static async getInitialProps ({ query }) {
    const postRes = await fetch(`${apiUrl}/posts/${query.slug}`)
    let post = await postRes.json()
    return { post }
  }

  render () {
    const { post } = this.props
    const title = htmlToReactParser.parse(post.title.rendered)
    return (
      <Layout title={`IMT | ${title}`}>
        <Article post={post} />
      </Layout>
    )
  }
}
