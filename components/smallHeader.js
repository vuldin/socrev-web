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

export default ({
  fshare = `https://www.facebook.com/imtusa`,
  tshare = `${tFollowLink}?original_referer=${encodeURI(
    site
  )}&region=follow_link&screen_name=${twitterHandle}&tw_p=followbutton`,
  canonical,
  excerpt
}) =>
  <Header px={smallContentPaddingX}>
    <Left>
      <Actions>
        <A href={fshare} target='_blank'>
          <FontAwesome name='facebook' size='2x' />
        </A>
        {/*
        <FontAwesome name='bars' size='2x' />
        */}
        <Separator />
        <Link prefetch route='/our-program'>
          <DisappearingA>Our Program</DisappearingA>
        </Link>
      </Actions>
    </Left>
    <LogoWrapper>
      <Link route='/'>
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
            style={{ paddingLeft: '15px' }}
          />
        </A>
      </Interactions>
    </Right>
  </Header>

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
const Separator = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  width: 1px;
  height: 30px;
  background-color: ${headerColor};
  display: none;
  @media (min-width: 950px) {
    display: inherit;
  }
`
const DisappearingA = styled.a`
  cursor: pointer;
  display: none;
  @media (min-width: 950px) {
    display: inherit;
  }
`
const DisappearingDiv = styled.div`
  display: none;
  @media (min-width: 950px) {
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
