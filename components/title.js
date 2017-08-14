import styled from 'styled-components'

export default ({ minHeight = 'inherit', children }) =>
  <Title minHeight={minHeight}>{children}</Title>

const Title = styled.h2`
  min-height: ${props => props.minHeight};
  margin: 0;
  font-family: Mada, sans-serif;
  letter-spacing: -1.5px;
  font-size: 1.5em;
`
