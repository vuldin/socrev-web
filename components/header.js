import Link from 'next/link'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import logo from '../svgs/imt_wil_logo.svg'

const headerColor = '#5a5a5a'
const contentPaddingX = '90px'

export default () =>
  <Header>
    <Left>
      <Actions>
        <div>Menu</div>
        <Separator />
        <FontAwesome name='search' />
        {/*
        <MediaQuery query='(min-width: 950px)'>
          {matches => {
            if (matches) return <div>Search</div>
            else return <FontAwesome name='search' />
          }}
        </MediaQuery>
        */}
      </Actions>
    </Left>
    <Logo />
    <Right>
      <Interactions>
        <div>Donate</div>
        <Separator />
        <FontAwesome name='facebook' />
        <FontAwesome name='google' style={{ paddingLeft: '10px' }} />
        <FontAwesome name='twitter' style={{ paddingLeft: '10px' }} />
        <Separator />
        {/*
        <MediaQuery query='(min-width: 950px)'>
          {matches => {
            if (matches) return <div>Sign In</div>
            else return <FontAwesome name='sign-in' />
          }}
        </MediaQuery>
        */}
        <div>Sign In</div>
      </Interactions>
    </Right>
  </Header>

const Header = styled.header`
  @import url(https://fonts.googleapis.com/css?family=Titillium+Web);
  font-family: 'Titillium Web', sans-serif;
  font-size: 20px;
  color: ${headerColor};
  display: flex;
  padding: 0px ${contentPaddingX};
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
  background-color: ${headerColor};
`
const Logo = styled(logo)`
  flex: 1;
  height: 150px;
  /*
  width: 300px;
  */
`
