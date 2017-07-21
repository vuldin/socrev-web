import Link from 'next/link'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import MediaQuery from 'react-responsive'
import logo from '../svgs/imt_wil_logo.svg'

const footerColor = '#5a5a5a'
const contentPaddingX = 90
const smallContentPaddingX = 45

export default () =>
  <Footer px={smallContentPaddingX}>
    <Left>
      <Actions>
        {/*
        <div>International Marxist Tendency (IMT)</div>
        */}
      </Actions>
    </Left>
    <LogoWrapper>
      <Link href='/'><a><Logo /></a></Link>
    </LogoWrapper>
    <Right>
      <Interactions>
        {/*
        <FontAwesome name='facebook' size='2x' />
        <FontAwesome name='twitter' size='2x' style={{ paddingLeft: '15px' }} />
        */}
      </Interactions>
    </Right>
  </Footer>

const Footer = styled.footer`
  @import url(https://fonts.googleapis.com/css?family=Titillium+Web);
  background-color: #f0f0f0;
  font-family: 'Titillium Web', sans-serif;
  font-size: 20px;
  white-space: nowrap;
  color: ${footerColor};
  display: flex;
  padding: 0px ${props => props.px || contentPaddingX}px;
  margin-top: 30px;
`
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
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
const LogoWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`
const Logo = styled(logo)`
  width: 60px;
  height: 60px;
  @media (min-width: 500px) {
    height: 100px;
    width: 150px;
  }
`
