import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import { Link } from '../routes'

export default ({ cats }) => {
  let parents = cats.filter(c => c.parent === 0)
  parents.forEach(p => (p.children = []))
  cats.forEach(c => {
    if (c.parent !== 0) {
      let parent = parents.find(p => p.id === c.parent)
      if (parent !== undefined) parent.children.push(c)
    }
  })
  const children = p => {
    let result = <div />
    if (p.children.length > 0)
      result = (
        <InnerWrapper>
          <Space />
          <FontAwesome name='level-up' rotate={90} />
          <Space />
          <Children>
            {p.children.map((c, i) =>
              <Link key={i} prefetch route={`/search/${c.id}`} passHref>
                <A>{c.name}</A>
              </Link>
            )}
          </Children>
        </InnerWrapper>
      )
    return result
  }
  return (
    <Wrapper>
      {parents.map((p, i) =>
        <Parent key={i}>
          <Link prefetch route={`/search/${p.id}`} passHref>
            <A>{p.name}</A>
          </Link>
          {children(p)}
        </Parent>
      )}
    </Wrapper>
  )
}
/*
  &:hover ${A} {
    color: #600000;
  }
  &:hover ${A} {
    filter: brightness(1.1) grayscale(100%);
    opacity: 0.8;
  }
*/
const A = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`
const Space = styled.div`
  width: 10px;
`
const Wrapper = styled.div`
  font-size: .8em;
  letter-spacing: -0.8px;
  padding-top: 10px;
  display: flex;
`
const Name = styled.div`
`
const Parent = styled.div`
  margin-right: 10px;
`
const InnerWrapper = styled.div`
  display: flex;
`
const Children = styled.div`
`
