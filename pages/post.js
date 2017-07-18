import React from 'react'
import { Parser } from 'html-to-react'
import 'isomorphic-fetch'
import Layout from '../components/layout'
import Article from '../components/article'

const site = 'https://socialistrevolution.org'
const htmlToReactParser = new Parser()
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
      <Layout
        title={`IMT | ${title}`}
        canonical={`${site}/${post.slug}`}
        excerpt={post.excerpt.rendered}
        meta={[
          {
            name: 'description',
            content: post.excerpt.rendered
          },
          {
            property: 'og:description',
            content: post.excerpt.rendered
          },
          {
            property: 'og:site_name',
            content: 'Socialist Revolution'
          },
          {
            property: 'twitter:site',
            content: '@usimt'
          },
          {
            property: 'robots',
            content: 'index,follow'
          },
          {
            property: 'og:title',
            content: `${title}`
          },
          {
            property: 'og:type',
            content: 'article'
          },
          {
            property: 'og:url',
            content: `${site}/${post.slug}`
          },
          {
            property: 'twitter:title',
            content: `${title}`
          },
          {
            property: 'twitter:description',
            content: post.excerpt.rendered
          },
          {
            property: 'og:image',
            content: post.featured_media.source_url
          },
          {
            property: 'article:author',
            content: 'https://www.facebook.com/imtusa/'
          },
          {
            property: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            property: 'twitter:image:src',
            content: post.featured_media.source_url
          }
        ]}
      >
        <Article post={post} />
      </Layout>
    )
  }
}
