import React from 'react'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import { Parser } from 'html-to-react'
import ReactPlayer from 'react-player'
import InteractionTool from './interactionTool'
import Banner from './banner'
import Categories from './categories'

const htmlToReactParser = new Parser()
const contentMargin = 20
const contentPaddingX = 20
const smallContentPaddingX = 20

const twitterHandle = 'usimt'
const site = 'https://socialistrevolution.org'
const tShareLink = `https://twitter.com/intent/tweet`
const fShareLink = `https://www.facebook.com/sharer/sharer.php?u=`
const gShareLink = 'https://plus.google.com/share?url='

export default class extends React.Component {
  render () {
    const post = this.props.post
    let { title, excerpt, content, featured_media } = post
    let { source_url } = featured_media
    title = htmlToReactParser.parse(title.rendered)
    let author = 'IMT member'
    excerpt = htmlToReactParser.parse(excerpt.rendered)
    const acf = this.props.post.acf
    if (acf !== false) {
      if (acf.imt_author !== undefined) {
        if (
          Object.prototype.toString.call(acf.imt_author) === '[object Array]'
        ) {
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
    post.excerpt = excerpt
    content = htmlToReactParser.parse(content.rendered)
    content = content.filter(d => d !== '\n')
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
      content.push(<Banner />)
    } else {
      content.splice(bannerIndex, 0, <Banner />)
    }
    let isSticky = post.sticky
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
    return (
      <div>
        {isSticky || featured_media.video ? media : <span />}
        <Padding contentPaddingX={smallContentPaddingX}>
          <Side>
            <InteractionTool post={post} />
          </Side>
          <Content>
            <TitleArticle>{title}</TitleArticle>
            <Author>{author}</Author>
            {/*
            <Categories>
              {post.categories.filter(c => c.parent !== 0).map((c, i) => {
                let result = c.name
                if (i > 0) result = ` / ${c.name}`
                return result
              })}
            </Categories>
            */}
            <Categories cats={post.categories} />
            <Excerpt>
              {excerpt}
            </Excerpt>
            {!isSticky && !featured_media.video ? media : <span />}
            {content}
          </Content>
        </Padding>
        <FixedFooter className='article-fixed-footer'>
          <a
            target='_blank'
            href={`${tShareLink}?original_referer=${encodeURI(
              `${site}/${post.slug}`
            )}&text=${excerpt.rendered !== undefined
              ? encodeURI(excerpt.rendered)
              : excerpt}&url=${encodeURI(
              `${site}/${post.slug}`
            )}&via=${twitterHandle}`}
            style={{
              textDecoration: 'none',
              cursor: 'pointer',
              color: 'inherit'
            }}
          >
            <FontAwesome name='twitter-square' style={{ color: '#55acee' }} />
          </a>
          <a
            target='_blank'
            href={`${gShareLink}${site}/${post.slug}`}
            style={{
              textDecoration: 'none',
              cursor: 'pointer',
              color: 'inherit'
            }}
          >
            <FontAwesome
              name='google-plus-official'
              style={{ color: '#ea4335' }}
            />
          </a>
          <a
            target='_blank'
            href={`${fShareLink}${site}/${post.slug}`}
            style={{
              textDecoration: 'none',
              cursor: 'pointer',
              color: 'inherit'
            }}
          >
            <FontAwesome name='facebook-square' style={{ color: '#3b5998' }} />
          </a>
        </FixedFooter>
        <FixedSide className='article-fixed-side'>
          <InteractionTool post={this.props.post} />
        </FixedSide>
      </div>
    )
  }
}
const Author = styled.div`
  padding-top: 10px;
  flex: 0 0 30px;
`
/*
const Categories = styled.div`
  font-size: .8em;
  letter-spacing: -0.8px;
  padding-top: 10px;
  flex: 0;
`
*/
const FixedSide = styled.div`
  display: none;
  position: fixed;
  width: 150px;
  left: 90px;
  top: 200px;
`
const Side = styled.div`
  flex: 0 0 150px;
  display: none;
  @media (min-width: 1100px) {
    display: inherit;
  }
`
const FixedFooter = styled.div`
  box-shadow: 0 0 0.2rem rgba(0,0,0,0.35);
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  position: fixed;
  height: 32px;
  width: 100vw;
  bottom: 0;
  background-color: white;
`
const ResponsivePlayer = styled(ReactPlayer)`
  margin: 0 auto;
  @media (min-width: 950px){
    width: 950px !important;
    height: 534px !important;
  }
`
const Padding = styled.div`
  margin: ${props =>
    `30px ${props.contentPaddingX}px 0 ${props.contentPaddingX}px`};
  overflow: hidden;
  display: flex;
  @media (min-width: 720px) {
    margin: ${props => `70px 90px 0 90px`};
  }
`
const Excerpt = styled.em`
  padding-top: 10px;
  padding-bottom: 20px;
  /*
  @media (min-width: 1100px) {
    width: 700px;
    margin: 0 auto;
  }
  */
`
const Picture = styled.div`
  background: ${props => {
    return `url(${props.url})`
  }};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
  font-family: font74157;
  letter-spacing: -0.8px;
  font-size: 1.6em;
  @media (min-width: 720px) {
    font-size: 2em;
  }
`