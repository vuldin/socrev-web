import React from 'react'
import styled from 'styled-components'
import { Parser } from 'html-to-react'

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
    return (
      <div>
        <figure
          style={{
            background: `url(${source_url})`,
            paddingTop: '56.25%'
          }}
        />
        <Padding contentPaddingX={smallContentPaddingX}>
          <Title>{title}</Title>
          <em>
            {excerpt}
          </em>
          <Content>
            {content}
          </Content>
        </Padding>
      </div>
    )
  }
}
const Padding = styled.div`
  margin: 0 ${props => props.contentPaddingX}px;
  @media (min-width: 720px) {
    margin: 0 90px;
  }
  @media (min-width: 1100px) {
    margin: 0 350px;
    /*
    column-count: 2;
    column-rule: 1px solid #e1e1e1;
    */
  }
`
const Title = styled.div`
  font-weight: bold;
  font-size: 1.7em;
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
`
