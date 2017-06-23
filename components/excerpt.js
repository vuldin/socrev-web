import React from 'react'
import Parser from 'html-react-parser'
import styled from 'styled-components'
import { Box } from 'grid-styled'

const contentMargin = 20

export default class extends React.Component {
  render () {
    let title = this.props.post.title.rendered
    let author = this.props.post.author
    let excerpt = this.props.post.excerpt.rendered
    return (
      <Box width={1 / 3} style={{ height: '500px' }}>
        <Excerpt ml={this.props.ml} mr={this.props.mr}>
          <Picture />
          <Title>{title}</Title>
          <div>{author}</div>
          <div>
            {Parser(excerpt, {
              replace: function (domNode) {
                if (domNode.type === 'tag') {
                  // keep src alt href is exists
                  let keeps = ['src', 'alt', 'href']
                  let keys = Object.keys(domNode.attribs)
                  let result = {}
                  keeps.forEach(keep => {
                    if (keys.indexOf(keep) > -1)
                      result[keep] = domNode.attribs[keep]
                  })
                  domNode.attribs = result
                }
                return domNode
              }
            })}
          </div>
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
  background: url(//marx.imageresizer.io/5ioih5l8.jpg);
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
