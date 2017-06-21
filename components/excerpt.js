import React from 'react'
import Parser from 'html-react-parser'
import styled from 'styled-components'

export default class extends React.Component {
  render () {
    let title = this.props.post.title.rendered
    let author = this.props.post.author
    let excerpt = this.props.post.excerpt.rendered
    console.log(title, author, excerpt)
    return (
      <Feature>
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
      </Feature>
    )
  }
}
const Feature = styled.div`
  background: url(//marx.imageresizer.io/ih5l1.jpg) no-repeat center center;
`
