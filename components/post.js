import Banner from './banner'
import ReactPlayer from 'react-player'
import FixedFooter from './fixedFooter.js'
import InteractionTool from './interactionTool'
import styled from 'styled-components'
import Categories from './categories'
import SubscriptionBanner from '../components/banners/subscription'
import Markdown from 'react-markdown'

const smallContentPaddingX = 20
const noBannerArticles = ['join-the-imt'] // article slugs that don't need a banner

export default class Post extends React.Component {
  componentDidMount() {
    // disable scrolling on html element while article is shown
    // this was set back to auto in scroll:componentWillUpdate
    //document.scrollingElement.style.overflow = 'hidden'
  }
  render() {
    let { post } = this.props

    /*
    // banner
    if (noBannerArticles.find(d => d === article.slug) === undefined) {
      const ps = content.filter(c => c.type === 'p')
      let bannerIndex = 0
      if (ps.length > 4) {
        // insert between 4th and 5th paragraphs
        content.find((c, i) => {
          if (c.key === ps[3].key) {
            bannerIndex = i + 1
          }
        })
      }
      if (bannerIndex === 0) {
        // insert at bottom
        content.push(<Banner key={`banner${content.length}`} />)
      } else {
        content.splice(
          bannerIndex,
          0,
          <Banner key={`banner${content.length}`} />
        )
        if (bannerIndex <= ps.length - 3) {
          content.push(<SubscriptionBanner location={'article'} />)
        }
      }
    }
    article.content = content
    */

    // media
    const media = (
      <figure>
        <img src={post.media} style={{ marginTop: '-20px' }} />
      </figure>
    )
    /*
    let media = <div />
    if (source_url)
      media = (
        <figure>
          <img src={source_url} style={{ marginTop: '-20px' }} />
        </figure>
      )
    if (featured_media.video)
      media = (
        <ResponsivePlayer url={source_url} width={'100vw'} height={'56vw'} />
      )
    */
    return (
      <div>
        {post.isSticky ? media : <span />}
        <Padding contentPaddingX={smallContentPaddingX}>
          <Side>
            <InteractionTool post={post} />
          </Side>
          <Content>
            <TitleArticle>{post.title}</TitleArticle>
            <Categories cats={post.categories} />
            <Author>
              {post.authors.map((d, i) => <span key={i}>{d}</span>)}
            </Author>
            <Date>{post.date}</Date>
            <Excerpt>{post.excerpt}</Excerpt>
            {!post.isSticky ? media : <span />}
            {post.content.map((d, i) => {
              let result = <Markdown key={i} source={d.val} />
              if (d.key === 'img') {
                result = (
                  <figure key={i}>
                    <img src={d.val} />
                  </figure>
                )
              }
              return result
            })}
          </Content>
        </Padding>
        <FixedFooter article={post} />
        <FixedSide className="article-fixed-side">
          <InteractionTool post={post} />
        </FixedSide>
      </div>
    )
  }
}

const Padding = styled.div`
  margin: ${props =>
    `30px ${props.contentPaddingX}px 0 ${props.contentPaddingX}px`};
  overflow: hidden;
  display: flex;
  @media (min-width: 720px) {
    margin: ${props => `70px 90px 0 90px`};
  }
`
const Side = styled.div`
  flex: 0 0 150px;
  display: none;
  @media (min-width: 1100px) {
    display: inherit;
  }
`
const Content = styled.div`
  display: flex;
  flex-flow: column;
  overflow: hidden;
  @media (min-width: 1100px) {
    width: 700px;
    margin: 0 auto;
  }
`
const TitleArticle = styled.div`
  font-family: Mada, sans-serif;
  letter-spacing: -1.5px;
  font-size: 1.55em;
  @media (min-width: 720px) {
    font-size: 2.2em;
  }
  line-height: 1.2;
`
const Author = styled.div`
  padding-top: 10px;
  flex: 0 0 30px;
`
const Excerpt = styled.em`
  padding-top: 10px;
  padding-bottom: 20px;
`
const FixedSide = styled.div`
  display: none;
  position: fixed;
  width: 150px;
  left: 90px;
  top: 200px;
`
const ResponsivePlayer = styled(ReactPlayer)`
  margin: 0 auto;
  @media (min-width: 950px) {
    width: 950px !important;
    height: 534px !important;
  }
`

const Date = styled.div`
  line-height: 2;
`
