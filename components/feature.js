import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

const contentPaddingX = '90px'
const contentMargin = '20px'
const cdnUrl = 'https://marx.imageresizer.io'

export default class extends React.Component {
  render () {
    let { title, author, excerpt } = this.props.post
    let featuredImageId = this.props.post.featuredImage.id
    return (
      <Feature id={featuredImageId}>
        <Box mx={contentPaddingX} my={1}>
          <Title>{title}</Title>
          <Author>{author}</Author>
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
  /*
  background: url(${cdnUrl}/7rAih5lc.jpg);
  */
  background: ${props => {
    return `url(${cdnUrl}/${props.id}.jpg)`
  }};
  background-position: center;
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
