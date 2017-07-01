import React from 'react'
import styled from 'styled-components'
import { Box } from 'grid-styled'
import Parser from 'html-react-parser'

const contentMargin = 20

export default class extends React.Component {
  render () {
    let { title, excerpt, featuredMedia } = this.props.post
    let srcUrl = featuredMedia.source_url
    title = Parser(title.rendered)
    excerpt = Parser(excerpt.rendered)
    return (
      <Box width={1 / 3} style={{ height: '500px' }}>
        <Excerpt ml={this.props.ml} mr={this.props.mr}>
          <Picture id={srcUrl} />
          <Title>{title}</Title>
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
  background: ${props => {
    return `url(${props.id})`
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
