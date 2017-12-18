import React from 'react'
import { render } from 'react-dom'
import Layout from '../components/layout'
import 'isomorphic-fetch'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import Excerpt from '../components/excerpt'
import Banner from '../components/banner'
import SearchCategories from '../components/searchCategories'
import { Provider } from 'mobx-react'
import { initStore } from '../store'
import ReactGA from 'react-ga'
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Stats,
  SortBy,
  Pagination,
} from 'react-instantsearch/dom'
import Link from 'next/link'

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
  static async getInitialProps({ query, req }) {
    // eslint-disable-next-line no-undef

    const isServer = !!req
    const store = initStore(isServer)

    let parentCatId = query.parent
    let childCatId = query.child
    if (parentCatId !== undefined) {
      parentCatId = parentCatId
    }
    if (childCatId !== undefined) {
      childCatId = childCatId
    }

    const [postsRes, cats] = await Promise.all([
      store.getPostsByPage(1),
      store.getCategories(),
    ])
    //const postsRes = await store.getPostsByPage(1)
    const posts = postsRes.posts
    const pagesLeft = postsRes.count.pagesLeft
    const page = postsRes.count.page

    return {
      lastUpdate: store.lastUpdate,
      isServer,
      parentCatId: parentCatId,
      childCatId: childCatId,
      posts: posts,
      pagesLeft: pagesLeft,
      page: page,
      cats: cats,
    }
  }
  constructor(props) {
    super(props)
    this.page = props.page
    this.pagesLeft = props.pagesLeft
    this.parentCatId = props.parentCatId
    this.childCatId = props.childCatId
    this.state = {
      posts: props.posts,
    }
    this.store = initStore(props.isServer, props.lastUpdate)
  }

  draw = async () => {
    this.page = this.page + 1
    const res = await this.store.getSearchPosts(
      this.props.isServer,
      this.page,
      this.props.childCatId ? this.props.childCatId : this.props.parentCatId
    )
    const newPosts = res.posts
    this.pagesLeft = res.count.pagesLeft
    //console.log(`draw pagesLeft ${this.pagesLeft}`)
    //console.log(typeof this.pagesLeft)
    const posts = this.state.posts.concat(newPosts)
    this.setState({ posts: posts })
  }

  render() {
    const { cats } = this.props
    if (
      this.childCatId !== this.props.childCatId ||
      this.parentCatId !== this.props.parentCatId
    ) {
      this.childCatId = this.props.childCatId
      this.parentCatId = this.props.parentCatId
      this.state.posts = this.props.posts
      this.pagesLeft = this.props.pagesLeft
      this.page = this.props.page
    }
    const { posts } = this.state
    //console.log(`render pagesLeft ${this.pagesLeft}`)
    let postArrays = []
    for (let i = 0; i < posts.length; i += 6) {
      postArrays.push(posts.slice(i, i + 6))
    }
    //console.log(`postArrays length ${postArrays.length}`)
    const fillers = [
      <Banner />,
      <A
        href="https://www.bolshevik.info/the-chain-is-no-stronger-than-its-weakest-link.htm"
        target="_blank"
      >
        <Quote>
          <blockquote>
            {`Your iron chain was poor and rusty enough as it is, and now it has several links made not even of wood, but of clay and paper.`}
          </blockquote>
          <em
            style={{ fontSize: '.8em' }}
          >{`Published in Pravda No. 67, June 9 (May 27), 1917`}</em>
        </Quote>
      </A>,
    ]
    let children = postArrays.map((pa, i) => {
      const fillerIndex = i % fillers.length
      return (
        <div key={i}>
          <PostWrapper>
            {pa.map((post, j) => {
              let result = <Excerpt key={j} post={post} />
              return result
            })}
          </PostWrapper>
          {fillers[fillerIndex]}
        </div>
      )
    })
    const HitExcerpt = ({ hit }) => {
      return (
        <div
          style={{ marginBottom: '10px', display: 'flex', flexFlow: 'column' }}
        >
          <Link href={`/${hit.slug}`}>
            <a>
              <Highlight attributeName="title" hit={hit} />
            </a>
          </Link>
          <div style={{ color: 'grey' }}>
            <Highlight attributeName="excerpt" hit={hit} />
          </div>
        </div>
      )
    }
    return (
      <Provider store={this.store}>
        <Layout cats={cats}>
          <InstantSearch
            apiKey="93a6d17fa8b5146a0a816101d4e97f14"
            appId="JXJDRPF1XP"
            indexName="posts"
          >
            <SearchBox translations={{ placeholder: 'Search' }} />
            <SearchCategories
              cats={cats}
              parentId={this.parentCatId}
              childId={this.childCatId}
            />
            <Stats />
            {/*
            <SortBy
              defaultRefinement="instant_search"
              items={[
                { value: 'instant_search', label: 'Most relevant' },
                { value: 'instant_search_date_asc', label: 'Oldest' },
                { value: 'instant_search_date_desc', label: 'Newest' },
              ]}
            />
            */}
            <Hits hitComponent={HitExcerpt} />
            <Pagination showLast />
          </InstantSearch>
        </Layout>
      </Provider>
    )
  }
}
/*
            {children}
            {this.pagesLeft ? (
              <div
                key={`button${children.length + 1}`}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  className="more-component"
                  onClick={() => this.draw()}
                >{`See more articles`}</Button>
              </div>
            ) : (
              <div key={`button${children.length + 1}`} />
            )}
*/

const PostWrapper = styled.div`
  /*
  margin: 20px 0 0 0;
  display: block;
  padding: 20px 0 0 0;
  */
  display: block;
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
  /* &:hover {
    color: #600000;
    border-color: #600000;
  } */
`
