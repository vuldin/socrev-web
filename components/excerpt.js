import React from 'react'
import styled from 'styled-components'
import { Box } from 'grid-styled'
import Parser from 'html-react-parser'

const contentMargin = 20
const cdnUrl = 'https://marx.imageresizer.io'

export default class extends React.Component {
  render () {
    const { title, author, excerpt } = this.props.post
    let featuredImageId = 'Dlhih5l4'
    if (this.props.post.featuredImage !== undefined) {
      featuredImageId = this.props.post.featuredImage.id
    }
    return (
      <Box width={1 / 3} style={{ height: '500px' }}>
        <Excerpt ml={this.props.ml} mr={this.props.mr}>
          <Picture id={featuredImageId} />
          <Title>
            {title.includes('<') && title.includes('>') ? Parser(title) : title}
          </Title>
          <div>{author}</div>
          <div>{excerpt}</div>
        </Excerpt>
      </Box>
    )
  }
}
const Title = styled.h2`
  margin: ${contentMargin}px 0;
`
const Picture = styled.div`
  height: 50%;
  /*
  background: url(${cdnUrl}/5ioih5l8.jpg);
  */
  background: ${props => {
    return `url(${cdnUrl}/${props.id}.jpg)`
  }};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`
const Excerpt = styled.div`
  margin-left: ${props => {
    return `${props.ml}px`
  }};
  margin-right: ${props => {
    return `${props.mr}px`
  }};
  height: 100%;
  overflow: hidden;
`
