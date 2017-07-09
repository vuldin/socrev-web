import Link from 'next/link'
import Logo from '../svgs/imt_wil_logo.svg'

export default ({ width, height }) =>
  <Link href='/'>
    <a>
      <Logo
        style={{
          width: `${width || 60}px`,
          height: `${height || 60}px`
        }}
      />
    </a>
  </Link>
