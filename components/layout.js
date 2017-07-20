import Head from 'next/head'
import SmallHeader from './smallHeader'
import Footer from './footer'

const site = 'https://socialistrevolution.org'

export default class extends React.Component {
  componentDidMount () {
    window.addEventListener('scroll', this.fixedHeaderManager)
    window.addEventListener('resize', this.fixedHeaderManager)
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.fixedHeaderManager)
    window.removeEventListener('resize', this.fixedHeaderManager)
  }
  fixedHeaderManager = e => {
    //let width = screen.width
    let width = window.innerWidth
    let bpMod = 4
    let breakPoint = 65 * bpMod
    let height = 0
    const articleFooter = document.querySelector('.article-fixed-footer')
    const articleShare = document.querySelector('.article-fixed-side')
    let footerDisplayResult = 'none'
    if (width > 720) breakPoint = 105 * bpMod
    if (width > 900) breakPoint = 155 * bpMod
    if (window.scrollY > breakPoint) {
      //height = breakPoint / bpMod
      height = 60
      if (width > 900) height = 100
      if (width < 1100) {
        if (
          window.scrollY + window.innerHeight <
          document.body.scrollHeight - 200
        ) {
          footerDisplayResult = 'flex'
        }
      }
    }
    if (
      window.scrollY > breakPoint * 2 &&
      articleShare !== null &&
      width > 1100
    ) {
      articleShare.style.display = 'inherit'
    } else articleShare.style.display = 'none'
    if (articleFooter !== null) {
      articleFooter.style.display = footerDisplayResult
    }
    this.refs.fixedHeaderWrapper.style.height = `${height}px`
  }
  render () {
    const {
      title = 'IMT | US',
      meta = [
        {
          name: 'description',
          content:
            'Socialist Revolution is the publication of the International Marxist Tendency in the United States.'
        },
        {
          property: 'og:description',
          content:
            'Socialist Revolution is the publication of the International Marxist Tendency in the United States.'
        },
        {
          property: 'og:site_name',
          content: 'Socialist Revolution'
        },
        {
          property: 'twitter:site',
          content: '@usimt'
        },
        {
          property: 'robots',
          content: 'index,follow'
        },
        {
          property: 'og:title',
          content: 'IMT | US'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:url',
          content: `${site}/`
        },
        {
          property: 'twitter:title',
          content: 'Socialist Revolution'
        },
        {
          property: 'twitter:description',
          content:
            'Socialist Revolution is the publication of the International Marxist Tendency in the United States.'
        }
      ],
      canonical = `${site}`,
      excerpt,
      children
    } = this.props
    return (
      <div>
        <Head>
          <title>{title}</title>
          <link rel='canonical' href={canonical} />
          {meta.map(m => {
            let meta = React.createElement('meta', m, null)
            return meta
          })}
        </Head>
        <SmallHeader canonical={canonical} excerpt={excerpt} />
        <div className='fixedHeaderWrapper' ref='fixedHeaderWrapper'>
          <SmallHeader canonical={canonical} excerpt={excerpt} />
          <style jsx>{`
            .fixedHeaderWrapper {
              z-index: 100;
              background-color: #fafafa;
              position: fixed;
              top: 0;
              height: 0px;
              transition: height 0.15s ease-out;
              width: 100vw;
              overflow: hidden;
              box-shadow: 0 0 0.15rem rgba(0, 0, 0, 0.35);
            }
          `}</style>
        </div>
        {children}
        <Footer />
      </div>
    )
  }
}
