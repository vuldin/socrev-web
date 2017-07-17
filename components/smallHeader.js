import Link from 'next/link'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'

//const logoFile = 'srlogo.svg'
const logoFile = 'SocialistRevolutionLogoHorizontal.svg'
const headerColor = '#5a5a5a'
const contentPaddingX = 90
const smallContentPaddingX = 20

export default () =>
  <Header px={smallContentPaddingX}>
    <Left>
      <Actions>
        <FontAwesome name='bars' size='2x' />
      </Actions>
    </Left>
    <LogoWrapper>
      <Link href='/'>
        <a>
          <div
            style={{
              display: 'inline-block',
              position: 'relative',
              width: '100%',
              height: '100%',
              verticalAlign: 'middle',
              overflow: 'hidden'
            }}
          >
            <object
              type='image/svg+xml'
              data={`/static/${logoFile}`}
              width='100%'
              height='65px'
              style={{
                pointerEvents: 'none',
                display: 'inline-block',
                top: 0,
                left: 0
              }}
            />
          </div>
        </a>
      </Link>
    </LogoWrapper>
    <Right>
      <Interactions>
        <FontAwesome name='facebook' size='2x' />
        <FontAwesome name='twitter' size='2x' style={{ paddingLeft: '15px' }} />
      </Interactions>
    </Right>
  </Header>

const Header = styled.header`
  @import url(https://fonts.googleapis.com/css?family=Titillium+Web);
  font-family: 'Titillium Web', sans-serif;
  font-size: 20px;
  white-space: nowrap;
  color: ${headerColor};
  display: flex;
  height: 100%;
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
`
const LogoWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`
