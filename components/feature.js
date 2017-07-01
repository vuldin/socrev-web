import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import Parser from 'html-react-parser'

const contentPaddingX = '90px'
const contentMargin = '20px'

export default class extends React.Component {
  render () {
    let { title, excerpt, featuredMedia } = this.props.post
    let srcUrl = featuredMedia.source_url
    title = Parser(title.rendered)
    excerpt = Parser(excerpt.rendered)
    return (
      <Feature image={srcUrl}>
        <Box mx={contentPaddingX} my={1}>
          <Title>{title}</Title>
          <Excerpt>{excerpt}</Excerpt>
        </Box>
      </Feature>
    )
  }
}
const Feature = styled(Flex)`
  min-height: 200px;
  height: 70vh;
  width: 100vw;
  margin-bottom: ${contentMargin};
  background: ${props => {
    return `url(${props.image})`
  }};
  /*
  filter: blur(40px);
  */
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
const Title = styled.div`
  font-weight: bold;
  font-size: 1.7em;
`
const Author = styled.div`
  font-size: .8em;
`
const Excerpt = styled.div``
