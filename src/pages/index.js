import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <h1>Hello people</h1>
    <p>Welcome to your new Gatsby blog with Markdown pages.</p>
    <p>
      <Link to='/posts/blog-post-1/'>Go to my first Markdown blog post</Link>
      <br />
      <Link to='/posts/blog-post-2/'>Go to my second Markdown blog post</Link>
    </p>
  </Layout>
)

export default IndexPage
