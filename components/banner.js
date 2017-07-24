import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'

const twitterHandle = 'usimt'
const tFollowLink = `https://twitter.com/intent/follow`
const site = 'https://socialistrevolution.org'
const flink = `https://www.facebook.com/sharer/sharer.php?u=`
const glink = 'https://plus.google.com/share?url='

export default () =>
  <Banner>
    <div style={{ paddingTop: '20px', textAlign: 'center' }}>
      {`Support the IMT today. Help build for the revolution!`}
    </div>
    <BannerItems>
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
      <BannerItem>
        <a
          target='_blank'
          href='https://www.marxistbooks.com/products/subscription-to-socialist-revolution-magazine'
          style={{
            textDecoration: 'none',
            cursor: 'pointer',
            color: 'inherit'
          }}
        >
          <div>Subscribe</div>
          <Icons>
            <FontAwesome name='newspaper-o' size='2x' />
          </Icons>
        </a>
      </BannerItem>
      <BannerItem>
        <a
          target='_blank'
          href='https://wellred.org/collections/donate/products/donate-1'
          style={{
            textDecoration: 'none',
            cursor: 'pointer',
            color: 'inherit'
          }}
        >
          <div>Donate</div>
          <Icons>
            <FontAwesome name='handshake-o' size='2x' />
          </Icons>
        </a>
      </BannerItem>
      <BannerItem>
        <a
          target='_blank'
          href='https://wellred.org/collections/donate/products/donate-1'
          style={{
            textDecoration: 'none',
            cursor: 'pointer',
            color: 'inherit'
          }}
        >
          <div>Join</div>
          <Icons>
            <FontAwesome name='users' size='2x' />
          </Icons>
        </a>
      </BannerItem>
    </BannerItems>
  </Banner>

const Banner = styled.div`
  margin-top: 20px;
  background-color: #f0f0f0;
  font-size: 1.4em;
  font-weight: bold;
  font-family: font74157;
  letter-spacing: -1.2px;
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
const Icons = styled.div`
  text-align: center;
`
