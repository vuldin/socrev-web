import React from 'react'
import Parser from 'html-react-parser'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

const contentPaddingX = '90px'

export default class extends React.Component {
  render () {
    let title = this.props.post.title.rendered
    let author = this.props.post.author
    let excerpt = this.props.post.excerpt.rendered
    console.log(title, author, excerpt)
    return (
      <Feature>
        <Box mx={contentPaddingX} my={1}>
          <div>{title}</div>
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
        </Box>
      </Feature>
    )
  }
}
const Feature = styled(Flex)`
  /*
  background: url(//marx.imageresizer.io/ih5l1.jpg) no-repeat center center;
  */
  order: 1;
  width: 100vw;
  height: 50vh;
  background: url(//marx.imageresizer.io/ih5l1.jpg);
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
