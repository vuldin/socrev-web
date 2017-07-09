import Link from 'next/link'

export default () =>
  <nav>
    <span className='fa fa-bars fa-2x' />
    <style jsx>{`
      nav {
        display: flex;
        align-items: center;
        padding-top: 10px;
      }
      span {
        display: inherit;
        @media (min-width: 720) {
          display: none;
        }
      }
    `}</style>
  </nav>
