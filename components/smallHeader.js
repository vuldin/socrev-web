import { Link } from '../routes'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'

const logoFile = 'newsrlogo-3.svg'
const headerColor = 'white'
const headerBackgroundColor = '#ed1f24'
const contentPaddingX = 90
const smallContentPaddingX = 20

const twitterHandle = 'usimt'
const site = 'https://socialistrevolution.org'
const tFollowLink = `https://twitter.com/intent/follow`
const fshare = `https://www.facebook.com/socialistrevolutionimt`
const tshare = `${tFollowLink}?original_referer=${encodeURI(
  site
)}&region=follow_link&screen_name=${twitterHandle}&tw_p=followbutton`

export default class extends React.Component {
  state = {
    displayMenu: false
  }
  render () {
    const { cats } = this.props
    return (
      <Header px={smallContentPaddingX}>
        <Left>
          <Actions>
            <A
              href='#'
              onClick={() => {
                let menu = this.refs.menu
                //menu.props.display = !menu.props.display
                this.setState({ displayMenu: !this.state.displayMenu })
              }}
            >
              <FontAwesome
                name='bars'
                size='2x'
                style={{ paddingRight: '10px' }}
              />
            </A>
            <Link prefetch route='/join-the-imt' passHref>
              <DisappearingA>Join</DisappearingA>
            </Link>
            <Separator />
            <Link prefetch route='/our-program' passHref>
              <DisappearingA>Our Program</DisappearingA>
            </Link>
          </Actions>
        </Left>
        <LogoWrapper>
          <Link prefetch route='/'>
            <a style={{ width: '100%' }}>
              <InnerLogoWrapper>
                <Magnifier>
                  <object
                    type='image/svg+xml'
                    data={`/static/${logoFile}`}
                    width='100%'
                    height='100%'
                    style={{
                      pointerEvents: 'none',
                      display: 'inline-block',
                      top: 0,
                      left: 0
                    }}
                  />
                </Magnifier>
              </InnerLogoWrapper>
            </a>
          </Link>
        </LogoWrapper>
        <Right>
          <Interactions>
            <DisappearingA
              target='_blank'
              href='https://wellred.org/collections/donate/products/donate-1'
              style={{
                textDecoration: 'none',
                cursor: 'pointer',
                color: 'inherit'
              }}
            >
              Donate
            </DisappearingA>
            <Separator />
            <A href={tshare} target='_blank'>
              <FontAwesome
                name='twitter'
                size='2x'
                style={{ paddingLeft: '10px' }}
              />
            </A>
            <A href={fshare} target='_blank'>
              <FontAwesome
                name='facebook'
                size='2x'
                style={{ paddingLeft: '5px' }}
              />
            </A>
          </Interactions>
        </Right>
        <Menu
          ref='menu'
          show={this.state.displayMenu}
          onClick={() => {
            //console.log('menu click')
            this.setState({ displayMenu: !this.state.displayMenu })
          }}
        >
          <Left>
            <Actions>
              <A
                href='#'
                onClick={() => {
                  let menu = this.refs.menu
                  //menu.props.display = !menu.props.display
                  this.setState({ displayMenu: !this.state.displayMenu })
                }}
              >
                <FontAwesome
                  name='bars'
                  size='2x'
                  style={{ paddingRight: '10px' }}
                />
              </A>
            </Actions>
          </Left>
          <MenuWrapper>
            <Categories>
              {cats.map((c, i) => {
                let result = (
                  <div key={i}>
                    <Link prefetch route={`/find/${c.slug}`} passHref key={i}>
                      <A style={{ marginTop: '10px' }}>{c.name}</A>
                    </Link>
                  </div>
                )
                if (c.name === 'Uncategorized') result = <span key={i} />
                return result
              })}
              <div>
                <Link prefetch route='/our-program' passHref>
                  <A style={{ marginTop: '10px' }}>Our Program</A>
                </Link>
              </div>
              <div>
                <Link prefetch route='/join-the-imt' passHref>
                  <A style={{ marginTop: '10px' }}>Join Us</A>
                </Link>
              </div>
            </Categories>
          </MenuWrapper>
        </Menu>
      </Header>
    )
  }
}
const Span = styled.span`
  margin-top: 10px;
`
const Categories = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1 0 auto;
  margin-top: 10px;
`
const OtherLinks = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-flow: column;
  margin-top: 10px;
`
const MenuWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 10px;
  @media (min-width: 600px) {
    font-size: 1.3em;
  }
  line-height: 1.3;
`
const Menu = styled.div`
  ${props => {
    let result = `
      opacity: 1;
      pointer-events: all;
    `
    if (!props.show)
      result = `
      opacity: 0;
      pointer-events: none;
    `
    return result
  }}
  padding: 0 20px;
  color: black;
  position: fixed;
  z-index: 101;
  top: 0;
  right: 0;
  background: rgba(255,255,255,0.97);
  box-shadow: 0 0 3rem rgba(0,0,0,0.25); left: 0;
  transition: opacity 250ms ease-in-out;
`
const Header = styled.header`
  @import url(https://fonts.googleapis.com/css?family=Titillium+Web);
  font-family: 'Titillium Web', sans-serif;
  font-size: 20px;
  white-space: nowrap;
  color: ${headerColor};
  background-color: ${headerBackgroundColor};
  display: flex;
  height: 60px;
  padding: 0px ${props => props.px || contentPaddingX}px;
  @media (min-width: 900px) {
    height: 100px;
  }
`
const Left = styled.div`
  flex: 1;
`
const Right = styled.div`
  flex: 1;
`
const Actions = styled.nav`
  display: flex;
  align-items: center;
  padding-top: 10px;
`
const Interactions = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 10px;
  white-space: nowrap;
`
const A = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`
const MenuSeparator = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  width: 1px;
  height: 30px;
  background-color: black;
`
const Separator = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  width: 1px;
  height: 30px;
  background-color: ${headerColor};
  display: none;
  @media (min-width: 900px) {
    display: inherit;
  }
`
const DisappearingA = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: none;
  @media (min-width: 900px) {
    display: inherit;
  }
`
const DisappearingDiv = styled.div`
  display: none;
  @media (min-width: 900px) {
    display: inherit;
  }
`
const LogoWrapper = styled.div`
  flex: 3;
  background-color: white;
  display: flex;
  justify-content: center;
  overflow: hidden;
`
const InnerLogoWrapper = styled.div`
  height: 60px;
  width: 100%;
  overflow: hidden;
  @media (min-width: 500px) {
    height: 100px;
  }
`
const Magnifier = styled.div`
  background-color: white;
  position: relative;
  /*
  width: 150%;
  left: -25%;
  */
  width: 250%;
  left: -75%;
  height: 600%;
  /*
  top: -270%;
  */
  top: -250%;
  @media (min-width: 500px) {
    top: -270%;
  }
  @media (min-width: 900px) {
    top: -250%;
  }
  @media (min-width: 1400px) {
    height: 600%;
    top: -250%;
  }
`
