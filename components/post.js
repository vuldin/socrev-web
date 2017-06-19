import React from 'react'

/*
<figure style="width: 5013px" class="wp-caption alignnone">
  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c6/DCPS_Walkout%2C_Protesters_heading_to_the_Lincoln_Memorial_%2830974909966%29.jpg" alt="Protesters heading to the Lincoln Memorial" height="3342" width="5013">
  <figcaption class="wp-caption-text">By Lorie Shaull from Washington, United States [<a href="http://creativecommons.org/licenses/by-sa/2.0">CC BY-SA 2.0</a>], <a href="https://commons.wikimedia.org/wiki/File%3ADCPS_Walkout%2C_Protesters_heading_to_the_Lincoln_Memorial_(30974909966).jpg">via Wikimedia Commons</a>
  </figcaption>
</figure>
*/

export default class extends React.Component {
  render () {
    let markup = { __html: this.props.post.content.rendered }
    return <div dangerouslySetInnerHTML={markup} />
  }
}
