import styled from 'styled-components'
import ReactGA from 'react-ga'
import { Image, Transformation } from 'cloudinary-react'

function handleClick(label) {
  ReactGA.event({
    category: 'Banner',
    action: 'Clicked Link',
    label: label,
  })
}

function getBannerName(size) {
  let name = 'mobile_banner_ftwwvn'
  if (size === 'medium') name = 'tablet_banner_sxvvvp'
  if (size === 'large') name = 'thin_banner2_bxwg4b'
  return name
}

export default ({ size }) => (
  <A
    onClick={() => {
      handleClick('Subscription Banner')
    }}
    href="https://www.marxistbooks.com/products/subscription-to-socialist-revolution-magazine"
    target="_blank"
  >
    <Image
      cloudName="dj3o4xzd5"
      publicId={getBannerName(size)}
      className="cld-responsive"
      responsive
      secure
    >
      <Transformation crop="scale" dpr="auto" responsive_placeholder="blank" />
    </Image>
  </A>
)

const A = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`
