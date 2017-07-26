import FontAwesome from 'react-fontawesome'
import styled from 'styled-components'

const twitterHandle = 'usimt'
const site = 'https://socialistrevolution.org'
/*
https://twitter.com/intent/tweet
  ?original_referer=https://socialistrevolution.org/the-growth-of-the-dsa-and-the-fight-for-socialism
  &text=Socialists%20are%20now%20swimming%20with%20the%20stream%20of%20events,%20as%20the%20explosive%20growth%20of%20mass%20movements%20and%20the%20Democratic%20Socialists%20of%20America%20have%20shown.%20But%20where%20do%20we%20go%20from%20here?
  &url=https://socialistrevolution.org/the-growth-of-the-dsa-and-the-fight-for-socialism
  &via=usimt
*/
const tShareLink = `https://twitter.com/intent/tweet`
const fShareLink = `https://www.facebook.com/sharer/sharer.php?u=`
const gShareLink = 'https://plus.google.com/share?url='

export default ({ post }) =>
  <FixedInteractionTools>
    <div>Share</div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px'
      }}
    >
      <a
        target='_blank'
        href={`${tShareLink}?original_referer=${encodeURI(
          `${site}/${post.slug}`
        )}&text=${post.excerpt.rendered !== undefined
          ? encodeURI(post.excerpt.rendered)
          : post.excerpt}&url=${encodeURI(
          `${site}/${post.slug}`
        )}&via=${twitterHandle}`}
        style={{
          textDecoration: 'none',
          cursor: 'pointer',
          color: 'inherit'
        }}
      >
        <FontAwesome
          name='twitter-square'
          style={{ color: '#55acee' }}
          size='2x'
        />
      </a>
      <a
        target='_blank'
        href={`${gShareLink}${encodeURI(`${site}/${post.slug}`)}`}
        style={{
          textDecoration: 'none',
          cursor: 'pointer',
          color: 'inherit'
        }}
      >
        <FontAwesome
          name='google-plus-official'
          style={{ color: '#ea4335' }}
          size='2x'
        />
      </a>
      <a
        target='_blank'
        href={`${fShareLink}${site}/${post.slug}`}
        style={{
          textDecoration: 'none',
          cursor: 'pointer',
          color: 'inherit'
        }}
      >
        <FontAwesome
          name='facebook-square'
          style={{ color: '#3b5998' }}
          size='2x'
        />
      </a>
    </div>
  </FixedInteractionTools>

const FixedInteractionTools = styled.div`
  text-align: center;
  height: 30px;
  width: 100%;
`
