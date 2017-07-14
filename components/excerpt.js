import React from 'react'
import styled from 'styled-components'
import { Link } from '../routes'
import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser()
const contentMargin = 20
const contentPaddingX = 20

export default class extends React.Component {
  render () {
    let { title, excerpt, featuredMedia, slug } = this.props.post
    let srcUrl = featuredMedia.source_url
    title = htmlToReactParser.parse(title.rendered)
    excerpt = htmlToReactParser.parse(excerpt.rendered)
    return (
      <Excerpt>
        <Link prefetch route={`/${slug}`}>
          <A>
            <BackColor>
              <Picture id={srcUrl} />
            </BackColor>
            <Padding contentPaddingX={contentPaddingX}>
              <Title>{title}</Title>
              {excerpt}
            </Padding>
          </A>
        </Link>
      </Excerpt>
    )
  }
}

const BackColor = styled.div`
    height: 240px;
    background-color: #D80707;
    background-position: center top;
    background-size: cover;
    background-repeat: no-repeat;
`
const Picture = styled.div`
  height: 100%;
  background: ${props => {
    return `url(${props.id})`
  }};
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
`
const Padding = styled.div`
  padding: ${props => `0 ${contentPaddingX}px`};
`
const Excerpt = styled.div`
  overflow: hidden;
  &:hover ${Padding} {
    color: #600000;
  }
  &:hover ${Picture} {
    filter: brightness(1.1) grayscale(100%);
    opacity: 0.8;
  }
`
const A = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`
const Title = styled.h2`
  margin: 10px 0 0 0;
  font-family: font74157;
`