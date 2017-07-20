import React from 'react'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import { Parser } from 'html-to-react'
import ReactPlayer from 'react-player'
import InteractionTool from './interactionTool'
import Banner from './banner'

const htmlToReactParser = new Parser()
const contentMargin = 20
const contentPaddingX = 20
const smallContentPaddingX = 20

export default class extends React.Component {
  render () {
    let { title, excerpt, content, featured_media } = this.props.post
    let { source_url } = featured_media
    title = htmlToReactParser.parse(title.rendered)
    excerpt = htmlToReactParser.parse(excerpt.rendered)
    content = htmlToReactParser.parse(content.rendered)
    content = content.filter(d => d !== '\n')
    content.splice(parseInt(content.length / 2), 0, <Banner />)
    console.log(content)
    let isSticky = this.props.post.sticky
    let media = (
      <figure>
        <img src={source_url} />
      </figure>
    )
    if (featured_media.video)
      media = (
        <ResponsivePlayer url={source_url} width={'60vw'} height={'40vw'} />
      )
    return (
      <div>
        {isSticky && !featured_media.video ? media : <span />}
        <Padding contentPaddingX={smallContentPaddingX}>
          <Side>
            <InteractionTool />
          </Side>
          <Content>
            {!isSticky || featured_media.video ? media : <span />}
            <Title>{title}</Title>
            <Excerpt>
              {excerpt}
            </Excerpt>
            {content}
          </Content>
        </Padding>
        <FixedFooter className='article-fixed-footer'>
          <FontAwesome name='twitter-square' style={{ color: '#55acee' }} />
          <FontAwesome
            name='google-plus-official'
            style={{ color: '#ea4335' }}
          />
          <FontAwesome name='facebook-square' style={{ color: '#3b5998' }} />
        </FixedFooter>
        <FixedSide className='article-fixed-side'>
          <InteractionTool />
        </FixedSide>
      </div>
    )
  }
}
const FixedSide = styled.div`
  display: none;
  position: fixed;
  width: 150px;
  left: 90px;
  top: 200px;
`
const Side = styled.div`
  flex: 0 0 150px;
  display: none;
  @media (min-width: 1100px) {
    display: inherit;
  }
`
const FixedFooter = styled.div`
  box-shadow: 0 0 0.2rem rgba(0,0,0,0.35);
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  position: fixed;
  height: 32px;
  width: 100vw;
  bottom: 0;
  background-color: white;
`
const ResponsivePlayer = styled(ReactPlayer)`
  margin: 0 auto;
  @media (min-width: 1100px) {
    width: 700px !important;
    height: 400px !important;
  }
`
const Padding = styled.div`
  margin: ${props =>
    `80px ${props.contentPaddingX}px 0 ${props.contentPaddingX}px`};
  overflow: hidden;
  display: flex;
  @media (min-width: 720px) {
    margin: ${props => `80px 90px 0 90px`};
  }
`
const Title = styled.h2`
  margin: 0;
  font-family: font74157;
  letter-spacing: -0.8px;
  font-size: 1.8em;
`
/*
const Title = styled.div`
  font-family: font74157;
  letter-spacing: -0.8px;
  font-weight: bold;
  font-size: 1.8em;
  word-wrap: break-word;
  padding-top: 80px;
`
*/
const Excerpt = styled.em`
  /*
  @media (min-width: 1100px) {
    width: 700px;
    margin: 0 auto;
  }
  */
`
const Picture = styled.div`
  background: ${props => {
    return `url(${props.url})`
  }};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

const Content = styled.div`
  overflow: hidden;
  @media (min-width: 1100px) {
    width: 700px;
    margin: 0 auto;
  }
`
