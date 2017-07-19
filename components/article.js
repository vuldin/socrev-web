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
    /*
    const columnContent = []
    while (content.length) {
      columnContent.push(content.splice(0, 4))
    }
    console.log(columnContent)
    */
    let media = (
      <figure
        style={{
          background: `url(${source_url})`,
          paddingTop: '56.25%'
        }}
      />
    )
    if (featured_media.video)
      media = (
        <ResponsivePlayer url={source_url} width={'100vw'} height={'55vw'} />
      )
    return (
      <div>
        {media}
        <Padding contentPaddingX={smallContentPaddingX}>
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
  /*
  width: 100vw !important;
  height: 60vw !important;
  */
  margin: 0 auto;
  @media (min-width: 720px) {
    padding: 0 90px;
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
const Title = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  word-wrap: break-word;
  padding-top: 20px;
  @media (min-width: 500px) {
    font-size: 1.7em;
  }
  /*
  @media (min-width: 1100px) {
    width: 700px;
    margin: 0 auto;
  }
  */
`
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
