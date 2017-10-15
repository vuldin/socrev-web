import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import { Link } from '../routes'
import ReactGA from 'react-ga'

const twitterHandle = 'usimt'
const tFollowLink = `https://twitter.com/intent/follow`
const site = 'https://socialistrevolution.org'
const flink = `https://www.facebook.com/sharer/sharer.php?u=`
const glink = 'https://plus.google.com/share?url='

function handleClick(label) {
    ReactGA.event({
        category: 'Banner',
        action: 'Clicked Link',
        label: label
    })
}

export default () =>
    <Banner>
    <div style={{ paddingTop: '20px', textAlign: 'center' }}>
      {`Support the IMT today. Help build for the revolution!`}
    </div>
    <BannerItems>
      {/*
      <BannerItem>
        <div>Follow</div>
        <Icons>
          <a
            target='_blank'
            href='https://www.facebook.com/imtusa'
            style={{
              textDecoration: 'none',
              cursor: 'pointer',
              color: 'inherit'
            }}
          >
            <FontAwesome name='facebook' size='2x' />
          </a>
          <a
            target='_blank'
            href={`${tFollowLink}?original_referer=${encodeURI(
              site
            )}&region=follow_link&screen_name=${twitterHandle}&tw_p=followbutton`}
            style={{
              paddingLeft: '20px',
              textDecoration: 'none',
              cursor: 'pointer',
              color: 'inherit'
            }}
          >
            <FontAwesome name='twitter' size='2x' />
          </a>
        </Icons>
      </BannerItem>
      */}
      <BannerItem>
        <A
          onClick={()=>{handleClick('Subscribe')}}
          target='_blank'
          href='https://www.marxistbooks.com/products/subscription-to-socialist-revolution-magazine'
        >
          <div>Subscribe</div>
          <Icons>
            <FontAwesome name='newspaper-o' size='2x' />
          </Icons>
        </A>
      </BannerItem>
      <BannerItem>
        <A
          onClick={()=>{handleClick('Donate')}}
          target='_blank'
          href='https://wellred.org/collections/donate/products/donate-1'
        >
          <div>Donate</div>
          <Icons>
            <FontAwesome name='handshake-o' size='2x' />
          </Icons>
        </A>
      </BannerItem>
      <BannerItem onClick={()=>{handleClick('Join')}}>
        <Link prefetch route='/join-the-imt'>
          <A>
            <div>Join</div>
            <Icons>
              <FontAwesome name='users' size='2x' />
            </Icons>
          </A>
        </Link>
      </BannerItem>
      <DisappearingBannerItem>
        <A
          onClick={()=>{handleClick('Instagram')}}
          target='_blank'
          href='https://instagram.com/socialistrev'
        >
          <div>Follow</div>
          <Icons>
            <FontAwesome name='instagram' size='2x' />
          </Icons>
        </A>
      </DisappearingBannerItem>
    </BannerItems>
  </Banner>

const Banner = styled.div`
  margin-top: 20px;
  background-color: #f0f0f0;
  font-size: 1.5em;
  font-family: Mada, sans-serif;
  letter-spacing: -1.5px;
  padding: 0 20px;
  color: #BB0A0A;
  @media (min-width: 720px) {
    padding: 0 90px;
  }
`
const BannerItems = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  justify-items: center;
  @media (min-width: 575px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
const BannerItem = styled.div`
  font-size: .8em;
  margin: 20px 0;
  display: flex;
  flex-flow: column;
  align-items: center;
`
const DisappearingBannerItem = styled.div`
  font-size: .8em;
  margin: 20px 0;
  flex-flow: column;
  align-items: center;
  display: none;
  @media (min-width: 575px) {
    display: flex;
  }
`
const Icons = styled.div`
  text-align: center;
`
const A = styled.a`
  /*&:hover {
    color: #600000;
  } */
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`