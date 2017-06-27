import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import Parser from 'html-react-parser'

const contentPaddingX = '90px'
const contentMargin = '20px'
const cdnUrl = 'https://marx.imageresizer.io'

export default class extends React.Component {
  render () {
    let { title, author, excerpt } = this.props.post
    let featuredImageId = this.props.post.featuredImage.id
    //let miniPreview = this.props.post.featuredImage.mini_preview
    return (
      <Feature image={featuredImageId}>
        <Box mx={contentPaddingX} my={1}>
          <Title>
            {title.includes('<') && title.includes('>') ? Parser(title) : title}
          </Title>
          <Author>{author}</Author>
          <Excerpt>
            {excerpt.includes('<') && excerpt.includes('>')
              ? Parser(excerpt)
              : excerpt}
          </Excerpt>
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
    let result = `url(${cdnUrl}/${props.image}.jpg)`
    if (props.image.length > 20)
      result = `url(data:image/jpg;base64,${props.image})`
    return result
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
