import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import { Link } from '../routes'

export default ({ cats }) => {
  /*
  const ps = cats.filter(c => c.parent === 0)
  let cs, parentCat, childCat
  if (parentId !== undefined) {
    parentId = parseInt(parentId)
    parentCat = ps.find(p => p.id === parentId)
    if (parentCat !== undefined) cs = parentCat.children
    if (cs !== undefined && childId !== undefined) {
      childId = parseInt(childId)
      childCat = cs.find(c => c.id === childId)
    }
  }
  */
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
        <Children>
          {p.children.map((c, i) => {
            let spacer = <div />
            if (i !== 0) spacer = <Space>/</Space>
            let result = (
              <div key={i}>
                {spacer}
                <Link
                  key={i}
                  prefetch
                  route={`/find/${p.slug}/${c.slug}`}
                  passHref
                >
                  <A>{c.name}</A>
                </Link>
              </div>
            )
            return result
          })}
        </Children>
      )
    return result
  }
  return (
    <Wrapper>
      {parents.map((p, i) =>
        <div style={{ display: 'flex' }} key={i}>
          <Parent>
            <Link prefetch route={`/find/${p.slug}`} passHref>
              <A>{p.name}</A>
            </Link>
          </Parent>
          <Space>-></Space>
          {children(p)}
        </div>
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
  /*&:hover {
    color: #a90000;
  }*/
`
const Space = styled.div`
  margin: 0 10px;
`
const Wrapper = styled.div`
  font-size: .8em;
  letter-spacing: -0.8px;
  padding: 10px 0;
  @media (min-width: 500px) {
    font-size: inherit;
    letter-spacing: inherit;
  }
`
const Name = styled.div`
`
const Parent = styled.div`
`
const InnerWrapper = styled.div`
  display: flex;
`
const Children = styled.div`
  display: flex;
`
