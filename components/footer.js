import Link from 'next/link'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import MediaQuery from 'react-responsive'
import logo from '../svgs/imt_wil_logo.svg'

const footerColor = '#5a5a5a'
const contentPaddingX = 90
const smallContentPaddingX = 45

export default () =>
  <MediaQuery query='(min-width: 720px)'>
    {matches => {
      let result = (
        <Header px={smallContentPaddingX}>
          <Left>
            <Actions>
              <FontAwesome name='bars' size='2x' />
            </Actions>
          </Left>
          <LogoWrapper>
            <Link href='/'><a><Logo height={'60px'} width={'60px'} /></a></Link>
          </LogoWrapper>
          <Right>
            <Interactions>
              <FontAwesome name='facebook' size='2x' />
              <FontAwesome
                name='twitter'
                size='2x'
                style={{ paddingLeft: '15px' }}
              />
            </Interactions>
          </Right>
        </Header>
      )
      if (matches)
        result = (
          <Header>
            <Left>
              <Actions>
                <MediaQuery query='(min-width: 900px)'>
                  {matches => {
                    if (matches) return <div>Menu</div>
                    else return <FontAwesome name='bars' />
                  }}
                </MediaQuery>
                <Separator />
                <MediaQuery query='(min-width: 900px)'>
                  {matches => {
                    if (matches) return <div>Search</div>
                    else return <FontAwesome name='search' />
                  }}
                </MediaQuery>
                <Separator />
                <Link href='/program'><a>Program</a></Link>
              </Actions>
            </Left>
            <LogoWrapper>
              <Link href='/'>
                <a>
                  <MediaQuery query='(min-width: 900px)'>
                    {matches => {
                      let result = <Logo height='100px' width='100px' />
                      if (matches) result = <Logo />
                      return result
                    }}
                  </MediaQuery>
                </a>
              </Link>
            </LogoWrapper>
            <Right>
              <Interactions>
                <div>Donate</div>
                <Separator />
                <FontAwesome name='facebook' />
                <FontAwesome name='google' style={{ paddingLeft: '10px' }} />
                <FontAwesome name='twitter' style={{ paddingLeft: '10px' }} />
                <Separator />
                <MediaQuery query='(min-width: 900px)'>
                  {matches => {
                    if (matches) return <div>Sign In</div>
                    else return <FontAwesome name='sign-in' />
                  }}
                </MediaQuery>
              </Interactions>
            </Right>
          </Header>
        )
      return result
    }}
  </MediaQuery>

const Header = styled.header`
  @import url(https://fonts.googleapis.com/css?family=Titillium+Web);
  background-color: #f0f0f0;
  font-family: 'Titillium Web', sans-serif;
  font-size: 20px;
  white-space: nowrap;
  color: ${footerColor};
  display: flex;
  padding: 0px ${contentPaddingX}px;
  padding: 0px ${props => props.px || contentPaddingX}px;
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
const Separator = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  width: 1px;
  height: 30px;
  background-color: ${footerColor};
`
const LogoWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`
const Logo = styled(logo)`
  width: ${props => props.width || '150px'};
  height: ${props => props.height || '150px'};
`
