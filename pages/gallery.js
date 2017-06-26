import React from 'react'
import Layout from '../components/layout'
import { Flex, Box } from 'grid-styled'
import Gallery from '../components/gallery'
import Upload from '../components/upload'

export default () =>
  <Layout>
    <Flex nowrap>
      <Box width={2 / 3}>
        <Gallery />
      </Box>
      <Box width={1 / 3}>
        <Upload />
      </Box>
    </Flex>
  </Layout>
