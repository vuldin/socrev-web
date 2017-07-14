import React from 'react'
import styled from 'styled-components'
import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser()
const contentMargin = 20
const contentPaddingX = 20
const smallContentPaddingX = 20

export default class extends React.Component {
  render () {
    let { title, excerpt, content, featuredMedia } = this.props.post
    let { source_url } = featuredMedia
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
        <Picture contentPaddingX={contentPaddingX} style={{ background: `url(${source_url})` }}>
          <Title>{title}</Title>
        </Picture>
        <Padding contentPaddingX={smallContentPaddingX}>
          <Content>
            <em>
              {excerpt}
            </em>
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
  @media (min-width: 900px) {
    margin: 0 120px;
    /*
    column-count: 2;
    column-rule: 1px solid #e1e1e1;
    */
  }
`
const Picture = styled.div`
  display: grid;
  justify-items: right;
  align-items: end;
  padding: ${props => `0 ${props.contentPaddingX}px`};
  min-height: 200px;
  height: 70vh;
  width: 100vw;
  margin-bottom: ${contentMargin}px;
  background-position: center top;
  background-size: cover;
  background: no-repeat;
  color: #fff;
  text-shadow:
    0px 0px 10px black,
    0px 0px 10px black,
    0px 0px 10px black,
    0px 0px 10px black,
    0px 0px 10px black;
`
const Title = styled.div`
  font-weight: bold;
  font-size: 2.6em;
  font-family: font74157;
  padding: 70px;
`
const Content = styled.div`
  width: 70%;
  margin: 0 auto;
`