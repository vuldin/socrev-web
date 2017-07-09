import Head from 'next/head'
import Header from './header'
import SmallHeader from './smallHeader'
import Footer from './footer'

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
    let bpMod = 4
    let breakPoint = 65 * bpMod
    let height = 0
    if (screen.width > 720) breakPoint = 105 * bpMod
    if (screen.width > 900) breakPoint = 155 * bpMod
    if (window.scrollY > breakPoint) {
      //height = breakPoint / bpMod
      height = 65
    }
    this.refs.fixedHeaderWrapper.style.height = `${height}px`
  }
  render () {
    const { title = 'IMT | US', children } = this.props
    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <Header />
        <div className='fixedHeaderWrapper' ref='fixedHeaderWrapper'>
          <SmallHeader />
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
