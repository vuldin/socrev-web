import Link from 'next/link'

export default () =>
  <footer>
    <div>{`footer`}</div>
    <nav>
      <Link href='/'><a>Menu</a></Link>{` | `}
      <Link href='/search'><a>Search</a></Link>{` | `}
      <Link href='/donate'><a>Donate</a></Link>{` | `}
      <Link href='/#'><a>Newsletter</a></Link>{` | `}
      <Link href='/login'><a>Login</a></Link>
    </nav>
  </footer>
