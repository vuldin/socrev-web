import styled from 'styled-components'

export default ({ minHeight = 'inherit', children }) =>
  <Title minHeight={minHeight}>{children}</Title>

const Title = styled.h2`
  min-height: ${props => props.minHeight};
  margin: 0;
  font-family: font74157;
  letter-spacing: -0.8px;
  font-size: 1.4em;
`
