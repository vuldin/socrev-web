import React from 'react'
import 'isomorphic-fetch'
import Layout from '../components/layout'
import Post from '../components/post'
import { Provider } from 'mobx-react'
import { initStore } from '../store'
import ReactGA from 'react-ga'
import posts from '../tmp/posts.json'
import Markdown from 'react-markdown'

export const initGA = () => {
  //console.log('GA init')
  ReactGA.initialize('UA-108015923-1')
}
export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    const isServer = !!req
    const store = initStore(isServer)
    //const post = await fetch(`${store.apiUrl}/posts/${query.slug}`),
    const post = posts[0]

    return {
      isServer,
      post,
    }
  }
  constructor(props) {
    super(props)
    this.store = initStore(props.isServer)
  }
  componentDidMount() {
    initGA()
    logPageView()
  }
  render() {
    const { post } = this.props
    const title = post.title
    const date = post.date
    const excerpt = post.excerpt
    const cats = post.categories
    /*
    const media = (
      <figure>
        <img src={post.media} style={{ marginTop: '-20px' }} />
      </figure>
    )
    */
    return (
      <Provider store={this.store}>
        <Layout
          title={`${title} | Socialist Revolution`}
          canonical={`${this.store.site}/${post.slug}`}
          cats={cats}
          meta={[
            {
              name: 'description',
              content: excerpt,
            },
            {
              property: 'og:description',
              content: excerpt,
            },
            {
              property: 'og:site_name',
              content: 'Socialist Revolution',
            },
            {
              property: 'twitter:site',
              content: '@usimt',
            },
            {
              property: 'robots',
              content: 'index,follow',
            },
            {
              property: 'og:title',
              content: `${title}`,
            },
            {
              property: 'og:type',
              content: 'article',
            },
            {
              property: 'og:url',
              content: `${this.store.site}/${post.slug}`,
            },
            {
              property: 'og:date',
              content: `${date}`,
            },
            {
              property: 'twitter:title',
              content: `${title}`,
            },
            {
              property: 'twitter:description',
              content: excerpt,
            },
            {
              property: 'og:image',
              content: post.media,
            },
            {
              property: 'article:author',
              content: 'https://www.facebook.com/socialistrevolutionimt/',
            },
            {
              property: 'twitter:card',
              content: 'summary_large_image',
            },
            {
              property: 'twitter:image:src',
              content: post.media,
            },
          ]}
        >
          <Post post={post} />
        </Layout>
      </Provider>
    )
  }
}
