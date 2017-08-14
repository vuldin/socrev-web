import { Parser } from 'html-to-react'
import Banner from './banner'
import ReactPlayer from 'react-player'
import FixedFooter from './fixedFooter.js'
import InteractionTool from './interactionTool'
import styled from 'styled-components'
import Categories from './categories'

const htmlToReactParser = new Parser()

const smallContentPaddingX = 20
const noBannerArticles = ['join-the-imt'] // article slugs that don't need a banner

export default ({ post }) => {
  let article = {}
  article.isSticky = post.sticky
  article.slug = post.slug
  article.categories = post.categories
  let { title, excerpt, content, featured_media } = post
  let { source_url } = featured_media
  article.title = htmlToReactParser.parse(title.rendered)
  let author = 'IMT member'
  excerpt = htmlToReactParser.parse(excerpt.rendered)
  const acf = post.acf
  if (acf !== false) {
    if (acf.imt_author !== undefined) {
      if (Object.prototype.toString.call(acf.imt_author) === '[object Array]') {
        // https://stackoverflow.com/questions/4775722/check-if-object-is-array#4775737
        author = ''
        acf.imt_author.forEach((a, i) => {
          if (i === 0) author = a
          else author += ` and ${a}`
        })
      } else {
        // imt_author was originally just a string, so this is for handling some older articles
        author = acf.imt_author
      }
    }
    if (acf.imt_excerpt !== undefined) excerpt = acf.imt_excerpt
  }
  article.author = author
  article.excerpt = excerpt
  content = htmlToReactParser.parse(content.rendered)
  content = content.filter(d => d !== '\n')
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
      content.splice(bannerIndex, 0, <Banner key={`banner${content.length}`} />)
    }
  }
  article.content = content
  let media = <div />
  if (source_url)
    media = (
      <figure>
        <img src={source_url} />
      </figure>
    )
  if (featured_media.video)
    media = (
      <ResponsivePlayer url={source_url} width={'100vw'} height={'56vw'} />
    )
  article.media = media
  return (
    <div>
      {article.isSticky || featured_media.video ? article.media : <span />}
      <Padding contentPaddingX={smallContentPaddingX}>
        <Side>
          <InteractionTool post={article} />
        </Side>
        <Content>
          <TitleArticle>{article.title}</TitleArticle>
          <Categories cats={article.categories} />
          <Author>{article.author}</Author>
          <Excerpt>
            {excerpt}
          </Excerpt>
          {!article.isSticky && !featured_media.video
            ? article.media
            : <span />}
          {article.content}
        </Content>
      </Padding>
      <FixedFooter article={article} />
      <FixedSide className='article-fixed-side'>
        <InteractionTool post={article} />
      </FixedSide>
    </div>
  )
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
    font-size: 2.1em;
  }
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
  @media (min-width: 950px){
    width: 950px !important;
    height: 534px !important;
  }
`
