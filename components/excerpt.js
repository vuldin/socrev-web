import React from 'react'
import styled from 'styled-components'
import { Link } from '../routes'
import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser()
const contentMargin = 20
const contentPaddingX = 20

export default class extends React.Component {
  render () {
    let { title, excerpt, featured_media, slug } = this.props.post
    let srcUrl = featured_media.source_url
    if (!srcUrl) {
      srcUrl = '/static/imt-wil-logo.jpg'
    }
    title = htmlToReactParser.parse(title.rendered)
    //console.log(excerpt.rendered)
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
    let media = (
      <BackColor>
        <Picture id={srcUrl} />
      </BackColor>
    )

    if (featured_media.video) {
      // https://img.youtube.com/vi/r2pJcLWsnOQ/0.jpg
      let playUrl = '/static/newplay.png'
      if (srcUrl.includes('youtube.com/') || srcUrl.includes('youtu.be/')) {
        // youtube link
        // https://img.youtube.com/vi/r2pJcLWsnOQ/0.jpg
        let regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
        let match = srcUrl.match(regex)
        //let youtubeId = 'r2pJcLWsnOQ'
        let youtubeId = ''
        if (match && match[7].length == 11) {
          youtubeId = match[7]
        }
        srcUrl = `https://img.youtube.com/vi/${youtubeId}/0.jpg`
      } else {
        srcUrl = '/static/black.png'
      }
      media = (
        <BackColor style={{ position: 'relative' }}>
          <Picture
            id={srcUrl}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          />
          <Picture
            id={playUrl}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          />
        </BackColor>
      )
    }
    return (
      <Excerpt>
        <Link prefetch route={`/${slug}`} passHref>
          <A>
            <Wrapper>
              {media}
              <Padding contentPaddingX={contentPaddingX}>
                <Title minHeight='70px'>{title}</Title>
                <Author>{author}</Author>
                <Description>
                  {excerpt}
                </Description>
                <Categories>
                  {this.props.post.categories
                    .filter(c => c.parent !== 0)
                    .map((c, i) => {
                      let result = c.name
                      if (i > 0) result = ` / ${c.name}`
                      return result
                    })}
                </Categories>
              </Padding>
            </Wrapper>
          </A>
        </Link>
      </Excerpt>
    )
  }
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
`
const Categories = styled.div`
  font-size: .8em;
  letter-spacing: -0.8px;
  padding-top: 10px;
  flex: 0;
`
const Description = styled.div`
  padding-top: 10px;
  flex: 1;
`
const Author = styled.div`
  font-size: .8em;
  letter-spacing: -0.8px;
  padding-top: 10px;
  flex: 0 0 30px;
`
const BackColor = styled.div`
    height: 275px;
    background-color: #D80707;
`
const Picture = styled.div`
  height: 100%;
  background: ${props => {
    return `url(${props.id})`
  }};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`
const Padding = styled.div`
  flex: auto;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: ${props => `20px ${contentPaddingX}px`};
`
const Excerpt = styled.div`
  overflow: hidden;
  padding-top: 30px;
  @media (max-width: 479px){
    font-size: 19px;
  }
`
const A = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
  &:hover ${Padding} {
    color: #600000;
  }
  &:hover ${Picture} {
    filter: brightness(1.1) grayscale(100%);
    opacity: 0.8;
  }
`
const Title = styled.h2`
  min-height: ${props => props.minHeight};
  margin: 0;
  font-family: Mada, sans-serif;
  letter-spacing: -1.2px;
  font-size: 1.5em;
  line-height: 1.2;
  @media (min-width: 480px){
    font-size: 1.6em;
  }
`