import React from 'react'
import { render } from 'react-dom'
import Layout from '../components/layout'
import 'isomorphic-fetch'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import Feature from '../components/feature'
import Excerpt from '../components/excerpt'
import Banner from '../components/banner'

const contentPaddingX = '90px'
const contentMargin = 20
const apiUrl = 'https://api.socialistrevolution.org'
//const apiUrl = 'http://localhost:3001'
const description =
  'Socialist Revolution is the publication of the International Marxist Tendency in the United States.'

export default class extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    /*
    const postsRes = await fetch(`${apiUrl}/posts`)
    const catsRes = await fetch(`${apiUrl}/categories`)
    */
    const [postsRes, catsRes] = await Promise.all([
      fetch(`${apiUrl}/posts`),
      fetch(`${apiUrl}/categories`)
    ])
    /*
    const posts = await postsRes.json()
    const cats = await catsRes.json()
    */
    const [posts, cats] = await Promise.all([postsRes.json(), catsRes.json()])
    const feature = posts.shift()
    return {
      posts: posts,
      feature: feature,
      cats: cats
    }
  }
  ref = 1
  count = 30
  createRefComponents = () => {
    let results = []
    for (let i = 2; i < this.count + 1; i++) {
      results.push(<div key={i} ref={i} />)
    }
    return results
  }
  getMorePosts = async page => {
    console.log(`${apiUrl}/posts?page=${page}`)
    const postsRes = await fetch(`${apiUrl}/posts?page=${page}`)
    const posts = await postsRes.json()
    return posts
  }
  getNewContent = posts => {
    return (
      <div>
        <Banner />
        <PostWrapper>
          {posts.map((post, i) => {
            let result = <Excerpt key={i} post={post} />
            return result
          })}
        </PostWrapper>
        <A
          href='https://www.bolshevik.info/the-chain-is-no-stronger-than-its-weakest-link.htm'
          target='_blank'
        >
          <Quote>
            <blockquote>
              {`Your iron chain was poor and rusty enough as it is, and now it has several links made not even of wood, but of clay and paper.`}
            </blockquote>
            <em
              style={{ fontSize: '.8em' }}
            >{`Published in Pravda No. 67, June 9 (May 27), 1917`}</em>
          </Quote>
        </A>
        <div style={{ paddingTop: '20px' }} />
        {this.ref < this.count - 1
          ? <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                className='more-component'
                onClick={() => this.draw()}
              >{`See more articles`}</Button>
            </div>
          : <div />}
      </div>
    )
  }

  draw = async () => {
    let nextRef = this.ref + 1
    let newPosts = await this.getMorePosts(nextRef)
    let newJsx = this.getNewContent(newPosts)
    document
      .querySelectorAll('.more-component')
      .forEach(c => (c.style.display = 'none'))
    render(newJsx, this.refs[nextRef])
    this.ref = nextRef
  }

  render () {
    const { feature, posts, cats } = this.props
    return (
      <Layout cats={cats}>
        {feature !== undefined ? <Feature post={feature} /> : <div />}
        {this.getNewContent(posts)}
        {this.createRefComponents()}
      </Layout>
    )
  }
}

const PostWrapper = styled.div`
  /*
  margin: 20px 0 0 0;
  display: block;
  */
  display: block;
  padding: 20px 0 0 0;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  @media (min-width: 415px) {
    display: grid;
  }
  @media (min-width: 720px) {
    grid-template-columns: 1fr 1fr;
    margin: 20px 90px 0px 90px;
  }
  @media (min-width: 1150px) {
    grid-template-columns: 1fr 1fr 1fr;
    margin: 20px 90px 0px 90px;
  }
`
const A = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`
const Quote = styled.div`
  margin: 20px 0;
  background-color: #fefbed;
  font-size: 1.4em;
  font-weight: bold;
  padding: 0 20px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  @media (min-width: 720px) {
    padding: 0 90px;
  }
`
const Button = styled.a`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem;
  margin: 0.5rem 1rem;
  color: black;
  border: 2px solid #5a5a5a;
  cursor: pointer;
`
