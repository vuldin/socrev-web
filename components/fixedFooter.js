import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'

const twitterHandle = 'usimt'
const site = 'https://socialistrevolution.org'

const tShareLink = `https://twitter.com/intent/tweet`
const fShareLink = `https://www.facebook.com/sharer/sharer.php?u=`
const gShareLink = 'https://plus.google.com/share?url='

export default ({ article }) =>
  <FixedFooter className='article-fixed-footer'>
    <a
      target='_blank'
      href={`${tShareLink}?original_referer=${encodeURI(
        `${site}/${article.slug}`
      )}&text=${article.excerpt}&url=${encodeURI(
        `${site}/${article.slug}`
      )}&via=${twitterHandle}`}
      style={{
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'inherit'
      }}
    >
      <FontAwesome name='twitter-square' style={{ color: '#55acee' }} />
    </a>
    <a
      target='_blank'
      href={`${gShareLink}${site}/${article.slug}`}
      style={{
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'inherit'
      }}
    >
      <FontAwesome name='google-plus-official' style={{ color: '#ea4335' }} />
    </a>
    <a
      target='_blank'
      href={`${fShareLink}${site}/${article.slug}`}
      style={{
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'inherit'
      }}
    >
      <FontAwesome name='facebook-square' style={{ color: '#3b5998' }} />
    </a>
  </FixedFooter>

const FixedFooter = styled.div`
  box-shadow: 0 0 0.2rem rgba(0,0,0,0.35);
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  position: fixed;
  height: 32px;
  width: 100vw;
  bottom: 0;
  background-color: white;
`
