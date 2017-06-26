import Link from 'next/link'
import moment from 'moment'

export default class extends React.Component {
  state = this.newState()
  newState () {
    return {
      url: '',
      altText: '',
      annotation: {
        title: '',
        author: {
          name: '',
          link: ''
        },
        source: {
          name: '',
          link: ''
        },
        license: {
          name: '',
          link: ''
        }
      },
      expiration: '',
      addDate: moment(),
      modDate: moment(),
      forFeatured: false,
      forSocial: false
    }
  }
  render () {
    return <div>{'Image Detail'}</div>
  }
}
