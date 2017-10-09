import React from 'react'
import { Parser } from 'html-to-react'
import 'isomorphic-fetch'
import Layout from '../components/layout'
import Article from '../components/article'
import { Provider } from 'mobx-react'
import { initStore } from '../store'

const htmlToReactParser = new Parser()

export default class extends React.Component {
  static async getInitialProps ({ req, query }) {
    const isServer = !!req
    const store = initStore(isServer)

    const [postRes, cats] = await Promise.all([
      fetch(`${store.apiUrl}/posts/${query.slug}`),
      store.getCategories()
    ])
    const post = await postRes.json()

    return {
      lastUpdate: store.lastUpdate,
      isServer,
      post,
      cats
    }
  }

  constructor (props) {
    super(props)
    this.store = initStore(props.isServer, props.lastUpdate)
  }

  render () {
    const { post, cats } = this.props
    const title = htmlToReactParser.parse(post.title.rendered)
    const date = htmlToReactParser.parse(post.date.rendered)
    let excerpt = post.excerpt.rendered
    const acf = post.acf
    if (acf !== false) {
      if (acf.imt_excerpt !== undefined) excerpt = acf.imt_excerpt
    }
    return (
      <Provider store={this.store}>
        <Layout
          title={`IMT | ${title}`}
          canonical={`${this.store.site}/${post.slug}`}
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
              content: `${this.store.site}/${post.slug}`
            },
            {
              property: 'og:date',
              content: `${date}`
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
              content: 'https://www.facebook.com/socialistrevolutionimt/'
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
      </Provider>
    )
  }
}
