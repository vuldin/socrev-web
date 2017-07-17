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
    title = htmlToReactParser.parse(title.rendered)
    //console.log(excerpt.rendered)
    excerpt = htmlToReactParser.parse(excerpt.rendered)
    return (
      <Excerpt>
        <Link prefetch route={`/${slug}`}>
          <A>
            <Picture id={srcUrl} />
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
const Excerpt = styled.div`
  overflow: hidden;
  &:hover {
    opacity: .7;
  }
`
const Picture = styled.div`
  height: 200px;
  background: ${props => {
    return `url(${props.id})`
  }};
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
`
const A = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`
const Title = styled.h2`
  margin: 10px 0 0 0;
`
const Padding = styled.div`
  padding: ${props => `0 ${contentPaddingX}px`};
`
