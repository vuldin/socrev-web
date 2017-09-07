import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import { Link } from '../routes'

export default ({ cats, parentId, childId }) => {
  const ps = cats.filter(c => c.parent === 0)
  let cs, parentCat, childCat
  if (parentId !== undefined) {
    parentId = parentId
    parentCat = ps.find(p => p.slug === parentId)
    if (parentCat !== undefined) cs = parentCat.children
    if (cs !== undefined && childId !== undefined) {
      childId = childId
      childCat = cs.find(c => c.slug === childId)
    }
  }

  //const spacer = i => (i !== 0 ? <FontAwesome name='circle' /> : <div />)
  const spacer = i => {
    let result = <div />
    if (i !== 0 || window.innerWidth < 1000) <Spacer>•</Spacer>
    return result
  }
  const children = () =>
    cs.map((c, i) => {
      return (
        <Child key={i}>
          {/*spacer(i)*/}
          <Link prefetch route={`/find/${parentCat.slug}/${c.slug}`} passHref>
            <A selected={c.slug === childId ? true : false}>
              {c.name}
            </A>
          </Link>
        </Child>
      )
    })
  const parents = () => {
    let result = []
    ps.forEach((p, i) => {
      if (p.name !== 'Uncategorized') {
        result.push(
          <Parent key={i}>
            {/*spacer(i)*/}
            <Link prefetch route={`/find/${p.slug}`} passHref>
              <A selected={p.slug === parentId ? true : false}>{p.name}</A>
            </Link>
          </Parent>
        )
      }
    })
    return result
  }
  /*
  console.log(`parents\n${JSON.stringify(ps)}`)
  console.log(`parentCat\n${JSON.stringify(parentCat)}`)
  console.log(`children\n${JSON.stringify(cs)}`)
  console.log(`childCat\n${JSON.stringify(childCat)}`)
  */
  return (
    <Wrapper>
      <CategoryTitle>Main categories</CategoryTitle>
      <ParentWrapper>
        {parents()}
      </ParentWrapper>
      {cs !== undefined
        ? <div style={{ paddingTop: '20px' }}>
            <CategoryTitle>Sub-categories</CategoryTitle>
            <InnerWrapper>
              <Children>
                {children()}
              </Children>
            </InnerWrapper>
          </div>
        : <div />}
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
  opacity: ${props => (props.selected ? 1 : 0.5)};
/*  &:hover {
    color: #600000;
  }*/
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
  margin: 10px 90px 0 90px;
`
const Name = styled.div`
`
const ParentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  @media (min-width: 1000px) {
    flex-flow: row wrap;
  }
`
const Child = styled.div`
  margin-right: 20px;
  display: flex;
`
const Parent = styled.div`
  margin-right: 20px;
  display: flex;
`
const InnerWrapper = styled.div`
  display: flex;
`
const Children = styled.div`
  display: flex;
  flex-flow column;
  @media (min-width: 1000px) {
    flex-flow: row wrap;
  }
`
const Spacer = styled.div`
  margin-right: 20px;
`
const CategoryTitle = styled.div`
  font-weight: bold;
  font-size: 1.1em;
`
