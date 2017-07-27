import React from 'react'
import { Parser } from 'html-to-react'
import 'isomorphic-fetch'
import Layout from '../components/layout'
import Article from '../components/article'

const site = 'https://socialistrevolution.org'
const htmlToReactParser = new Parser()
const apiUrl = 'https://api.socialistrevolution.org'

export default class extends React.Component {
  static async getInitialProps ({ query }) {
    /*
    const postRes = await fetch(`${apiUrl}/posts/${query.slug}`)
    let post = await postRes.json()
    */
    const [postRes, catsRes] = await Promise.all([
      fetch(`${apiUrl}/posts/${query.slug}`),
      fetch(`${apiUrl}/categories`)
    ])
    const [post, cats] = await Promise.all([postRes.json(), catsRes.json()])
    return { post, cats }
  }

  render () {
    const { post, cats } = this.props
    const title = htmlToReactParser.parse(post.title.rendered)
    let excerpt = post.excerpt.rendered
    const acf = post.acf
    if (acf !== false) {
      if (acf.imt_excerpt !== undefined) excerpt = acf.imt_excerpt
    }
    return (
      <Layout
        title={`IMT | ${title}`}
        canonical={`${site}/${post.slug}`}
        cats={cats}
        meta={[
          {
            name: 'description',
            content: excerpt
          },
          {
            property: 'og:description',
            content: excerpt
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
            content: excerpt
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
