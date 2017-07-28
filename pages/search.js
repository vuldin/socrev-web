import React from 'react'
import { render } from 'react-dom'
import Layout from '../components/layout'
import 'isomorphic-fetch'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import Excerpt from '../components/excerpt'
import Banner from '../components/banner'

const contentPaddingX = '90px'
const contentMargin = 20
const apiUrl = 'https://api.socialistrevolution.org'

export default class extends React.Component {
  static async getInitialProps ({ query }) {
    // eslint-disable-next-line no-undef
    const [postsRes, catsRes] = await Promise.all([
      fetch(`${apiUrl}/posts?category=${query.id}&page=1`),
      fetch(`${apiUrl}/categories`)
    ])
    const [posts, cats] = await Promise.all([postsRes.json(), catsRes.json()])
    return {
      categoryId: query.id,
      posts: posts,
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
    const postsRes = await fetch(
      `${apiUrl}/posts?category=${this.props.categoryId}&page=${page}`
    )
    const posts = await postsRes.json()
    return posts
  }
  getNewContent = posts => {
    let postArrays = []
    for (let i = 0; i < posts.length; i += 6) {
      postArrays.push(posts.slice(i, i + 6))
    }
    return (
      <div>
        <PostWrapper>
          {postArrays[0].map((post, i) => {
            let result = <Excerpt key={i} post={post} />
            return result
          })}
        </PostWrapper>
        <Banner />
        <PostWrapper>
          {postArrays[1].map((post, i) => {
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
    const { posts, cats } = this.props
    return (
      <Layout cats={cats}>
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
