import FontAwesome from 'react-fontawesome'
import styled from 'styled-components'

export default () =>
  <FixedInteractionTools>
    <div>Share</div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px'
      }}
    >
      <FontAwesome
        name='twitter-square'
        style={{ color: '#55acee' }}
        size='2x'
      />
      <FontAwesome
        name='google-plus-official'
        style={{ color: '#ea4335' }}
        size='2x'
      />
      <FontAwesome
        name='facebook-square'
        style={{ color: '#3b5998' }}
        size='2x'
      />
    </div>
  </FixedInteractionTools>

const FixedInteractionTools = styled.div`
  text-align: center;
  height: 30px;
  width: 100%;
`
