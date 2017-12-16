import React from 'react'
import { render } from 'react-dom'
import Layout from '../components/layout'
import 'isomorphic-fetch'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import Feature from '../components/feature'
import Excerpt from '../components/excerpt'
import Banner from '../components/banner'
import SubscriptionBanner from '../components/banners/subscription'
import { Provider } from 'mobx-react'
import { initStore } from '../store'
import ReactGA from 'react-ga'

export const initGA = () => {
  //console.log('GA init')
  ReactGA.initialize('UA-108015923-1')
}
export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export default class extends React.Component {
  componentDidMount() {
    initGA()
    logPageView()
  }
  handleClick(label) {
    ReactGA.event({
      category: 'Index',
      action: 'Clicked Link',
      label: label,
    })
  }

  static async getInitialProps({ req }) {
    // eslint-disable-next-line no-undef

    const isServer = !!req
    const store = initStore(isServer)

    const [postsRes, cats] = await Promise.all([
      store.getIndexPosts(isServer, 1),
      store.getCategories()
    ])
    let posts = postsRes.posts
    const pagesLeft = postsRes.count.pagesLeft
    const page = postsRes.count.page

    let feature
    for (let i = 0; i < posts.length && feature === undefined; i++) {
      if (posts[i].sticky) feature = posts.splice(i, 1)[0]
    }

    return {
      lastUpdate: store.lastUpdate,
      isServer,
      posts: posts,
      pagesLeft: pagesLeft,
      page: page,
      feature: feature,
      cats: cats
    }
  }
  constructor(props) {
    super(props)
    this.page = props.page
    this.pagesLeft = props.pagesLeft
    this.store = initStore(props.isServer, props.lastUpdate)
  }
  createRefComponents = pagesLeft => {
    let results = []
    for (let i = 2; i < pagesLeft + 2; i++) {
      results.push(<div key={i} ref={i} />)
    }
    return results
  }
  getNewContent = posts => {
    return (
      <div>
        <Banner />
        <PostWrapper>
          {posts.map((post, i) => {
            if (i < 6) {
              let result = <Excerpt key={i} post={post} />
              return result
            }
          })}
        </PostWrapper>
        <SubscriptionBanner location={'index'} />
        <PostWrapper>
          {posts.map((post, i) => {
            if (i >= 6) {
              let result = <Excerpt key={i} post={post} />

              return result
            }
          })}
        </PostWrapper>
        <div style={{ paddingTop: '20px' }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {this.pagesLeft > 0 ? (
            <Button
              className="more-component"
              onClick={() => {
                this.handleClick('More Articles')
                this.draw()
              }}
            >{`See more articles`}</Button>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }

  draw = async () => {
    this.page = this.page + 1
    const res = await this.store.getIndexPosts(this.props.isServer, this.page)
    const newPosts = res.posts
    this.pagesLeft = res.count.pagesLeft
    let newJsx = this.getNewContent(newPosts)
    document
      .querySelectorAll('.more-component')
      .forEach(c => (c.style.display = 'none'))
    render(newJsx, this.refs[this.page])
  }

  render() {
    const { feature, posts, cats } = this.props
    return (
      <Provider store={this.store}>
        <Layout cats={cats}>
          {feature !== undefined ? <Feature post={feature} /> : <div />}
          {this.getNewContent(posts)}
          {this.createRefComponents(this.pagesLeft)}
        </Layout>
      </Provider>
    )
  }
}

const PostWrapper = styled.div`
  /*
  margin: 20px 0 0 0;
  display: block;
  */
  display: block;
  padding: 20px 0 0 0;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  @media (min-width: 415px) {
    display: grid;
  }
  @media (min-width: 720px) {
    grid-template-columns: 1fr 1fr;
    margin: 20px 90px 0px 90px;
  }
  @media (min-width: 1150px) {
    grid-template-columns: 1fr 1fr 1fr;
    margin: 20px 90px 0px 90px;
  }
`
const A = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`
const Quote = styled.div`
  margin: 20px 0;
  background-color: #fefbed;
  font-size: 1.4em;
  font-weight: bold;
  padding: 0 20px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  @media (min-width: 720px) {
    padding: 0 90px;
  }
`
const Button = styled.a`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem;
  margin: 0.5rem 1rem;
  color: black;
  border: 2px solid #5a5a5a;
  cursor: pointer;
  /*&:hover {
    color: #800000;
    border-color: #800000;
  }*/
`
