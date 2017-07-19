import React from 'react'
import styled from 'styled-components'
import { Parser } from 'html-to-react'
import ReactPlayer from 'react-player'

const htmlToReactParser = new Parser()
const contentMargin = 20
const contentPaddingX = 20
const smallContentPaddingX = 20

export default class extends React.Component {
  render () {
    let { title, excerpt, content, featured_media } = this.props.post
    let { source_url } = featured_media
    title = htmlToReactParser.parse(title.rendered)
    excerpt = htmlToReactParser.parse(excerpt.rendered)
    content = htmlToReactParser.parse(content.rendered)
    content = content.filter(d => d !== '\n')
    let isSticky = this.props.post.sticky
    let media = (
      <figure>
        <img src={source_url} />
      </figure>
    )
    if (featured_media.video)
      media = (
        <ResponsivePlayer url={source_url} width={'60vw'} height={'40vw'} />
      )
    return (
      <div>
        {isSticky && !featured_media.video ? media : <span />}
        <Padding contentPaddingX={smallContentPaddingX}>
          {!isSticky || featured_media.video ? media : <span />}
          <Title>{title}</Title>
          <Excerpt>
            {excerpt}
          </Excerpt>
          <Content>
            {content}
          </Content>
        </Padding>
      </div>
    )
  }
}
const ResponsivePlayer = styled(ReactPlayer)`
  margin: 0 auto;
  @media (min-width: 1100px) {
    width: 700px !important;
    height: 400px !important;
  }
`
const Padding = styled.div`
  margin: 0 ${props => props.contentPaddingX}px;
  overflow: hidden;
  @media (min-width: 720px) {
    margin: 0 90px;
  }
  @media (min-width: 1100px) {
    width: 700px;
    margin: 0 auto;
    /*
    column-count: 2;
    column-rule: 1px solid #e1e1e1;
    */
  }
`
const Title = styled.h2`
  margin: 80px 0 0 0;
  font-family: font74157;
  letter-spacing: -0.8px;
  font-size: 1.8em;
`
/*
const Title = styled.div`
  font-family: font74157;
  letter-spacing: -0.8px;
  font-weight: bold;
  font-size: 1.8em;
  word-wrap: break-word;
  padding-top: 80px;
`
*/
const Excerpt = styled.em`
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
  overflow: hidden;
  /*
  @media (min-width: 1100px) {
    width: 700px;
    margin: 0 auto;
  }
  */
`
