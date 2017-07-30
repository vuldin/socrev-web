import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import { Link } from '../routes'

export default ({ cats, parentId }) => {
  //console.log('parentId', parentId)
  /*
  let parents = cats.filter(c => c.parent === 0)
  parents.forEach(p => (p.children = []))
  cats.forEach(c => {
    if (c.parent !== 0) {
      let parent = parents.find(p => p.id === c.parent)
      if (parent !== undefined) parent.children.push(c)
    }
  })
  */
  const children = pId => {
    let p = cats.find(c => c.id === parseInt(pId))
    //console.log(pId, cats, p)
    let result = <div />
    if (p && p.children && p.children.length > 0)
      result = (
        <InnerWrapper>
          <Children>
            {p.children.map((c, i) =>
              <Link key={i} prefetch route={`/search/${c.id}`} passHref>
                <A style={{ paddingRight: '20px' }}>
                  {c.name}
                </A>
              </Link>
            )}
          </Children>
        </InnerWrapper>
      )
    return result
  }
  const parents = arr => {
    let result = []
    arr.forEach((p, i) => {
      if (p.name !== 'Uncategorized') {
        result.push(
          <Parent key={i}>
            <Link prefetch route={`/search/${p.id}`} passHref>
              <A>{p.name}</A>
            </Link>
            {/*children(p)*/}
          </Parent>
        )
      }
    })
    return result
  }
  return (
    <Wrapper>
      <div style={{ display: 'flex' }}>
        {parents(cats)}
      </div>
      <div>
        {children(parentId)}
      </div>
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
  width: 20px;
`
const Wrapper = styled.div`
  /*
  font-size: .8em;
  letter-spacing: -0.8px;
  */
  padding-top: 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
`
const Name = styled.div`
`
const Parent = styled.div`
  margin-right: 20px;
`
const InnerWrapper = styled.div`
  display: flex;
`
const Children = styled.div`
  display: flex;
`
