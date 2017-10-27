import styled from 'styled-components'
import ReactGA from 'react-ga'
import { Image, Transformation } from 'cloudinary-react'
import MediaQuery from 'react-responsive'

function handleClick(label) {
  ReactGA.event({
    category: 'Banner',
    action: 'Clicked Link',
    label: label,
  })
}

function getBannerName(location) {
  let small = 'mobile_banner_ftwwvn'
  let medium = 'tablet_banner_sxvvvp'
  let large = 'thin_banner_ywp5gi'

  if (location == 'article') large = medium

  return [small,medium,large]
}

export default ({ location }) => (
  <A
    onClick={() => {
      handleClick('Subscription Banner')
    }}
    href="https://wellredimt.wildapricot.org/Subscribe-to-SR-Magazine"
    target="_blank"
  >
    <MediaQuery query='(max-width: 500px)'>
      <Image
        style={{ marginTop: '40px', marginBottom: '-10px'}}
        cloudName="dj3o4xzd5"
        publicId={getBannerName(location)[0]}
        className="cld-responsive"
        responsive
        secure
      >
        <Transformation crop="scale" dpr="auto" responsive_placeholder="blank" />
      </Image>
    </MediaQuery>
    <MediaQuery query='(min-width: 500.01px)'>
      <MediaQuery query='(max-width: 719.99px)'>
        <Image
            style={{ marginTop: '40px', marginBottom: '-10px'}}
            cloudName="dj3o4xzd5"
            publicId={getBannerName(location)[1]}
            className="cld-responsive"
            responsive
            secure
        >
          <Transformation crop="scale" dpr="auto" responsive_placeholder="blank" />
        </Image>
      </MediaQuery>
    </MediaQuery>
    <MediaQuery query='(min-width: 720px)'>
        <Image
            style={{ marginTop: '40px', marginBottom: '-10px'}}
            cloudName="dj3o4xzd5"
            publicId={getBannerName(location)[2]}
            className="cld-responsive"
            responsive
            secure
        >
          <Transformation crop="scale" dpr="auto" responsive_placeholder="blank" />
        </Image>
    </MediaQuery>

  </A>
)

const A = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`
