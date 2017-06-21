import React from 'react'
import Parser from 'html-react-parser'

export default class extends React.Component {
  render () {
    return (
      <div>
        {Parser(this.props.post.content.rendered, {
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
    )
  }
}
