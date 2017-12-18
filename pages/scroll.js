import InfiniteScroll from 'react-infinite-scroller'
/*
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Stats,
  SortBy,
  Pagination,
} from 'react-instantsearch/dom'
*/
import { initStore } from '../store'
import Excerpt from '../components/excerpt.scroll'
import Article from '../components/article.scroll'

export default class Scroll extends React.Component {
  static async getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(isServer)
    const postsRes = await store.getPostsByPage(1)
    const posts = postsRes.posts
    return {
      isServer,
      posts,
      store,
    }
  }
  constructor(props) {
    super(props)
    this.store = initStore(props.isServer)
    this.state = {
      posts: props.posts,
      hasMorePosts: true,
      isLoading: false,
    }
  }
  loadPosts(page) {
    this.setState({ isLoading: true })
    this.store.getPostsByPage(page).then(result => {
      let posts = this.state.posts.concat(result.posts)
      this.setState({
        posts,
        hasMorePosts: result.count.pagesLeft > 0 ? true : false,
        isLoading: false,
      })
    })
  }
  componentWillUpdate() {
    // allow scrolling on html element (since scrolling article isn't showing)
    // this was set to hidden in article:componentDidMount
    document.scrollingElement.style.overflow = 'auto'
  }
  render() {
    const { posts, hasMorePosts, isLoading } = this.state
    const slug = this.props.url.query.slug
    let post
    if (slug !== undefined) post = posts.find(p => slug === p.slug)
    const articleOverlay = (
      <div
        ref="articleOverlay"
        style={{
          display: post !== undefined ? 'inherit' : 'none',
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          overflowY: 'auto',
          background: 'white',
          zIndex: 10,
        }}
      >
        {post !== undefined ? <Article post={post} /> : <div />}
      </div>
    )
    /*
    let articleOverlay = <div ref="articleoverlay" />
    if (slug !== undefined) {
      if (this.refs.articleoverlay !== undefined) {
        // must not be from server
        console.log(this.refs.articleoverlay)
        this.refs.articleoverlay.scrollTop = 0
      }
      const post = posts.find(p => slug === p.slug)
      articleOverlay = (
        <div
          ref="articleoverlay"
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflowY: 'auto',
            background: 'white',
            zIndex: 10,
          }}
        >
          <Article post={post} />
        </div>
      )
    }
    */
    const loader = <div className="loader">Loading ...</div>
    let excerpts = []
    posts.map((post, i) => {
      excerpts.push(<Excerpt key={i} post={post} />)
    })
    return (
      <div>
        {articleOverlay}
        <InfiniteScroll
          pageStart={1}
          loadMore={this.loadPosts.bind(this)}
          hasMore={hasMorePosts}
          hasMore={hasMorePosts && !isLoading}
          loader={loader}
        >
          <div>{excerpts}</div>
        </InfiniteScroll>
      </div>
    )
  }
}
