import React from 'react'
import styled from 'styled-components'
import Excerpt from './excerpt'
import { Link } from '../routes'
import MediaQuery from 'react-responsive'
//import { Flex, Box } from 'grid-styled'
import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser()
const contentMargin = 20
const contentPaddingX = 20

export default class extends React.Component {
  render () {
    let { title, excerpt, featured_media, slug } = this.props.post
    let srcUrl = featured_media.source_url
    title = htmlToReactParser.parse(title.rendered)
    excerpt = htmlToReactParser.parse(excerpt.rendered)
    return (
      <MediaQuery query='(min-width: 700px)'>
        {matches => {
          let result = <Excerpt post={this.props.post} />
          if (matches)
            result = (
              <Link prefetch route={`/${slug}`}>
                <A>
                  <Feature contentPaddingX={contentPaddingX} image={srcUrl}>
                    <Words>
                      <Title>{title}</Title>
                      {excerpt}
                    </Words>
                  </Feature>
                </A>
              </Link>
            )
          return result
        }}
      </MediaQuery>
    )
  }
}
//const Feature = styled(Flex)`
const Feature = styled.div`
  display: grid;
  justify-items: center;
  align-items: end;
  padding: ${props => `0 ${props.contentPaddingX}px`};
  min-height: 200px;
  height: 70vh;
  width: 100vw;
  margin-bottom: ${contentMargin}px;
  background: ${props => {
    return `url(${props.image})`
  }};
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
  text-shadow:
    0px 0px 10px black,
    0px 0px 10px black,
    0px 0px 10px black,
    0px 0px 10px black,
    0px 0px 10px black;
`
const Words = styled.div`
  padding: 50px;
  font-size: 1.1em;
`
const Title = styled.div`
  font-weight: bold;
  font-family: font74157;
  letter-spacing: -2.8px;
  margin-bottom: 20px;
  font-size: 2.3em;
`
const Author = styled.div`
  font-size: .8em;
`
const A = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`
